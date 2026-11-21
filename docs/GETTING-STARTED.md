# Getting started

This guide takes an app from zero to a themed page using `@agoraford/ui`.

- [1. Install](#1-install)
- [2. Load the tokens](#2-load-the-tokens)
- [3. Configure Tailwind](#3-configure-tailwind)
- [4. Mount the providers](#4-mount-the-providers)
- [5. Build your first page](#5-build-your-first-page)
- [6. Dark mode](#6-dark-mode)
- [7. Upgrading](#7-upgrading)
- [Known limits](#known-limits)
- [Troubleshooting](#troubleshooting)

---

## 1. Install

The library is installed from GitHub, pinned to an exact tag. Never pin a branch, and never use a `file:` or `link:` path in a committed `package.json` (those paths exist only on one machine).

```bash
pnpm add "github:Omega-Solution-LLC/agoraford-ui#v0.7.1"
```

Or in `package.json`:

```json
{
  "dependencies": {
    "@agoraford/ui": "github:Omega-Solution-LLC/agoraford-ui#v0.7.1"
  }
}
```

The package has peer dependencies on `react` and `react-dom` (`^18 || ^19`). Install them in your app. Radix, TanStack Table, sonner, date-fns and the other runtime dependencies come with the library.

Check that the tag contains what you import before you pin it:

```bash
git ls-remote --tags https://github.com/Omega-Solution-LLC/agoraford-ui.git
git ls-tree v0.7.1 dist/
```

## 2. Load the tokens

Import the token stylesheet once, at the root of the app (for example in `main.tsx`, `app/layout.tsx` or `_app.tsx`):

```ts
import "@agoraford/ui/tokens.css";
```

This defines every `--ui-*` CSS variable (colors, type, radius, spacing, z-index, dark-mode overrides). Apps never copy token values. See [TOKENS.md](TOKENS.md).

## 3. Configure Tailwind

Tailwind must read the library's class names, and it must use the library preset so `rounded-*`, colors and font sizes resolve to tokens.

```js
// tailwind.config.mjs
import agoraforduiPreset from "@agoraford/ui/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [agoraforduiPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    // Required: the library ships compiled JS whose class names must be generated.
    "./node_modules/@agoraford/ui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
};
```

Rules for apps:

- Do not redefine `borderRadius`, `colors` or font sizes in the app config. The preset owns them.
- Do not add raw radius or color values. Use `rounded-control`, `rounded-card`, `bg-surface`, `text-muted-foreground`, and so on.
- The preset sets `darkMode: "class"`.

## 4. Mount the providers

Wrap the app once:

- `TooltipProvider` is required for any `Tooltip`, including the tooltips inside `RowActions`.
- `Toaster` mounts the toast region. Use `toast` from the library (sonner) to show messages.

```tsx
import "@agoraford/ui/tokens.css";
import { TooltipProvider, Toaster } from "@agoraford/ui";

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
```

For Next.js App Router, the built output already includes `"use client"`, so the components can be imported from server-rendered layouts. Keep the provider in a client component if it reads client state.

## 5. Build your first page

An authenticated page uses the app shell, a page container and a page header. Routes and data stay in the app.

```tsx
import {
  AppShell,
  Breadcrumb,
  Button,
  PageHeader,
  Separator,
  DataTable,
  EmptyState,
} from "@agoraford/ui";
import { Plus, Inbox } from "lucide-react";

type Row = { id: string; name: string };

export function MattersPage({ rows, onCreate }: { rows: Row[]; onCreate: () => void }) {
  return (
    <AppShell
      menuLabel="Open menu"
      sidebar={{
        label: "Main navigation",
        brand: <span>Product</span>,
        sections: [
          { id: "work", label: "Work", items: [{ id: "matters", label: "Matters", href: "/matters", active: true }] },
        ],
      }}
      breadcrumb={
        <Breadcrumb
          label="Breadcrumb"
          items={[{ label: "Dashboard", href: "/" }, { label: "Matters" }]}
        />
      }
    >
      <PageHeader
        title="Matters"
        subtitle="Open and closed matters for your team."
        actions={
          <Button onClick={onCreate}>
            <Plus />
            New matter
          </Button>
        }
      />
      <Separator />
      <DataTable
        columns={[{ accessorKey: "name", header: "Name" }]}
        data={rows}
        labels={{ empty: "No matters", sortAscending: "Sort ascending", sortDescending: "Sort descending" }}
        emptyState={<EmptyState icon={<Inbox />} title="No matters yet" action={<Button onClick={onCreate}>New matter</Button>} />}
      />
    </AppShell>
  );
}
```

Notes on that example:

- `AppShell` takes the sidebar as a **prop object** (`label` is required, it names the navigation landmark) and renders the content card for you.
- Pass translated strings for every `label`, `title`, `empty`, `menuLabel`, and so on. The library never hard-codes English.
- Icons come from `lucide-react`. Icons inside buttons are sized automatically (16px).

The full page anatomy is in [PATTERNS.md](PATTERNS.md#page-shell).

## 6. Dark mode

Toggle the `dark` class on `<html>`:

```ts
document.documentElement.classList.toggle("dark", isDark);
```

Tokens switch automatically. Components use semantic classes only, so they follow the switch. A `data-theme="dark"` attribute on `:root` also activates the dark tokens, but the Tailwind `dark:` variant follows the `.dark` class.

## 7. Upgrading

1. Read the `CHANGELOG.md` entries between your current tag and the new one. Breaking changes have a migration note.
2. Change the tag in `package.json`, for example `#v0.7.1` to `#v0.8.0`.
3. Run `pnpm install`, then `pnpm run typecheck`, then your tests.
4. Re-read the app's `MIGRATION.md` for open questions.

Do not upgrade across a major version without reading its migration note.

---

## Known limits

- **Tailwind v3 only.** The preset targets Tailwind v3. Apps that run Tailwind v4 (for example `case-ms-v2` and `community-cms` at the time of writing) need a v4 entry point before they can consume the preset. Until that exists, do not copy token values into the app to work around it. Record the gap in the app's `MIGRATION.md`.
- **Git-only distribution.** The package is private and is consumed by git tag. There is no npm registry release yet.
- **No Storybook or unit tests in the library yet.** The gate is `pnpm run check` (typecheck, token manifest check, build and dist verification). Apps verify their own usage.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Classes such as `bg-surface` have no effect | Preset missing, or the `dist` glob is not in `content` | Add `presets: [agoraforduiPreset]` and the `node_modules/@agoraford/ui/dist` path |
| Radius or font sizes look wrong | App config overrides `borderRadius` or `fontSize` | Remove the override; the preset owns those scales |
| Colors are wrong only in dark mode | Missing `.dark` class on `<html>` | Toggle the class (see section 6) |
| Tooltip throws or does not show | No `TooltipProvider` above it | Mount the provider once at the root |
| Toasts do not appear | No `<Toaster />` mounted | Mount it once at the root |
| Fix in the library does not show in an app | Stale install | Re-pin to the new tag and reinstall; dev servers may need a hard refresh |
| `Cannot find module "@agoraford/ui/tokens.css"` | Old install or wrong tag | Re-install; check the tag contains `src/tokens/tokens.css` |
