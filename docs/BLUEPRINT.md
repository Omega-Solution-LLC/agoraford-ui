# Shared UI Library Blueprint (`agoraford-ui`)

Goal: one design system and one component library, imported by all 5 projects, with no functionality changes. Only UI/UX is unified.

---

## 0. Hard rule: Ant Design is banned

> [!CAUTION]
> **Never use Ant Design (`antd`, `@ant-design/*`) in any project, for any reason.** `mojaboard` is the only place it exists today, and it must be **fully removed**. All UI is built with Tailwind CSS and `@agoraford/ui` components.

Instructions for the AI agent / developers:
1. Do **not** import anything from `antd` or `@ant-design/*`, and do not add them to any `package.json`.
2. In `mojaboard`, replace every antd component with the `@agoraford/ui` equivalent (mapping table in section 5.4), module by module.
3. Delete `ConfigProvider` in `App.jsx`, the antd theme code, antd-related CSS overrides in `App.css`, and `important: true` in `tailwind.config.js`.
4. When no antd usage remains, run `pnpm remove antd` (and any `@ant-design/*`), and confirm with `grep -r "antd" src` returning nothing.
5. Add an ESLint `no-restricted-imports` rule for `antd` and `@ant-design/*` so it cannot return.
6. If a needed component doesn't exist yet, build it in `agoraford-ui` on Radix + Tailwind. Do not fall back to antd, even temporarily in new code.

---

## 1. What I found (audit of `/cms`)

| Project | Framework | Tailwind | UI layer today | Font | Brand blue |
|---|---|---|---|---|---|
| `mojaboard` | Vite + React 18, **JS (JSX)**, react-router, Redux | v3 | **Ant Design 5** (125× `Select`, 38× `DatePicker`, 36× `Modal`, `Tabs`, `Form`…) + custom `src/UI/*` | Poppins (+Lato, Tiro Bangla) | `#205cfc` |
| `case-ms-v2` | Next 16, React 19, TS | **v4** | shadcn/ui (`components/ui`) + `src/shared` | Inter | token-based |
| `community-cms` | Next 16, React 19, TS | **v4** | shadcn/ui (copy of case-ms-v2) | Inter + Playfair | token-based |
| `e-disclosure` | Next 15, React 19, TS | v3 | ~100 hand-built components in `src/components/ui` (many duplicates: `Button.tsx` + `action-button.tsx`, `Table.tsx` + `DataTable.tsx`, `Modal.tsx` + `Modals.tsx` + `dialog.tsx`) | Inter + Playfair | `#2563EB` |
| `laatweet` | Next 15, React 19, TS | v3 | hand-built `ui/` + `shared/` + a documented design system (`docs/DESIGN_SYSTEM.md`) | Inter | `#2563EB` |

Important facts:
- **"Undesign" = Ant Design (`antd`)**. It's only in `mojaboard`. No other project uses it.
- The 4 Next.js projects already **share one design language** (background ladder, hairline borders, token names like `--surface`, `--brand-ink`) but each has its own **copy** of the code. Copies have drifted. `laatweet` has the best documented system and a `/admin/design-system` specimen page.
- `mojaboard` is the odd one out: different stack (Vite, JS, React 18), different font, different blue, and its UI depends on antd.
- Four projects are separate git repos. `mojaboard` has no git repo.
- Tailwind is split between v3 and v4, and Next between 15 and 16.

> [!IMPORTANT]
> I did not run the apps or view screenshots. This blueprint comes from code and config. Step 0 should capture screenshots of every project as a baseline.

## 2. The problem

1. **Same component, 3–4 implementations.** Buttons, tables, inputs and modals exist in several versions per repo and across repos.
2. **No single source of truth.** Tokens are copy-pasted. A change in one repo never reaches the others.
3. **Inconsistent spacing, padding, radius, type scale and layout shell.** This is the "AI vibe-coded" feel. Each prompt invented a new `px-3`/`px-5`/`gap-[18px]`.
4. **Different stacks for the same product family**: antd vs shadcn vs hand-built, Poppins vs Inter, two blues.
5. **Multiple contributors and AI agents** keep adding one-off components, so drift continues.

## 3. The solution

A single repo, **`agoraford-ui`**, which is the only place where tokens, fonts, primitives, composite components and layout shells are defined. Every app imports from it. App code contains only pages and business logic.

