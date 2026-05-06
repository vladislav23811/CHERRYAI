# CHERRYAI Labels Strategy

To maintain a clean and organized workflow, we use the following label taxonomy for issues and pull requests in the CHERRYAI repository.

## 🔴 Bug & Triage
- `bug`: Something isn't working as expected.
- `triage`: Needs review by a maintainer before being assigned or worked on.
- `critical`: High priority bug affecting core functionality.

## 🟢 Features & Enhancements
- `enhancement`: New feature or request.
- `agi-core`: Relates to the core AGI genie logic and execution engine.
- `rules`: Updates or additions to `.cursor/rules/`.
- `operations`: Relates to `.cursor/AGI-OPERATIONS.md` or workflows.

## 🔵 Documentation & Chores
- `documentation`: Improvements or additions to documentation.
- `chore`: Maintenance tasks, dependencies, or minor refactoring.
- `good first issue`: Good for newcomers to the project.
- `help wanted`: Extra attention is needed.

## 🟡 Status
- `in progress`: Currently being worked on.
- `blocked`: Waiting on something else (e.g., upstream issue, feedback).
- `needs review`: Ready for maintainer review.

## Automation
If you have the `gh` CLI installed, you can create these labels automatically by running the following commands:

```bash
gh label create "bug" --color d73a4a --description "Something isn't working" --force
gh label create "triage" --color e4e669 --description "Needs review by maintainers" --force
gh label create "critical" --color b60205 --description "High priority bug" --force
gh label create "enhancement" --color a2eeef --description "New feature or request" --force
gh label create "agi-core" --color 0e8a16 --description "Core AGI genie logic" --force
gh label create "rules" --color 1d76db --description "Cursor rules updates" --force
gh label create "operations" --color 0052cc --description "AGI operations and workflows" --force
gh label create "documentation" --color 0075ca --description "Improvements or additions to documentation" --force
gh label create "chore" --color e99695 --description "Maintenance tasks" --force
gh label create "good first issue" --color 7057ff --description "Good for newcomers" --force
gh label create "help wanted" --color 008672 --description "Extra attention is needed" --force
gh label create "in progress" --color ffff00 --description "Currently being worked on" --force
gh label create "blocked" --color d93f0b --description "Waiting on something else" --force
gh label create "needs review" --color fbca04 --description "Ready for maintainer review" --force
```
