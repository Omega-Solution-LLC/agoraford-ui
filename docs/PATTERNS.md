# Patterns and recipes

How the components fit together for the page types the suite uses most. Each recipe names the components and the rules that apply. The UI audit skill (`.agents/skills/ui-audit`) checks against these same rules.

- [Page shell](#page-shell)
- [Page header and separator](#page-header-and-separator)
- [Detail pages](#detail-pages)
- [Data tables](#data-tables)
- [Forms](#forms)
- [Dashboards and KPIs](#dashboards-and-kpis)
- [Auth and settings](#auth-and-settings)
- [States](#states)
- [Anti-patterns](#anti-patterns)

---

## Page shell

Every authenticated page inside `AppShell` follows the same anatomy, top to bottom:

1. **Breadcrumb bar** above the content card: the trail, plus `Back to <Previous page>` when the user came from another page. Parent links and the back link are brand colored.
2. **White surface card** (`rounded-card border border-border bg-surface p-4 md:p-6`) on the `bg-background` canvas. `AppShell` does this by default (`contentSurface="card"`).
3. Inside the card, in order: **page header** → **separator** → optional notice → filters and toolbar → KPI strip → main content.

```tsx
<AppShell
  menuLabel={t("nav.menu")}
  sidebar={{ label: t("nav.main"), brand, sections }}
  breadcrumb={
    <Breadcrumb
      label={t("breadcrumb")}
      items={trail}
      backAction={previous ? { label: t("back", { page: previous.label }), href: previous.href } : undefined}
      renderLink={renderLink}
    />
  }
>
  {children}
</AppShell>
```

Rules:

- Do not nest a second card inside the content card for a toolbar, a table or a form section. Use a bare `div` with `space-y-4`, `FormSection` with hairlines, or `SectionCard` with divided rows.
- Pages do not set their own background, min-height hacks or outer padding.
- Only one breadcrumb per page. `PageHeader` does not render a second one.

---

## Page header and separator

```tsx
<div className="flex flex-col gap-4">
  <PageHeader title={t("matters.title")} subtitle={t("matters.subtitle")} actions={<Button>…</Button>} />
  <Separator />
  {/* filters, table, … */}
</div>
```

- The title is specific (`Matters`, not `Overview`).
- The subtitle is optional and must add information. One line.
- The gap above and below the `Separator` is equal (16px). Wrap header, separator and content in one `flex flex-col gap-4`.

---

## Detail pages

Use this archetype whenever a user clicks a row or card and lands on one record.

Anatomy:

```
DetailPage
├── header   → DetailHeader (brand band: back, icon, title, ≤2 badges, actions)
├── notice   → NoticeBanner or StatusActionCallout (optional, one)
├── main     → DetailTabs (one card, underline tabs)
│              └── tab bodies: DetailSection → DetailGrid → DetailField
└── aside    → DetailRail (optional)
               ├── RailSection "Overview" → RailRows → RailRow
               ├── RailSection "Next step" → StatusActionCallout / QuickActionGrid
               └── ReadinessChecklist
```

```tsx
<DetailPage
  header={
    <DetailHeader
      title={matter.title}
      icon={<Scale />}
      badges={<><StatusBadge tone="success" label={t("status.open")} /></>}
      onBack={goBack}
      backLabel={t("back")}
    />
  }
  aside={
    <DetailRail>
      <RailSection title={t("overview")}>
        <RailRows>
          <RailRow label={t("due")}>{formatDate(matter.due)}</RailRow>
        </RailRows>
      </RailSection>
    </DetailRail>
  }
>
  <DetailTabs
    items={[
      {
        value: "details",
        label: t("tabs.details"),
        content: (
          <DetailSection title={t("sections.parties")}>
            <DetailGrid columns={3}>
              <DetailField label={t("fields.owner")}>{matter.owner}</DetailField>
              <DetailField label={t("fields.region")} />
            </DetailGrid>
          </DetailSection>
        ),
      },
    ]}
  />
</DetailPage>
```

Rules for detail pages:

- One `DetailHeader` band per detail route. It is not wrapped in a white card and it has no separator under it.
- Actions go in the rail when a rail exists. Otherwise they go in the header.
- Tabs are underline tabs inside one card (`DetailTabs`). Never segmented pills on a detail page.
- Field labels are small and muted. Values are body and medium. Use `DetailField` everywhere; a raw `<dl>` is a finding.
- An empty value shows one muted placeholder (`—` or `Not assigned`), and redundant subtitles are removed.
- At most one approval or status line, at most two header badges, one bordered surface per group.
- Rail rows always live inside `RailRows`, which keeps the spacing.
- Tab bodies are bare content, never nested cards.

---

## Data tables

Use `DataTable` for any list of records. Every table is checked against the seven-point contract below.

```tsx
const [visibility, setVisibility] = useColumnVisibility("matters.table.columns");

<DataTable
  columns={columns}
  data={rows}
  labels={{ empty: t("table.empty"), sortAscending: t("sort.asc"), sortDescending: t("sort.desc") }}
  loading={isLoading}
  columnVisibility={visibility}
  onColumnVisibilityChange={setVisibility}
  emptyState={<EmptyState title={t("matters.empty")} />}
  footer={<TablePagination page={page} pageSize={size} total={total} onPageChange={setPage} onPageSizeChange={setSize} labels={paginationLabels} />}
/>
```

Column definitions for actions:

```tsx
{
  id: "actions",
  header: t("table.actions"),
  enableSorting: false,
  meta: { sticky: "right", align: "right" },
  cell: ({ row }) => (
    <RowActions
      moreLabel={t("table.more")}
      actions={[
        { key: "open", label: t("actions.open"), icon: <ArrowUpRight />, onClick: () => open(row.original.id) },
        { key: "edit", label: t("actions.edit"), icon: <Pencil />, onClick: () => edit(row.original.id) },
        { key: "delete", label: t("actions.delete"), icon: <Trash2 />, destructive: true, onClick: () => remove(row.original.id) },
      ]}
    />
  ),
}
```

The table contract:

1. **Icon-only row actions with tooltips.** `RowActions`. Never text buttons in a row.
2. **Overflow in a kebab menu.** Three most used actions inline. Destructive actions go last.
3. **Actions column is pinned right**, right-aligned, opaque background.
4. **Column chooser** when there are more than about six data columns: `ColumnVisibilityMenu` plus `useColumnVisibility` with one storage key per table. Lock the identity column and Actions.
5. **Sorting** on every column with a meaningful order. Server-paginated tables sort on the server.
6. **Pagination footer** with `TablePagination`, 32px controls.
7. **Header and body parity.** Captions uppercase, no clipped first column, no wrapped text in action cells.

Column rules: status uses `StatusBadge`; dates use one format across the app; numbers are right-aligned with `tabular-nums`; long text truncates with a title tooltip.

Loading shows skeleton rows (`loading`). Empty shows `EmptyState`. Failure shows `ErrorState` with retry.

---

## Forms

- Every control is wrapped in `Field` with a translated `label`. Put optional metadata in `labelRight` (`Optional`), and put instructions in `hint`, which renders as a `CircleHelp` tooltip.
- No helper paragraph under a field. The only text below a control is the `error`.
- Fields are spaced 20px apart. Sections (`FormSection`) are separated by 32px and a hairline.
- Choice groups: `SegmentedControl` for 2 to 4 short options, `RadioGroup` otherwise.
- Multi-step flows use `StepWizard`. Inline progress uses `Stepper`.
- Validation messages are short, sentence case, and shown with `role="alert"`.
- Primary button is rightmost in a group. One primary action per region.

```tsx
<form className="flex flex-col gap-8">
  <FormSection title={t("form.parties")}>
    <Field label={t("form.owner")} required error={errors.owner} htmlFor="owner">
      <Input id="owner" {...register("owner")} />
    </Field>
    <Field label={t("form.due")} labelRight={t("form.optional")} hint={t("form.due.hint")}>
      <DatePicker value={due} onValueChange={setDue} placeholder={t("form.pick")} />
    </Field>
  </FormSection>
  <div className="flex justify-end gap-2">
    <Button variant="outline" type="button">{t("common.cancel")}</Button>
    <Button type="submit" loading={saving}><Check />{t("common.save")}</Button>
  </div>
</form>
```

Dialogs and drawers hold forms too. They follow the same rules.

---

## Dashboards and KPIs

- KPI tiles are `StatCard` only, in an equal-width strip. Use `tone` to mark status, not decoration.
- Show no more than about four KPI blocks above the main data. Consolidate beyond that.
- Progress by team or category uses `ProgressCard`. Lists with an action use `ActionRow`.
- Charts follow the dataviz rules of the design system; they are not covered here yet.

---

## Auth and settings

- Sign-in, sign-up, password reset and invitation use `AuthLayout`, `Field`, `PasswordInput` and `Button`. `LanguageSwitcher` sits in the same place on every auth screen.
- Settings pages use `SettingsLayout` with `nav` and content. Every settings page uses `PageHeader`, `FormSection` and the same save-bar pattern. Switch rows use `ActionRow`.

---

## States

Every list, section and page has all of these:

| State | Component |
|---|---|
| Loading | `Skeleton` rows or `Spinner` (never layout shifts) |
| Empty | `EmptyState`: icon, specific title, one action |
| Error | `ErrorState` with a retry action |
| Success | `toast.success` from sonner |

Never show a bare "No data", and never use `alert()`.

---

## Anti-patterns

| Do not | Do instead |
|---|---|
| Write a local `<button>`, `<input>`, `<select>`, `<table>` or dialog | Use the library component |
| Restyle a library component with local class overrides | Add a prop or variant to the library |
| Put a number inside a plain card | `StatCard` |
| Use text buttons (`Inspect`, `Withdraw`) in table rows | `RowActions` with icons and tooltips |
| Write `View →` in a button label | Trailing `ArrowRight` icon, or just the verb |
| Put a status dot inside a badge | Text in the pill |
| Show `All records (7)` in a filter label | `SegmentedControl` with `count` |
| Use underline tabs on a page | `TabsList` segmented (underline only inside detail pages) |
| Nest a card inside a card | Bare grid or `SectionCard` with divided rows |
| Add a paragraph under a field | `hint` in a tooltip |
| Hard-code colors, radii or font sizes | Tokens (see [TOKENS.md](TOKENS.md)) |
| Use `antd` for anything | Library components |