```
Apps (mojaboard, case-ms-v2, community-cms, e-disclosure, laatweet)
        │  import { Button, DataTable, FilterBar, AppShell } from "@agoraford/ui"
        ▼
@agoraford/ui  ── layers ──────────────────────────────────────────
  4. Layouts      AppShell, Sidebar, Topbar, PageHeader, AuthLayout
  3. Patterns     DataTable, FilterBar, SearchInput, EmptyState, StatCard, FormSection, ConfirmDialog
  2. Primitives   Button, Input, Select, Checkbox, Switch, Dialog, Sheet, Tabs, Badge, Tooltip, Toast…
  1. Tokens       colors, type scale, spacing, radius, shadow, motion, z-index (CSS variables)
```

**Rules that make it work**
- Apps may not hard-code colors, radii or font sizes. They use tokens and library components only.
- A new UI need goes into the library first (PR to `agoraford-ui`), then the app upgrades the version.
- The library has **no business logic and no API calls**. Components take props and callbacks (data in, events out). Apps own data fetching and i18n strings (pass labels as props, or use a small `labels` prop/context).

### 3.1 Tech choices (simplest that works)

| Decision | Choice | Why |
|---|---|---|
| Component base | **shadcn/ui pattern on Radix primitives** (what `case-ms-v2` / `community-cms` already use), `class-variance-authority`, `clsx` + `tailwind-merge` | Accessible, unstyled primitives. 2 of 5 apps already use it. Replaces antd. |
| Styling | Tailwind with semantic tokens via CSS variables | The user's stated stack. Variables work in v3 and v4. |
| Language | TypeScript, even for `mojaboard` consumers (JSX apps can still import TS-built components) | Typed props prevent misuse. |
| Icons | `lucide-react` only | Already in all 5 apps. Remove `react-icons`. |
| Toasts | `sonner` | Already in the shadcn apps. Replaces `react-hot-toast`. |
| Tables | `@tanstack/react-table` inside our `DataTable` | One table API for all apps. |
| Forms | `react-hook-form` (already used) with `Field`, `FormSection` wrappers | No change to existing form logic. |
| Dates | `react-day-picker` (already in shadcn apps) | Replaces antd `DatePicker`. |
| Docs/visual QA | **Storybook** (Vite) in the library repo | One gallery to review every component, light and dark. Replaces per-app `/design-system` pages. |
| Package manager | pnpm | 3 repos already use pnpm workspaces. |

## 4. How to share it (simplest path)

You said you don't want to publish on npm. Three options:

| Option | How | Pros | Cons |
|---|---|---|---|
| **A. Private GitHub repo + git dependency (recommended)** | `"@agoraford/ui": "github:YOUR_ORG/agoraford-ui#v1.0.0"` | Zero infrastructure, versioned by git tag, free | Needs a deploy token in Docker/CI builds |
| B. GitHub Packages (npm registry, private) | `npm publish` from CI on tag | Real semver, proper installs | Needs `.npmrc` token setup everywhere |
| C. Git submodule | `git submodule add` in each app | Simple mental model | Painful for multiple devs and CI, easy to forget updates |
| D. Local `file:` or `pnpm link` | Dev only | Fast iteration while building the library | Never use for production builds |

**Recommendation: A, with an ability to move to B later with no code changes** (only the dependency line changes).

### 4.1 Source vs built package
- **Ship pre-built output** (`dist/`, ESM + `.d.ts`, CSS file) and commit it on release tags, or build via a `prepare` script. Pre-built is safer because Vite (`mojaboard`), Next 15 and Next 16 all consume it the same way.
- Alternative if build is a hassle: ship source and set `transpilePackages: ["@agoraford/ui"]` in Next, and add it to Tailwind `content` / `@source`. Simpler to start, but more fragile across the 5 stacks.
- Mark `react`, `react-dom` as **peerDependencies** (`^18 || ^19`). Never bundle React.

### 4.2 Tailwind v3 vs v4 (biggest technical risk)
- The library ships tokens as **plain CSS variables** (`tokens.css`) plus:
  - `tailwind-preset.js` for v3 apps (`mojaboard`, `e-disclosure`, `laatweet`)
  - `theme.css` with `@theme inline` for v4 apps (`case-ms-v2`, `community-cms`)
