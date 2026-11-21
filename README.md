# @agoraford/ui

The shared design system and UI component library for the Omega Solution LLC application suite:
**mojaboard**, **case-ms-v2**, **community-cms**, **e-disclosure** and **laatweet**.

It gives every app the same tokens (colors, type, radius, spacing), the same primitives (buttons, fields, tables, dialogs), the same patterns (detail pages, data tables, page headers) and the same app shell, so the suite looks and behaves like one product.

> **Status:** private, GitHub-only. Consumed by git tag. An npm release is planned later. Current version: see [CHANGELOG.md](CHANGELOG.md).

---

## Contents

| Document | What it covers |
|---|---|
| [Getting started](docs/GETTING-STARTED.md) | Install, pin a version, wire tokens, Tailwind preset, providers. First page in five minutes. |
| [Design tokens](docs/TOKENS.md) | Colors, type roles, radius, control heights, spacing, dark mode. The values are the contract. |
| [Component reference](docs/COMPONENTS.md) | Every exported component, its props and when to use it. |
| [Patterns and recipes](docs/PATTERNS.md) | Page shell, detail pages, data tables, forms, dashboards. How the pieces fit together. |
| [Contributing](docs/CONTRIBUTING.md) | Rules for changing the library, verification, changelog, releasing and pinning tags. |
| [Blueprint](docs/BLUEPRINT.md) | Original plan and background. Where it conflicts with the live MojaBoard UI, live wins. |

---

## Quick look

```tsx
import "@agoraford/ui/tokens.css";
import { AppShell, PageContainer, PageHeader, Button, Toaster, TooltipProvider } from "@agoraford/ui";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AppShell
        menuLabel="Open menu"
        sidebar={{
          label: "Main navigation",
          brand: <span>Product name</span>,
          sections: [{ id: "main", label: "Workspace", items: [{ id: "home", label: "Home", href: "/", active: true }] }],
        }}
      >
        <PageContainer>
          <PageHeader title="Home" actions={<Button>New item</Button>} />
          {children}
        </PageContainer>
        <Toaster />
      </AppShell>
    </TooltipProvider>
  );
}
```

Every label, message and `aria-label` is passed in as a prop. The library never hard-codes English text, so each app translates its own strings.

---

## What is in the box

- **Tokens**: one CSS file (`tokens.css`) and one Tailwind preset. Change a value once; every app that upgrades gets it.
- **Primitives** (`src/primitives`): Button, IconButton, Field, Input, Textarea, PasswordInput, Select, Checkbox, Switch, RadioGroup, Badge, StatusBadge, Avatar, Tooltip, Dialog, AlertDialog, Sheet, DropdownMenu, Popover, Tabs, SegmentedControl, Card, Table, Breadcrumb, Pagination, Separator, Skeleton, Progress, Text, Toaster.
- **Patterns** (`src/patterns`): DataTable, row actions and column controls, FilterBar, page headers, stat cards, timelines, EmptyState and ErrorState, ConfirmDialog, date pickers, FileUpload, StepWizard, the detail-page family, DetailSheet, DocumentReader, topbar pieces (search, user menu, language, notifications), and more.
- **Layouts** (`src/layouts`): Sidebar, Topbar, AppShell, PageContainer, AuthLayout, SettingsLayout.

---

## Principles

1. **UI only.** The library renders. Apps own routes, API calls, state, permissions, validation and data shapes.
2. **No business logic, no router imports.** Links are rendered through a `renderLink` prop, so `next/link`, `react-router` or a plain anchor all work.
3. **Strings are props.** Components accept translated text. They never hard-code labels.
4. **Tokens only.** No raw hex colors, no arbitrary Tailwind values such as `p-[13px]`, no radii outside the four-value scale.
5. **Light and dark.** Every component works with the `.dark` class on `<html>`.
6. **Radix underneath.** Accessible behavior (focus, keyboard, portals) comes from Radix primitives. Styling follows shadcn/ui patterns.
7. **No Ant Design.** `antd` and `@ant-design/*` are banned in every project.

---

## Requirements

- React `^18.0.0 || ^19.0.0` (peer dependency; the library never bundles React)
- Tailwind CSS **v3** (library preset) or **v4** (library theme CSS). See [Getting started](docs/GETTING-STARTED.md#3-configure-tailwind).
- pnpm 10 (pinned by `packageManager` in `package.json`) for working on the library itself

---

## Repository layout

```
agoraford-ui/
├── src/
│   ├── index.ts            # the only public entry point (named exports)
│   ├── tokens/             # tokens.css, tailwind-preset.js, design-manifest.json
│   ├── primitives/         # low-level, Radix-based components
│   ├── patterns/           # composed, app-level building blocks
│   ├── layouts/            # shell, sidebar, auth and settings layouts
│   └── lib/cn.ts           # className merge helper (tailwind-merge aware)
├── dist/                   # built output, committed so git installs work
├── scripts/                # check-manifest, verify-dist, add-use-client
├── .storybook/             # Storybook config; stories sit next to components (*.stories.tsx)
├── docs/                   # documentation (you are here)
├── CHANGELOG.md
└── package.json
```

---

## Development

```bash
pnpm install
pnpm run typecheck          # TypeScript, no emit
pnpm run build              # tsup: dist/index.js, index.d.ts, source map
pnpm run test               # Vitest: token parity, source hygiene, core component behavior
pnpm run storybook          # component docs at http://localhost:6006
pnpm run check              # typecheck + tests + token manifest + build + dist verification
```

Cap Node memory on large machines with `NODE_OPTIONS="--max-old-space-size=2048"`. Do not run `build` while an app that consumes the library is running its dev server.

Before opening a change, read [Contributing](docs/CONTRIBUTING.md).

---

## Using the library in an app

Apps depend on an exact git tag, never a branch and never a local path:

```json
"@agoraford/ui": "github:Omega-Solution-LLC/agoraford-ui#v0.8.0"
```

Full setup, upgrade steps and the Tailwind preset are in [Getting started](docs/GETTING-STARTED.md).

---

## Versioning

Semantic versioning with git tags (`vMAJOR.MINOR.PATCH`).

- **Patch**: fixes, no API or visual change intended.
- **Minor**: new components or props, additive. Visual tweaks to existing parts are called out in the changelog.
- **Major**: breaking changes to props, exports, tokens or visuals. Each one needs a migration note in `CHANGELOG.md`.

The changelog is the source of truth for what changed in each tag.

---

## Who to ask

Raise library questions and change requests as issues on this repository. Ambiguity found in an app is recorded in that app's `MIGRATION.md`, not guessed at.
