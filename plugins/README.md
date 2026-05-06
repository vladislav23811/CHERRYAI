# MZ AI Plugins and Features

Welcome to the **MZ AI** Plugin and Feature development guide!

With MZ AI operating as your autonomous genie inside Cursor, you can easily bootstrap new plugins and features for your projects. 

## Creating a New Plugin / Feature

To create a new plugin, use the provided `plugin-session.md` template from the `.cursor/templates` directory. 

### Core Concepts

1. **Self-Evolving Architecture:** When you ask MZ AI to create a new plugin, it uses the 5D Loop (Define -> Design -> Deliver -> Defend -> Debrief) to ensure that the plugin integrates cleanly without breaking the core system.
2. **MCP Integration:** Plugins can define their own Model Context Protocol (MCP) servers or tools to expand the AI's capabilities.
3. **Cursor Rules Extension:** When you add a new feature, you can also ask MZ AI to generate a specific `.mdc` rule for that feature, ensuring the AI retains context in the future.

### How to use MZ AI to build a Plugin

1. Open Cursor's Chat or Composer.
2. Type: `Let's build a new plugin based on @plugin-session.md`
3. Provide the context for what your plugin should do.
4. Watch MZ AI execute the architecture, write the code, and validate it!
