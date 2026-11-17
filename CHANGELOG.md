# Changelog

All notable changes to `@agoraford/ui`. Apps pin an exact tag, never a branch.

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
