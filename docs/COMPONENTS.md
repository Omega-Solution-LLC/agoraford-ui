# Component inventory: `@agoraford/ui` 0.1.0

Layers: tokens → primitives → patterns → layouts. Every label is a prop. The library never hard-codes text.

| Layer | Component | File | Built on | Replaces (mojaboard) |
|---|---|---|---|---|
| Tokens | tokens.css, tailwind-preset | src/tokens | CSS vars | theme, App.css, tailwind.config |
| Primitive | Button | primitives/Button.tsx | Slot, cva | src/UI/Button |
| Primitive | Spinner | primitives/Spinner.tsx | lucide | react-spinners, antd Spin |
| Primitive | Field | primitives/Field.tsx | | antd Form.Item |
| Primitive | Input, Textarea | primitives/Input.tsx | | src/UI/Input |
| Primitive | Select | primitives/Select.tsx | Radix Select | antd Select, src/UI/Select |
| Primitive | Checkbox | primitives/Checkbox.tsx | Radix | src/UI/Checkbox |
| Primitive | Switch | primitives/Switch.tsx | Radix | antd Switch |
| Primitive | RadioGroup | primitives/RadioGroup.tsx | Radix | antd Radio |
| Primitive | Badge, StatusBadge | primitives/Badge.tsx, StatusBadge.tsx | | status tags |
| Primitive | Avatar | primitives/Avatar.tsx | Radix | Avatar.jsx |
| Primitive | Tooltip | primitives/Tooltip.tsx | Radix | antd Tooltip |
| Primitive | Dialog, AlertDialog | primitives/Dialog.tsx | Radix | antd Modal, src/UI/ModalUi |
| Primitive | Sheet | primitives/Sheet.tsx | Radix | antd Drawer |
| Primitive | DropdownMenu | primitives/DropdownMenu.tsx | Radix | antd Dropdown, src/UI/Dropdown |
| Primitive | Popover | primitives/Popover.tsx | Radix | |
| Primitive | Tabs | primitives/Tabs.tsx | Radix | antd Tabs, src/UI/Tabs |
| Primitive | SegmentedControl | primitives/SegmentedControl.tsx | | src/UI/SegmentedControl |
| Primitive | Card | primitives/Card.tsx | | src/UI/Card |
| Primitive | Separator, Skeleton, Progress | primitives/Feedback.tsx | Radix | |
| Primitive | Text | primitives/Text.tsx | cva | typography roles |
| Primitive | Toaster, toast | primitives/Toaster.tsx | sonner | react-hot-toast |
| Primitive | Breadcrumb, Pagination, Ellipsis | primitives/Navigation.tsx | | antd Pagination, layouts/Common/Breadcrumb |
| Pattern | DataTable | patterns/DataTable.tsx | TanStack Table v8 | src/UI/DataTable, antd Table |
| Pattern | SearchInput, FilterBar | patterns/FilterBar.tsx | | src/components/Common/DebouncedSearch, Filter |
| Pattern | EmptyState, ErrorState | patterns/States.tsx | | Common/EmptyState, ErrorState |
| Pattern | PageHeader, FormSection, StatCard, Timeline | patterns/Content.tsx | | src/UI/StatCard, StatusHistoryTimeline |
| Pattern | ConfirmDialog | patterns/Dialogs.tsx | Radix AlertDialog | src/UI/ConfirmAction, CommonUi/CommonDelete |
| Pattern | DatePicker, DateRangePicker | patterns/Forms.tsx | react-day-picker, date-fns | antd DatePicker, src/UI/DatePicker |
| Pattern | FileUpload | patterns/Forms.tsx | | Common/FileUploadField |
| Pattern | StepWizard | patterns/Forms.tsx | | Common/FormWizard |
| Layout | Sidebar (+ nested groups) | layouts/Sidebar.tsx | | layouts/Subscriber/SideNav |
| Layout | Topbar, AppShell | layouts/Shell.tsx | | layouts/Subscriber/Layout, Header |
| Layout | PageContainer | layouts/Shell.tsx | | |
| Layout | AuthLayout | layouts/Shell.tsx | | components/Subscriber/User/AuthShell |
| Layout | SettingsLayout | layouts/Shell.tsx | | components/Subscriber/Settings |

## Not in 0.1.0 (decide before building)

- `RichTextEditor` (tiptap wrapper), `MentionTextarea`, `TagInput`, `ColumnSelect`, `ModulePeopleDropdown`, `NotificationPopover`, `Messenger`: app-specific, stay in apps unless used across apps.
- `ServerError`, `404Page`, `LegalPage`, `LoaderSpinner`, `Loader`: move to patterns once one screen needs them.
- `MultiSelect`, `DateTimePicker`, `LanguageSwitcher`: add as Select and DatePicker variants.
- `BrandLogo`: per app (brand data), not in the library.

## Page Shell Layout Standard (All Apps)

Every authenticated page inside `AppShell` must follow the MojaBoard layout:

1. **Breadcrumb + Back Bar above the card:** Render `Breadcrumb` with `backAction` (`Back to <Previous Page>`) above the main content card. Parent links and the back link use `text-brand`; the active/current item uses `text-foreground font-medium`.
2. **White Surface Content Card:** Wrap the page's header, KPI cards, filters, tables, and forms inside a white surface card (`rounded-card border border-border bg-surface p-4 md:p-6 shadow-card`) over the `bg-background` canvas (`AppShell` `contentSurface="card"` or `PageContainer` `surface="card"`).

## Rules for adding a component

1. No business logic, no API calls, no router imports.
2. Every label, message and aria-label comes in as a prop.
3. Styles use only semantic tokens (`bg-surface`, `text-foreground`, `text-body`, `rounded-control`). No hex, no arbitrary values.
4. Works in light and dark. Check both in Storybook before a release.
5. Add a line to `CHANGELOG.md`.
