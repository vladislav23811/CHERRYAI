#!/usr/bin/env python3
"""Materialize v0.4.1 files from cloud-agent transcript diffStrings (git apply -p1 only)."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path


def collect_diffs(obj, out: list[tuple[str, str]]) -> None:
    if isinstance(obj, dict):
        if "diffString" in obj:
            ds = obj["diffString"]
            m = re.search(r"\+\+\+ b?//?(.+)", ds)
            if m:
                fp = m.group(1).strip()
                for prefix in (
                    "/agent/repos/CHERRYAI/",
                    "agent/repos/CHERRYAI/",
                    "/agent/CHERRYAI/",
                    "agent/CHERRYAI/",
                ):
                    if fp.startswith(prefix):
                        fp = fp[len(prefix) :]
                        break
                out.append((fp, ds))
        for v in obj.values():
            collect_diffs(v, out)
    elif isinstance(obj, list):
        for x in obj:
            collect_diffs(x, out)


def normalize_patch(ds: str) -> str:
    for stem in ("agent/repos/CHERRYAI", "agent/CHERRYAI"):
        ds = ds.replace(f"--- a//{stem}/", "--- a/")
        ds = ds.replace(f"+++ b//{stem}/", "+++ b/")
    ds = ds.replace("--- /dev/null", "--- /dev/null")
    ds = ds.replace("+++ b//", "+++ b/")
    if not ds.endswith("\n"):
        ds += "\n"
    return ds


def apply_new_file(ds: str, dest: Path) -> None:
    lines: list[str] = []
    for line in ds.splitlines():
        if line.startswith("+") and not line.startswith("+++"):
            lines.append(line[1:])
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text("\n".join(lines) + ("\n" if lines else ""))


def main() -> int:
    if len(sys.argv) < 3:
        print(
            "usage: replay-v041.py <transcript.json> <repo-root> [file ...]",
            file=sys.stderr,
        )
        return 2
    transcript_path = Path(sys.argv[1])
    repo = Path(sys.argv[2]).resolve()
    only = set(sys.argv[3:]) if len(sys.argv) > 3 else None
    data = json.loads(transcript_path.read_text())
    pairs: list[tuple[str, str]] = []
    collect_diffs(data, pairs)
    by_file: dict[str, list[str]] = {}
    for fp, ds in pairs:
        if only is not None and fp not in only:
            continue
        if fp.startswith("/tmp/"):
            continue
        by_file.setdefault(fp, []).append(ds)

    for fp, diffs in sorted(by_file.items()):
        dest = repo / fp
        for ds in diffs:
            if ds.startswith("--- /dev/null"):
                apply_new_file(ds, dest)
                continue
            patch = normalize_patch(ds)
            r = subprocess.run(
                ["git", "apply", "-p1", "--ignore-whitespace"],
                input=patch,
                capture_output=True,
                text=True,
                cwd=repo,
            )
            if r.returncode != 0:
                print(f"failed {fp}:\n{r.stderr}", file=sys.stderr)
                return 1
    print(f"materialized {len(by_file)} files from transcript")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
