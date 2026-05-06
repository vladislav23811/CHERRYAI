# Example: Bootstrapping a New Feature with AGI Genie

This example demonstrates how to use the CHERRYAI rules to autonomously bootstrap a new feature in your project.

## The Prompt

To kick off the AGI Genie, paste the following prompt into Cursor's Composer or Chat:

```text
@agi-genie-core.mdc @agi-execution-engine.mdc
Goal: Implement a new "Dark Mode Toggle" component for the HeroUI navigation bar.
Context: We are using Tailwind CSS v4 and HeroUI. The toggle should persist the user's choice in local storage.

Please execute the Define and Design phases of the AGI execution engine, then pause for my review before moving to Deliver.
```

## What to Expect

1. **Define Phase**: The AGI will analyze the goal, identify the required tools (Tailwind, HeroUI, local storage), and list any assumptions.
2. **Design Phase**: It will propose a component structure (e.g., `ThemeToggle.tsx`), state management approach (e.g., a custom `useTheme` hook), and UI placement.
3. **Review**: The AGI will pause and ask for your approval.
4. **Deliver Phase**: Once approved, you can prompt it to "Proceed to Deliver", and it will write the code, apply the changes, and suggest tests.

## Why this works

By explicitly referencing the rule files (`@agi-genie-core.mdc` and `@agi-execution-engine.mdc`), you force Cursor to adopt the strict, milestone-driven workflow defined in CHERRYAI, ensuring high-quality, production-ready output.