- Library components use only **semantic classes** (`bg-surface`, `text-foreground`, `border-border`) that both the preset and the theme define identically.
- Apps must scan the library for class names: v3 `content: [..., "./node_modules/@agoraford/ui/dist/**/*.js"]`, v4 `@source "../node_modules/@agoraford/ui/dist"`.
- **Long term, upgrade the v3 apps to v4** so there is one pipeline. Do it after the library is stable, not during.

## 5. Design system spec

### 5.1 Which look? (needs your decision, see §10)
You asked for the **mojaboard look**. The four Next apps use a different look (Inter, `#2563EB`, navy ink sidebar). My recommendation:
- **Keep mojaboard's brand**: primary `#205cfc` and its shade scale, plus its layout feel (white sidebar, light header `#f8fafc`, navy table header `#112e92`).
- **Keep the token architecture from `laatweet`** (3-fill background ladder, hairline borders, dark mode), since it's the most mature and documented.
- Tokens are variables, so switching the brand later is a one-file change.

### 5.2 Tokens (starting values, to be confirmed against mojaboard screenshots)

**Color**
| Token | Light | Notes |
|---|---|---|
| `--brand` | `#205CFC` | mojaboard primary |
| `--brand-hover` | `#1B4ED9` | shade 600 |
| `--brand-soft` | `#EEF2FF` | shade 100, selected/hover tint |
| `--brand-strong` | `#112E92` | shade 800, table header |
| `--background` | `#F8FAFC` | page canvas |
| `--surface` | `#FFFFFF` | cards, tables, inputs, dialogs |
| `--surface-muted` | `#F1F5F9` | table footer, row hover, disabled |
| `--foreground` / `--muted-foreground` | `#111827` / `#6B7280` | text |
| `--border` / `--border-strong` | `#E5E7EB` / `#D1D5DB` | hairlines |
| `--success` `--warning` `--danger` `--info` | each with `-soft` and `-border` | status |

Rule (from laatweet): **only three fills paint a region**: canvas, surface, muted. Separation comes from borders, not extra fills.
Dark mode: define the same tokens under `.dark`. Every component must work in both, even if some apps ship light only at first.

**Typography**: one family in the whole suite (decide Poppins vs Inter, §10). Load it **once** via the app's font mechanism, exposed as `--font-sans`. Bangla fallback (`Tiro Bangla` / a Bengali-capable font) for `mojaboard` and any Bangla UI.
Type roles: `display 28/36`, `h1 24/32`, `h2 20/28`, `h3 16/24 semibold`, `body 14/20`, `small 12/16`, `caption 11/14`. Expose as `.type-*` classes or a `<Text variant>` component. Remove mojaboard's `text-xxs: .35rem` (illegibly small).

**Spacing**: 4-px grid. Allowed steps: 4, 8, 12, 16, 24, 32, 48. Standard values:
- Page padding: 24 (desktop), 16 (mobile)
- Card padding: 16 or 24 (two sizes only: `sm`, `md`)
- Gap between sections: 24; between fields: 16; between label and input: 6
- No arbitrary values like `p-[13px]` in app code (enforce via lint, §7)

**Radius**: `control 8` (buttons, inputs, selects), `card 12`, `panel 16` (dialogs, drawers), `pill 9999`.
**Control height**: `sm 32`, `md 40` (default), `lg 44`. Buttons, inputs and selects all share these.
**Shadow**: `card` (subtle), `popover`, `modal`. **Motion**: 150 ms ease-out. Respect `prefers-reduced-motion`.
**Breakpoints**: use Tailwind's defaults (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`). Drop mojaboard's custom screens (`md: 769px`, `xxs`, `xs`, `3xl`), or you will get off-by-one layout bugs after the swap.
**z-index scale**: `dropdown 50`, `sticky 40`, `overlay 60`, `modal 70`, `toast 80`.

### 5.3 Component catalog

**Primitives (layer 2):** Button (variants: primary, secondary, outline, ghost, danger, link; loading; icon-only), Input, PasswordInput, Textarea, Select, **SearchableSelect / MultiSelect**, Checkbox, RadioGroup, Switch, DatePicker, DateRangePicker, FileUpload, Field (label + hint + error), Badge, StatusBadge, Avatar, Tooltip, Popover, DropdownMenu, Dialog, AlertDialog, Sheet/Drawer, Tabs, SegmentedControl, Skeleton, Spinner, Progress, Toast, Separator, Breadcrumb, Pagination.

