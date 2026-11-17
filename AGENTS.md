# Agent rules: agoraford-ui

Read `docs/BLUEPRINT.md` first and follow it phase by phase.

1. **Never use Ant Design** (`antd`, `@ant-design/*`).
2. Build on Tailwind CSS, Radix primitives, and CSS-variable design tokens. No hard-coded colors, radii, font sizes or arbitrary pixel spacing.
3. The library contains no business logic, API calls or router imports. Strings are props.
4. Do not change functionality in the consuming apps. UI only.
5. Peer dependencies: `react`, `react-dom` (`^18 || ^19`). Never bundle React.
6. Every component needs a Storybook story covering all states, light and dark.
7. **Page shell layout standard (MojaBoard parity):** Every authenticated app page inside `AppShell` MUST render:
   - A `Breadcrumb` bar above the main content card showing the navigation trail and an inline `backAction` (`Back to <Previous Page>`) when navigating from another page, with clickable parent links and back action styled in `text-brand`.
   - The page content wrapped inside a white surface card (`bg-surface rounded-card border border-border p-4 md:p-6 shadow-card`) over the `bg-background` canvas (`AppShell` `contentSurface="card"` / `PageContainer` `surface="card"`).
8. Report ambiguities in `docs/MIGRATION.md` instead of guessing.
