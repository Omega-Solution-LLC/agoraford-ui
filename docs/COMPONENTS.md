# Component reference

Every public export from `@agoraford/ui`. The entry point is `src/index.ts`, and only named exports are supported.

Conventions used on every component:

- **Labels are props.** Anything a user reads (titles, button text, `aria-label`s, empty messages) is passed in by the app.
- **Native props pass through.** Components that wrap a DOM element accept its attributes and merge `className`.
- **Router-agnostic.** Where a link is needed, the component takes `renderLink` (or `href` for plain anchors). Never import `next/link` or `react-router` in the library.
- **Tokens only.** Styling uses semantic classes from [TOKENS.md](TOKENS.md).

Layers, from the bottom up: **tokens → primitives → patterns → layouts**. A pattern is built from primitives; a layout is built from patterns and primitives.

Only the most important props are listed. The TypeScript types in `dist/index.d.ts` are the complete contract.

- [Primitives](#primitives)
- [Patterns](#patterns)
- [Layouts](#layouts)
- [Utilities](#utilities)

---

## Primitives

### Button

```tsx
<Button variant="primary" size="md" loading asChild>…</Button>
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `danger`, `link` | `primary` | One primary action per region. `danger` for destructive actions. |
| `size` | `sm` (32px), `md` (40px), `lg` (44px), `icon` (40px square) | `md` | |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button. Use this, not custom text. |
| `asChild` | `boolean` | `false` | Render the child element (for example a router link) with button styling. |

Icons inside a button are sized to 16px automatically. Put a leading `lucide-react` icon in action buttons.

### IconButton

Square, icon-only button. `label` is required and becomes the `aria-label`.

| Prop | Values | Notes |
|---|---|---|
| `label` | `string` (required) | Accessible name. Translated by the app. |
| `tone` | `inverse` (default), `default` | `inverse` is for the dark sidebar and topbar; `default` is for light surfaces. |

### Field

Label row, control and messages. Use it around every input, select, textarea or picker.

| Prop | Type | Notes |
|---|---|---|
| `label` | `ReactNode` | Translated label text. |
| `labelRight` | `ReactNode` | Metadata on the label row, for example `Optional` or a character counter. |
| `hint` | `ReactNode` | Shown in a `CircleHelp` tooltip beside the label. Not as visible text under the control. |
| `error` | `ReactNode` | The only text shown below a control. |
| `required` | `boolean` | Adds a danger asterisk. |
| `htmlFor` | `string` | Id of the control. |

### Input, Textarea, PasswordInput

`Input` and `Textarea` accept their native element props (ref forwarded). `PasswordInput` is an `Input` with a show/hide toggle and no `type` prop. Heights and typography are fixed by the library (`h-control-md`, `text-body font-normal`).

### Select

Single-value select on Radix.

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value: string; label: ReactNode; disabled?: boolean }[]` | Required. |
| `value` / `defaultValue` | `string` | Controlled or uncontrolled. |
| `onValueChange` | `(value: string) => void` | |
| `placeholder` | `string` | Translated. |
| `invalid` | `boolean` | Danger border. |
| `aria-label` | `string` | Accessible name when there is no visible label. |

### SearchableSelect (pattern)

Select with a search field. Props: `options`, `value`, `onValueChange`, `placeholder`, `searchPlaceholder`, `emptyText`, `clearLabel`, `clearable`, `disabled`.

### Checkbox, Switch, RadioGroup, RadioGroupItem

Radix-based. Use `RadioGroup` with `RadioGroupItem` for two or more choices in a form. Use `SegmentedControl` for 2 to 4 short options in a toolbar or filter.

### Badge and StatusBadge

| Component | Props | Notes |
|---|---|---|
| `Badge` | `tone`: `neutral` (default), `brand`, `success`, `warning`, `danger`, `info` | Pill with border. Text only. |
| `StatusBadge` | `tone` (same values), `label` (required) | Status word such as Open or Overdue. No dot, no icon by default. |

Do not stack more than two badges in one row or card.

### Avatar

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` (required) | Fallback initials and alt text. |
| `src` | `string` | Optional image. |
| `size` | `sm` (24px), `md` (32px), `lg` (40px) | Default `md`. |

### Tooltip and TooltipProvider

```tsx
<TooltipProvider>
  <Tooltip content="Edit"><IconButton label="Edit">…</IconButton></Tooltip>
</TooltipProvider>
```

| Prop | Type | Notes |
|---|---|---|
| `content` | `ReactNode` | Hint text. |
| `children` | `ReactElement` | Single element that accepts a ref. |
| `side` | `top`, `right`, `bottom`, `left` | Default `top`. |
| `delayMs` | `number` | Default `300`. |

Mount `TooltipProvider` once at the app root.

### Dialog, AlertDialog

Radix dialog, centered, `rounded-card`. Compose with:

`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`.

`AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`: for confirmations. For the common confirm pattern, use [`ConfirmDialog`](#confirmdialog).

### Sheet

Side drawer built on Radix Dialog.

| Component | Notes |
|---|---|
| `Sheet`, `SheetTrigger`, `SheetClose` | Root, trigger and close. |
| `SheetContent` | `side`: `left` (default) or `right`. `closeLabel`: translated text for the close button (default `Close`). Width 288px, max 85vw. |

### DropdownMenu

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`. Standard Radix menu, styled with library tokens.

### Popover

`Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`. Use for small, non-modal panels such as notification lists.

### Tabs

| Component | Props | Notes |
|---|---|---|
| `Tabs` | Radix root props | |
| `TabsList` | `variant`: `segmented` (default) or `underline` | Segmented is the page and section tab style. Underline is for detail pages (inside `DetailTabs`). |
| `TabsTrigger` | `icon`, `count`, plus Radix trigger props | `count` renders a pill with a tabular number. |
| `TabsContent` | Radix content props | |

Every tab body is checked, not only the first one.

### SegmentedControl

Filter or view switch with 2 to 4 options.

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value; label?; icon?; count?; ariaLabel? }[]` | |
| `value` / `onValueChange` | generic `T extends string` | |
| `label` | `string` (required) | Accessible name for the group. |
| `variant` | `brand` (default), `subtle` | `subtle` is for view switchers. |
| `size` | `sm`, `md` | |

### Card

| Export | Notes |
|---|---|
| `Card` | `padding`: `none`, `sm` (16px), `comfortable` (20px), `md` (24px). Default padding `md`. |
| `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Standard card anatomy. |

Do not nest cards inside cards. Use `SectionCard` or a bare grid instead.

### Table family

`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

Plain, styled table primitives with a horizontal scroll wrapper. Use [`DataTable`](#datatable) when you need sorting, selection, pinned columns or pagination.

### Breadcrumb

```tsx
<Breadcrumb
  label="Breadcrumb"
  items={[{ label: "Dashboard", href: "/" }, { label: "Matter MAT-2026-0001" }]}
  backAction={{ label: "Back to Matters", href: "/matters" }}
  renderLink={(item, children) => <Link to={item.href!}>{children}</Link>}
/>
```

| Prop | Type | Notes |
|---|---|---|
| `items` | `{ label; href?; onClick? }[]` | The trail. The last item is the current page. |
| `label` | `string` (required) | Accessible name of the navigation landmark. |
| `backAction` | `{ label; href?; onClick? }` | Renders `Back to …` inline after the trail, in brand color. |
| `renderLink` | `(item, children) => ReactNode` | Router integration. |

### Pagination

`page`, `pageCount`, `onPageChange`, `labels: { previous; next; pageOf(page, total) }`. Previous and next paging with a "page x of y" label.

### Separator, Skeleton, Progress

- `Separator`: hairline divider (`h-px w-full bg-border`). Use it under the page header.
- `Skeleton`: loading placeholder block. Pass `className` for size.
- `Progress`: `value` (0 to 100), `label` (required, for screen readers).

### Spinner

`label` (default `"Loading"`, translate it), `size` (default 16). Use `Button loading` for in-button loading.

### Text

```tsx
<Text variant="subtitle">Supporting line</Text>
```

`variant`: `title`, `subtitle`, `body` (default), `control`, `small`, `caption`. `as` overrides the element. `section` is a Tailwind class (`text-section`), not a `Text` variant. See [TOKENS.md](TOKENS.md#typography).

### Toaster and toast

`Toaster` mounts the sonner region once, at the bottom right. `toast` is re-exported from sonner:

```ts
toast.success(t("saved"));
```

Do not use `alert()` or custom inline toasts.

---

## Patterns

### DataTable

TanStack Table v8 wrapper with sorting, loading, empty and footer slots.

| Prop | Type | Notes |
|---|---|---|
| `columns` | `ColumnDef<T, unknown>[]` | Standard TanStack columns. |
| `data` | `T[]` | |
| `labels` | `{ empty; sortAscending; sortDescending }` (required) | Translated. |
| `loading` / `loadingRows` | `boolean` / `number` | Skeleton rows. |
| `emptyState` | `ReactNode` | Replaces the empty message, for example an `EmptyState`. |
| `footer` | `ReactNode` | Put `TablePagination` here. |
| `getRowId` | `(row, index) => string` | Stable row ids. |
| `columnVisibility` / `onColumnVisibilityChange` | TanStack state | Controlled column visibility. |

Column `meta` options (declared by the library):

- `meta: { sticky: "right" }` pins the column. Use it for **Actions**.
- `meta: { align: "right" }` right-aligns header and cells. Use it for numbers and actions.

### RowActions

Icon-only row actions with tooltips. Extra actions move into a kebab menu.

| Prop | Type | Notes |
|---|---|---|
| `actions` | `{ key; label; icon; onClick; destructive?; disabled?; hidden? }[]` | `label` is the tooltip and menu text. |
| `maxInline` | `number` | Default `3`. The rest go in the menu. |
| `moreLabel` | `string` (required) | Accessible name for the kebab. |

### ColumnVisibilityMenu and useColumnVisibility

```tsx
const [visibility, setVisibility] = useColumnVisibility("matters.table.columns");
<ColumnVisibilityMenu columns={cols} visibility={visibility} onChange={setVisibility} labels={{ button: "Columns", reset: "Reset" }} />
```

- `useColumnVisibility(storageKey, initial?)` returns `[visibility, update]` and persists the choice in `localStorage`. Use one key per table.
- `ColumnOption` is `{ id; label; locked? }`. Lock the identity column and Actions.

### TablePagination

`page`, `pageSize`, `total`, `pageSizeOptions` (default `[10, 20, 50, 100]`), `onPageChange`, `onPageSizeChange`, `labels: { showing(from, to, total); perPage; first; previous; next; last }`. Controls are 32px tall.

### SearchInput and FilterBar

- `SearchInput`: `value`, `onValueChange`, `label` (required, also the placeholder), `debounceMs` (default 0 disables debounce), `clearLabel`.
- `FilterBar`: layout for a toolbar. Props `search`, `filters`, `actions`, `hasActiveFilters`, `onClear`.

### EmptyState and ErrorState

- `EmptyState`: `title`, `description?`, `icon?` (default inbox), `action?`.
- `ErrorState`: `title`, `description?`, `retryLabel?` (default `Retry`, translate it), `onRetry?`.

Every list or section has one of these. Never a bare "No data".

### PageHeader

`title` (required), `subtitle?`, `breadcrumb?`, `actions?`. Renders the title role and right-aligned actions. Pair it with a `Separator` below.

### FormSection

`title` (required), `description?`, `children`. A titled group of fields, separated by a hairline. Fields inside are spaced 20px.

### StatCard

KPI tile. `label`, `value`, `hint?`, `icon?`, `tone?` (`neutral`, `brand`, `success`, `warning`, `danger`, `info`), `progress?` (0 to 100). Use it for every KPI. Do not use a plain card with a number.

### Timeline

`items: { id; title; description?; time? }[]`. Vertical history and activity list. No grey box per entry.

### SectionCard

Titled card with a header strip and divided rows. `title` (required), `subtitle?`, `action?`, `children`.

### ProgressCard

`title`, `subtitle?`, `rows: { id; label; value; total; tone?; valueLabel? }[]`, `action?`, `emptyLabel?`. Progress rows without hand-drawn bars.

### NoticeBanner

Inline status message with an optional icon tile and one action. `tone` (default `neutral`), `title` (required), `description?`, `icon?`, `action?`.

### ActionRow

List row with an icon tile, label, one-line caption, count pill and click handler. `icon?`, `label` (required), `caption?`, `count?`, `tone?`, `onClick?`.

### ConfirmDialog

Confirmation with translated buttons. `open`, `onOpenChange`, `title` (required), `description?`, `confirmLabel` (required), `cancelLabel` (required), `destructive?`, `onConfirm`, `loading?` (spinner on the confirm button while the action runs). Use `destructive` for deletes and revokes.

### DatePicker and DateRangePicker

Built on react-day-picker and date-fns.

- `DatePicker`: `value?: Date`, `onValueChange(date | undefined)`, `placeholder` (required), `displayFormat` (date-fns, default `PP`), `disabled`, `id`.
- `DateRangePicker`: `value?: DateRange`, `onValueChange(range | undefined)`, `placeholder` (required), `displayFormat`, `disabled`.

### FileUpload

Drop area and file input. `onFilesSelected(files: File[])`, `label` (required), `hint?` (accepted types and size), `accept?`, `multiple?`, `disabled?`.

### Stepper and StepWizard

- `Stepper`: horizontal step indicator. `steps: { id; label; icon? }[]`, `current` (0-based), `onStepClick?`, `label?`.
- `StepWizard`: multi-step card with a header band, back action and the stepper. `steps`, `current`, `stepLabel` (for example `Step`, translated), `title?`, `subtitle?`, `headerActions?`, `onBack?`, `onStepClick?`, `children`.

### DetailSheet

Right drawer with the detail anatomy. Props: `open`, `onOpenChange`, `title` (required), `description?`, `icon?`, `badges?`, `actions?` (header), `tabs?` (`DetailTabItem[]`, underline tabs; when set, `children` is ignored), `tabValue?`, `onTabChange?`, `children?` (body when there are no tabs), `footer?`, `closeLabel?`. Replaces hand-built entity drawers.

### Detail page family

Used by every "click a record, land on its detail" page. Anatomy and rules are in [PATTERNS.md](PATTERNS.md#detail-pages).

| Export | Purpose |
|---|---|
| `DetailPage` | Layout. `header`, `notice?`, `children`, `aside?` (right rail). Main 2/3, aside 1/3 on `lg`. |
| `DetailHeader` | Brand band. `title`, `icon?`, `badges?` (keep to two), `actions?`, `onBack?`, `backLabel?`. |
| `DetailTabs` | One card with underline tabs. `items: { value; label; icon?; count?; content }[]`, `value`/`defaultValue`, `onValueChange`. |
| `DetailCard` | Card with optional `title` and `action`. |
| `DetailSection` | Titled block inside a tab body. `title`, `action?`. |
| `DetailStack` | Vertical stack with the detail spacing. |
| `DetailGrid` | Label/value grid. `columns`: `1`, `2` or `3` (default 3). |
| `DetailField` | One label/value pair. `label`, `children`, `empty?` (default em dash). |
| `ContactCard` | Person with a role. `role`, `name?`, `email?`, `vacantText?` (default `Vacant`). |
| `DetailRail` | Right column card. `title?` (default `Actions`), `sticky?`. |
| `RailSection` | Uppercase caption block inside the rail. `title`. |
| `RailRows` | Container for `RailRow`s (correct gap). |
| `RailRow` | Label left, value right. `label`, `children`, `empty?`. |
| `QuickAction` | Tile button with tinted icon, title and hint. `icon`, `title`, `hint?`, `tone?` (`neutral` default, `brand`, `success`, `warning`, `danger`, `info`). |
| `QuickActionGrid` | Grid of `QuickAction`s. |

### ReadinessChecklist

Rail block with done and not-done items. `items: { id; label; done; hint? }[]`, `summary?: (done, total) => ReactNode`. The app owns the summary copy.

### StatusActionCallout

One next step with one call to action. `tone?`, `icon?`, `title` (required), `description?`, `action?`.

### DocumentPreviewFrame

Framed preview with header actions. `title` (required), `actions?`, `children` (the preview), `empty?`.

### DocumentReader

Archetype for policy and document reading pages: detail header band, notice, one reading column, optional rail. `header`, `notice?`, `aside?`, `children`.

### TopbarSearch

Search field for the topbar. It is a button that opens a search dialog (`onOpen`). Props: `label` (required), `shortcut?` (for example `⌘K`), `onOpen?`, `value?`, `onValueChange?`.

### UserMenu

Avatar and name trigger for the topbar user menu. `name` (required), `role?`, `src?`, `aria-label?`. Forwards `ref` and button props, so it works with `DropdownMenuTrigger asChild`.

### LanguageSwitcher

Dropdown of language codes. `options: { code; label; short? }[]`, `value`, `onValueChange(code)`, `label?`, `tone?` (`inverse` for the dark chrome, `default` otherwise).

### NotificationBellButton

Bell icon button with an unread badge. `unreadCount?`, `label?` (accessible name), `tone?`. Forwards `ref` and button props.

### BulkActionBar

Bar that appears when rows are selected. `selectedCount` (hidden at 0), `selectedLabel?`, `onClear?`, `clearLabel?`, `children` (buttons on the right).

### ViewModeSwitcher

Switch between views (default `table` and `cards`). `value`, `onValueChange`, `options?`, `label?`, `size?`. Remove it when there is only one view.

---

## Layouts

### AppShell

The authenticated app frame: sidebar on desktop, sheet on mobile, topbar, scrolling content.

| Prop | Type | Notes |
|---|---|---|
| `sidebar` | `Omit<SidebarProps, "className">` (required) | See `Sidebar` below. |
| `topbar` | `ReactNode` | Usually a `Topbar`. |
| `breadcrumb` | `ReactNode` | Breadcrumb bar rendered above the content card. |
| `contentSurface` | `card` (default), `plain` | `card` wraps the page in the white surface card. |
| `menuLabel` | `string` (required) | Label for the mobile menu button. |
| `children` | `ReactNode` | The page. |

### Sidebar

Navigation rail, 220px, dark. Used through `AppShell`'s `sidebar` prop, or on its own.

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` (required) | Accessible name of the navigation landmark. |
| `brand` | `ReactNode` | Logo and product name block. |
| `items` | `SidebarNavItem[]` | Flat list. Ignored when `sections` is given. |
| `sections` | `{ id; label; items }[]` | Labelled groups. |
| `footer` | `ReactNode` | For example a logout button. |
| `collapsed` | `boolean` | Icons only. |
| `renderLink` | `(props: LinkProps) => ReactNode` | `props` contains `href`, `className`, `children`, `onClick?`, `aria-current?`. Pass `next/link` or a react-router `Link`. |

`SidebarNavItem`: `{ id; label; icon?; href?; active?; children?; hidden?; … }`. The group opens when a child is active. `hidden` is computed by the app from permissions.

### Topbar

56px tall dark bar. `leading` (left, for example the menu button or breadcrumb title), `trailing` (right: search, notifications, language, user menu), `className?`.

### PageContainer

Content column for a page inside `AppShell` when you need more control than the shell gives.

| Prop | Type | Notes |
|---|---|---|
| `breadcrumb` | `ReactNode` | Above the card. |
| `surface` | `card` (default), `plain` | |
| `width` | `md`, `lg`, `xl`, `full` (default) | Max width of the column. |

### AuthLayout

Centered card for login, sign-up, password reset and invitation. `brand?`, `children`. Max width `md`, panel radius, 24px padding.

### SettingsLayout

Two columns on `md` and up: section list (220px) and content. `nav` and `children`. Stacks on mobile.

---

## Utilities

### cn

```ts
import { cn } from "@agoraford/ui";
cn("px-3", isActive && "bg-brand-soft", className);
```

`clsx` plus `tailwind-merge`, with the library's custom font-size and radius roles registered, so `text-control` or `text-small` are not mistaken for colors.