**Patterns (layer 3):**
- `SearchInput` (debounced, clear button, `/` shortcut optional)
- `FilterBar` (search + filter chips + "clear all" + view toggle)
- `DataTable` (sortable header, sticky header, row selection, bulk-action bar, column visibility, pagination, loading skeleton, empty state, error state, responsive horizontal scroll)
- `TablePagination`, `EmptyState`, `ErrorState`, `StatCard`/`MetricCard`, `FormSection`, `ConfirmDialog`, `PageHeader` (title, description, breadcrumbs, actions), `StepWizard`, `Timeline`, `FileViewer`, `RichTextEditor` wrapper (mojaboard's tiptap), `NotificationCenter`

**Layouts (layer 4):** `AppShell` (sidebar + topbar + content, collapse, mobile drawer), `Sidebar`/`NavItem`, `Topbar`, `AuthLayout`, `PageContainer` (max-width, padding), `SettingsLayout`.
Router-agnostic: nav items take a `renderLink` or `LinkComponent` prop, so it works with `next/link` and `react-router`.

### 5.4 antd to library mapping (mojaboard)
| antd | Replace with |
|---|---|
| `Select` (125 uses) | `Select` / `SearchableSelect` / `MultiSelect` |
| `DatePicker` (38) | `DatePicker` (react-day-picker) |
| `Modal` (36) | `Dialog` / `ConfirmDialog` |
| `Spin` (36) | `Spinner` / `Skeleton` |
| `Tooltip` (31) | `Tooltip` |
| `Tabs` (22) | `Tabs` |
| `Form` (15) | `react-hook-form` + `Field` |
| `Dropdown`, `Menu` | `DropdownMenu` |
| `Pagination`, `Drawer` | `Pagination`, `Sheet` |
| `ConfigProvider` (App.jsx) | Delete, replace with the token provider |
| `react-hot-toast`, `react-spinners`, `react-icons` | `sonner`, `Spinner`, `lucide-react` |

Also delete the antd CSS overrides in `App.css` (`!important` rules) and `important: true` in Tailwind config. Remove `antd` from `package.json` at the end.

## 6. Repository layout

```
agoraford-ui/
├─ packages/ui/                 # the published package: @agoraford/ui
│  ├─ src/
│  │  ├─ tokens/                # tokens.css, theme.css (v4), tailwind-preset.js (v3)
│  │  ├─ primitives/
│  │  ├─ patterns/
│  │  ├─ layouts/
│  │  ├─ hooks/  lib/cn.ts
│  │  └─ index.ts               # single public entry (named exports only)
│  ├─ package.json              # exports map, peerDeps
│  └─ tsup.config.ts            # build ESM + d.ts, preserve "use client"
├─ apps/storybook/              # visual gallery + a11y checks
├─ docs/                        # DESIGN_SYSTEM.md, CONTRIBUTING.md, MIGRATION.md
├─ .github/workflows/           # CI: lint, typecheck, test, build; release on tag
├─ AGENTS.md                    # rules for AI agents (see §9)
└─ CHANGELOG.md
```

## 7. Steps (phased plan)

Each phase ends with a working, deployable state. Don't start the next until the current one is verified.

**Phase 0: Baseline (½ day)**
1. Screenshot the main screens of each app (login, dashboard, list page with table + filters, form, modal, detail page), light and dark, desktop and mobile. Store them in `agoraford-ui/docs/baseline/`.
2. Make a **component inventory** per app: all buttons, inputs, tables, modals. Mark duplicates. Pick the best implementation of each as the starting point (usually laatweet / e-disclosure for patterns, shadcn for primitives).
3. Create a git repo for `mojaboard` first (it has none), then commit its current state. This is your rollback.
4. Decide the open questions in §10.

**Phase 1: Library foundation (1–2 days)**
1. Create the private GitHub repo `agoraford-ui` with the §6 structure, pnpm, TypeScript, tsup, Storybook, ESLint, CI.
2. Write `tokens.css`, `theme.css` (v4), `tailwind-preset.js` (v3) and the font setup. Light and dark.
3. Build `cn()`, then Button, Input, Select, Checkbox, Switch, Field, Badge, Dialog, Tooltip, Tabs, Toast. Each has a Storybook story with every state (default, hover, focus, disabled, error, loading, light, dark).
4. Tag `v0.1.0`.

**Phase 2: Pilot in one app (2–3 days)**
Pick the lowest-risk app (`community-cms`, a copy of `case-ms-v2` on Tailwind v4).
1. Install via the git dependency, wire tokens, scan classes, confirm the build.
2. Replace `components/ui/*` imports with `@agoraford/ui`, one component at a time. Delete the local copies as they get replaced.
3. Fix any gaps in the library (never patch inside the app). Release `v0.2.0`, etc.
4. Run the app's tests and compare screenshots with the baseline.

**Phase 3: Patterns and layouts (3–5 days)**
Build `DataTable`, `FilterBar`, `SearchInput`, `PageHeader`, `EmptyState`, `StatCard`, `FormSection`, `ConfirmDialog`, `AppShell`, `Sidebar`, `Topbar`, `AuthLayout`. Start from the existing `laatweet`/`e-disclosure` versions (they already have sorted headers, pagination and scroll shadows) and consolidate to one API. Release `v0.5.0`.

**Phase 4: Roll out to the rest**
Order: `case-ms-v2` → `laatweet` → `e-disclosure` → `mojaboard` (last, biggest change).
For each app: swap tokens and fonts → swap primitives → swap patterns → swap layout shell → delete dead local components → run tests and compare screenshots.
- `laatweet` / `e-disclosure` are Tailwind v3, so they use the preset. Consolidate their duplicates (`Button`/`action-button`, `Table`/`DataTable`, `Modal`/`Modals`/`dialog`) into the library versions.
- **`mojaboard` migration**: do it **page by page** (module by module), not all at once. antd and the library can co-exist temporarily, because tokens are CSS variables and `important: true` is the main conflict, so remove it once the first modules are done. Order: tokens/fonts → layout shell (Layout, Header, SideNav) → shared `src/UI/*` wrappers (re-implement them on top of `@agoraford/ui` so every call site updates for free) → remaining direct antd usages → remove antd.

**Phase 5: Enforce consistency (ongoing)**
1. ESLint rules in each app: ban imports of `antd`, `react-icons`, `react-hot-toast`; ban arbitrary Tailwind values (`p-[..]`, `text-[#..]`) and raw hex colors (`eslint-plugin-tailwindcss` `no-arbitrary-value`, or `no-restricted-syntax`).
2. CI check: screenshot/visual regression for Storybook (Chromatic or Playwright snapshots).
3. PR template: "Does this belong in `agoraford-ui`?"
4. Retire each app's own `/design-system` page and `DESIGN.md`. Point them to the Storybook and `agoraford-ui/docs`.

## 8. Versioning and workflow
- Semantic versioning. Tag `vX.Y.Z`. Changelog entry per change. Apps **pin an exact tag**.
- Breaking changes (prop rename, token removal) require a major bump plus a migration note, ideally a codemod.
- Dev loop: `pnpm link` / `file:` to the local library while building, then release a tag and bump the apps.
- Upgrading all apps together is optional. An app may lag a version, but not more than one minor behind (CI reminder).

## 9. Rules for the AI agent (copy into `agoraford-ui/AGENTS.md` and into each app's `AGENTS.md`)
1. **Do not change functionality**: routes, API calls, state, permissions, data shapes and validation stay as they are. UI only.
2. Never write custom `button`/`input`/`select`/`table`/`dialog` markup in apps. Use `@agoraford/ui`. If it's missing, add it to the library first.
3. No hard-coded colors, font sizes, radii or arbitrary pixel spacing. Use tokens and the allowed spacing steps.
4. **Never use Ant Design (`antd`, `@ant-design/*`).** Remove it wherever you find it, with no exceptions.
5. Migrate in small commits (one component or page group each). Run tests, lint, typecheck and build after each.
6. Keep all existing i18n keys and `data-testid` attributes, so tests and translations continue to work.
7. Report anything ambiguous in `MIGRATION.md` instead of guessing.

## 10. Edge cases and risks

| Area | Risk | Handling |
|---|---|---|
| Tailwind v3 vs v4 | Same classes resolve differently; v3 can't use `bg-surface/50` on plain `var()` colors | Ship RGB-channel variables (laatweet already does) so opacity modifiers work in both |
| Tailwind not scanning the package | Library classes missing in app CSS (looks unstyled in prod only) | Add the package path to `content` / `@source`; add a CI smoke test that builds each app |
| React 18 (mojaboard) vs 19 | Types and `ref` differences | Peer range `^18 \|\| ^19`; avoid React 19-only APIs in the library; test in both |
| Next App Router | Server vs client components | Mark interactive components `"use client"` and keep it in the build output |
| Next 15 vs 16, Vite | Bundler differences | Prebuilt ESM, no app-specific imports in the library |
| Router coupling | `next/link` vs `react-router` | Library never imports a router; accept `LinkComponent`/`renderLink` |
| i18n | Hard-coded English strings (e.g. "Search…", "No results") | Every user-visible string is a prop with a default; apps pass translated text. Keep Bangla text rendering (font fallback, line-height) correct |
| RTL / long text | Truncation, wrapping, Bangla glyph height | Test components with long strings and Bangla in Storybook |
| Dark mode | Some apps may be light only | Tokens defined for both from the start, `next-themes` stays in the apps |
| antd removal | Complex behaviors lost: searchable multi-select, date-range, form validation display, table column resize | Inventory first (Phase 0); build equivalents with Storybook stories before replacing; migrate page by page |
| Rich text / PDF / calendar | `tiptap`, `react-pdf`, `fullcalendar` have own CSS | Keep them in apps (or optional sub-entry points), only theme them with tokens; don't bloat the core bundle |
| Bundle size | One big import pulls in everything | Named exports, `sideEffects: false`, optional per-component subpaths |
| Private repo access | Docker/CI builds fail to fetch a private git dependency | Use a read-only deploy token or GitHub Actions secret; for Docker, pass it as a BuildKit secret, never commit it; pin tags (not branches) |
| Lockfile churn | Apps use pnpm and npm mixed (`case-ms-v2/frontend` has both lockfiles) | Standardize on pnpm per app, delete the stray lockfile |
| Duplicate React | Two copies of React break hooks | peerDependencies only, and `pnpm why react` in each app |
| Visual regressions | Replacing components subtly shifts layouts | Baseline screenshots (Phase 0) and per-phase comparison; keep changes behind small PRs |
| Accessibility | Custom components lose keyboard/ARIA behavior | Build on Radix, run Storybook a11y addon, test focus rings and keyboard nav |
| Table performance | Large lists | Pagination first; add virtualization later if needed |
| Contributors bypassing the library | Drift returns | Lint bans, PR template, one owner for `agoraford-ui` reviews |
| Code duplication in `case-ms-v2` / `community-cms` | They are near copies, so changes may need to apply twice | Once both import `@agoraford/ui`, the copies disappear |

## 11. Open decisions (please confirm)
1. **Font**: Poppins (mojaboard) or Inter (the other 4)? *Suggestion: Inter for UI because it's already in 4 apps and has better numerals for tables; use Poppins only if brand requires it.*
2. **Brand blue**: `#205CFC` (mojaboard) or `#2563EB` (the others)? *Suggestion: `#205CFC`, as you asked for the mojaboard look.*
3. **Sidebar style**: mojaboard's white sidebar, or the navy ink chrome in the others?
4. **GitHub org/repo name** and whether it's private. *Suggestion: private.*
5. **Dark mode** required for all apps, or light only for now?
6. **Mojaboard**: OK to convert to TypeScript later, or keep JSX and consume typed components?
7. **Success criteria**: for example, "no `antd`, zero local copies of Button/Input/Select/Table/Dialog, all list pages use `DataTable` + `FilterBar`".

## 12. Definition of done
- All 5 apps import tokens, fonts, primitives, patterns and layouts from `@agoraford/ui` only.
- `antd`, `react-icons`, `react-hot-toast` and `react-spinners` are removed from `mojaboard`.
- No duplicated component families remain in any app.
- Storybook documents every component, light and dark.
- Lint rules and CI block hard-coded styles and banned imports.
- Existing tests pass, and no feature or route behavior changed.
