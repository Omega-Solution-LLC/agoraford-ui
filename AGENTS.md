# Agent rules: agoraford-ui

Read `docs/BLUEPRINT.md` first and follow it phase by phase.

1. **Never use Ant Design** (`antd`, `@ant-design/*`).
2. Build on Tailwind CSS, Radix primitives, and CSS-variable design tokens. No hard-coded colors, radii, font sizes or arbitrary pixel spacing.
3. The library contains no business logic, API calls or router imports. Strings are props.
4. Do not change functionality in the consuming apps. UI only.
5. Peer dependencies: `react`, `react-dom` (`^18 || ^19`). Never bundle React.
6. Every component needs a Storybook story covering all states, light and dark.
7. Report ambiguities in `docs/MIGRATION.md` instead of guessing.
