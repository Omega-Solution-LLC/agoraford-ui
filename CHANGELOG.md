# Changelog

All notable changes to `@agoraford/ui`. Apps pin an exact tag, never a branch.

## 0.1.0

- Tokens in `src/tokens/tokens.css`, the single source of truth for color, type, radius, control height, spacing, z-index and motion. Light and dark.
- Values taken from the live mojaboard UI, except items marked "unverified" in `tokens.css`.
- Tailwind v3 preset in `src/tokens/tailwind-preset.js`, reading only the CSS variables.
- Primitives: Button, Spinner, Field, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Badge, StatusBadge, Avatar, Tooltip, Dialog, AlertDialog, Sheet, DropdownMenu, Popover, Tabs, SegmentedControl, Card, Separator, Skeleton, Progress, Text, Toaster (sonner), Breadcrumb, Pagination, Ellipsis.
- Patterns: DataTable, SearchInput, FilterBar, EmptyState, ErrorState, PageHeader, FormSection, StatCard, Timeline, ConfirmDialog, DatePicker, DateRangePicker, FileUpload, StepWizard.
- Layouts: Sidebar (with nested groups), Topbar, AppShell (desktop sidebar and mobile drawer), PageContainer, AuthLayout, SettingsLayout.
- Build: TypeScript typecheck and tsup ESM + `.d.ts`, with `"use client"` prepended.
- Not yet verified visually against live pages. Storybook and per-component tests are not set up yet.
