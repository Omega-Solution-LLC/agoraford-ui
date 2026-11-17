# Changelog

All notable changes to `@agoraford/ui`. Apps pin an exact tag, never a branch.

## 0.1.8

- Tokens: `--ui-weight-control` is now `600`, and dark mode defines `--ui-sidebar-active` (`#343A40`) and `--ui-sidebar-border` (`#383D43`).
- `Sidebar`: enforce `16px` (`size-4`) nav icons and mojaboard submenu hairline indent.
- `Topbar` & `UserMenu`: add bottom hairline border on `Topbar`, `font-medium` name and online status dot on `UserMenu`.
- `SegmentedControl`: rectangular `rounded-control` (`8px`) track and active segment (matching live mojaboard), with optional `count`.
- `Button` & `Tabs`: `font-semibold` labels, `text-small` on `sm` buttons.
- `Card` & `SectionCard`: subtle light-mode card shadow (`shadow-sm dark:shadow-none`) and `SectionCard` bordered header strip (`px-5 py-4 border-b`) + `p-5` body.
- `StatCard`: mojaboard horizontal layout (`border-l-4` tone accent, `36px` icon tile on the left, stacked `label` + `24px` bold `value` beside it, `hint` below a hairline, optional `progress` ring).
- `ActionRow` & `NoticeBanner`: tighter `ActionRow` (`32px` rounded-control icon tile, `py-2.5`), `NoticeBanner` with `40px` tinted icon tile.
- `DataTable` & `StepWizard`: light muted uppercase `DataTable` header (replacing dark navy header), mojaboard card + blue header band + horizontal circle stepper on `StepWizard`.

## 0.1.7

- New: `ActionRow`, a clickable list row with a tinted icon tile, caption and count pill (for attention lists).

## 0.1.6

- Fix: custom text sizes (`text-title`, `text-body`, `text-small`, ...) were dropped by `cn` next to color classes, so headings and labels lost their size. `cn` now knows the library text roles.

## 0.1.5

- `Select` accepts `aria-label` for selects without a visible label.

## 0.1.4

- Font is the system `sans-serif`, as on the live mojaboard (was Poppins, which mojaboard never applied).
- Sidebar has the right-hand border used by the live app.
- `TopbarSearch` is 320px wide from the `sm` breakpoint.
- `StatCard` shows the icon in a tinted 40px tile beside the label, with the value and hint below.

## 0.1.3

- `SidebarNavItem` gains controlled group expansion: `expanded` and `onExpandedChange`. Omit both for the uncontrolled default.

## 0.1.2

- Sidebar, topbar and card values measured from the live mojaboard UI: sidebar 220px, topbar 56px, nav items 36px with 2px gap, active item `#262B3F`, 20px cards with 16px radius.
- Tokens: `--sidebar-active`, `--sidebar-item`, `--sidebar-border`, `--sidebar-width`, `--topbar-height`, `--space-5`.
- `StatCard` gains a `tone` prop (neutral, brand, success, warning, danger, info) and uses the comfortable 20px padding.
- `Card` gains `padding="comfortable"`.
- `Sidebar` items accept `badge` (count pill) and `onSelect` (click handler). `renderLink` receives `onClick`.
- `UserMenu` button has a title.
- New: `IconButton`, `TopbarSearch`, `UserMenu`, `SectionCard`, `ProgressCard`, `NoticeBanner`.
- `Sidebar` accepts labelled `sections` (`SidebarSection`) in place of a flat `items` list.

## 0.1.0

- Tokens in `src/tokens/tokens.css`, the single source of truth for color, type, radius, control height, spacing, z-index and motion. Light and dark.
- Values taken from the live mojaboard UI, except items marked "unverified" in `tokens.css`.
- Tailwind v3 preset in `src/tokens/tailwind-preset.js`, reading only the CSS variables.
- Primitives: Button, Spinner, Field, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Badge, StatusBadge, Avatar, Tooltip, Dialog, AlertDialog, Sheet, DropdownMenu, Popover, Tabs, SegmentedControl, Card, Separator, Skeleton, Progress, Text, Toaster (sonner), Breadcrumb, Pagination, Ellipsis.
- Patterns: DataTable, SearchInput, FilterBar, EmptyState, ErrorState, PageHeader, FormSection, StatCard, Timeline, ConfirmDialog, DatePicker, DateRangePicker, FileUpload, StepWizard.
- Layouts: Sidebar (with nested groups), Topbar, AppShell (desktop sidebar and mobile drawer), PageContainer, AuthLayout, SettingsLayout.
- Build: TypeScript typecheck and tsup ESM + `.d.ts`, with `"use client"` prepended.
- Not yet verified visually against live pages. Storybook and per-component tests are not set up yet.
