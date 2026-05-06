# Example: Deep Research and Refactoring

This example shows how to use the `agi-research-and-build.mdc` rule to tackle a complex refactoring task.

## The Prompt

```text
@agi-research-and-build.mdc
Goal: Refactor our existing state management from Redux to Zustand to improve performance and reduce boilerplate.
Target: The `src/store/` directory and all components importing from it.

Please start with the Research phase. Analyze the current Redux slices, identify all dependencies, and propose a Zustand store structure.
```

## What to Expect

1. **Research Phase**: The AGI will use the `Read` and `Glob` tools to map out the current Redux implementation. It will document the state shape, actions, and selectors.
2. **Proposal**: It will present a structured plan for the Zustand migration, highlighting how to handle async actions and middleware.
3. **Build Phase**: After your approval, it will systematically replace Redux with Zustand, file by file, ensuring that each step is reviewable.
4. **Validation**: It will remind you to run type checks and tests to verify the refactor.

## Why this works

The research-first approach prevents the AI from making blind changes. It builds a comprehensive context map before writing any code, which is crucial for large-scale refactoring.
