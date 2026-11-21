# Design tokens

Tokens are the single source of truth for color, type, radius, spacing and motion. They live in one file:

- `src/tokens/tokens.css`: CSS variables (`--ui-*`), light and dark values
- `src/tokens/tailwind-preset.js`: maps the variables to Tailwind classes
- `src/tokens/design-manifest.json`: machine-readable contract for type roles, radii and control heights. `scripts/check-manifest.mjs` fails `pnpm run check` if `tokens.css` drifts from it.

Apps import `@agoraford/ui/tokens.css` and use the Tailwind preset. They never copy values into app code.

Values were measured on the live MojaBoard UI. Where a value was not measured it is marked **unverified** in `tokens.css`. Live wins over the blueprint.

---

## Colors

Colors are stored as RGB channels, so Tailwind opacity modifiers work (`bg-brand/20`, `border-danger/30`).

### Brand

| Class | Variable | Light | Use |
|---|---|---|---|
| `bg-brand`, `text-brand` | `--ui-brand` | `#205CFC` | Primary actions, links, active states |
| `bg-brand-hover` | `--ui-brand-hover` | `#1B4ED9` | Hover on brand fills |
| `bg-brand-soft` | `--ui-brand-soft` | `#EEF2FF` | Soft tints, secondary buttons, unread rows |
| `bg-brand-strong` | `--ui-brand-strong` | `#112E92` | Table header band |

### Surfaces

| Class | Variable | Light | Use |
|---|---|---|---|
| `bg-background` | `--ui-background` | `#F8FAFC` | Page canvas |
| `bg-surface` | `--ui-surface` | `#FFFFFF` | Cards, tables, inputs, dialogs |
| `bg-surface-muted` | `--ui-surface-muted` | `#F1F5F9` | Table footer, hover, disabled |

### Text

| Class | Variable | Light | Use |
|---|---|---|---|
| `text-foreground` | `--ui-foreground` | `#111827` | Primary text |
| `text-muted-foreground` | `--ui-muted-foreground` | `#4B5563` | Labels, captions, helper text |

### Borders

| Class | Variable | Light | Use |
|---|---|---|---|
| `border-border` | `--ui-border` | `#E5E7EB` | Default hairlines |
| `border-border-strong` | `--ui-border-strong` | `#D1D5DB` | Control borders (inputs, outline buttons) |

### Chrome (sidebar and topbar)

Always dark, in both themes.

| Class | Light value | Use |
|---|---|---|
| `bg-sidebar` | `#1A2035` | Sidebar and topbar fill |
| `text-sidebar-foreground` | `#CBD5E1` | Topbar text |
| `text-sidebar-muted` | `#9AA0AC` | Inactive nav items, icon buttons |
| `bg-sidebar-active` | `#262B3F` | Active nav item, hover |
| `text-sidebar-item` | `#FFFFFF` | Nav labels |
| `border-sidebar-border` | `#303649` | Hairline inside the chrome |

Layout constants: `--ui-sidebar-width: 220px`, `--ui-topbar-height: 56px` (classes `w-sidebar`, `h-topbar`).

### Status

| Class | Variable | Value | Note |
|---|---|---|---|
| `text-success`, `bg-success` | `--ui-success` | `22 163 74` | Unverified against live |
| `text-warning`, `bg-warning` | `--ui-warning` | `217 119 6` | Unverified against live |
| `text-danger`, `bg-danger` | `--ui-danger` | `220 38 38` | Unverified against live |
| `text-info`, `bg-info` | `--ui-info` | `32 92 252` | Unverified against live |

Status is shown as text in a pill (`Badge` / `StatusBadge`). Do not add a dot inside a badge.

### Dark theme

Activated by `.dark` on `<html>` or `data-theme="dark"` on `:root`. The dark values are defined in `tokens.css` and are marked **unverified** in places. Check every new screen in dark mode before release.

---

## Typography

Seven type roles. Do not invent sizes.

| Role | Class | Size | Weight | Line height | Use |
|---|---|---|---|---|---|
| title | `text-title` | 24px | 700 | 32px | Page titles (`PageHeader`) |
| section | `text-section` | 22px | 700 | 28px | Section headings in long-form pages |
| subtitle | `text-subtitle` | 14px | 400 | 20px | Muted supporting line under a title |
| body | `text-body` | 14px | 400 | 20px | Default text |
| control | `text-control` | 14px | 500 | 20px | Labels on controls, tabs |
| small | `text-small` | 12px | 400 | 16px | Field labels, secondary text |
| caption | `text-caption` | 11.5px | 400 | 14px | Badges, uppercase captions |

The font family is the system sans-serif (`font-sans`).

Weights: primary and danger buttons use 600; other buttons use 500. Inputs use `font-normal` for both text and placeholder.

The `Text` component applies a role: `<Text variant="subtitle">`.

---

## Radius

Four values. This is the only radius scale allowed.

| Class | Value | Use |
|---|---|---|
| `rounded-xs` (also `rounded`, `rounded-sm`) | 4px | Chips, keyboard hints, small inner highlights |
| `rounded-control` (also `rounded-md`) | 6px | Buttons, inputs, selects, tabs, icon buttons |
| `rounded-card` (also `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`) | 8px | Cards, tables, panels, dialogs, popovers |
| `rounded-panel` | 8px | Auth panels and similar full panels |
| `rounded-pill` (also `rounded-full`) | 9999px | Badges, avatars, switches, progress bars |

`rounded-none` is also available. Raw radii such as `rounded-[5px]` are not allowed.

---

## Control heights

| Class | Height | Use |
|---|---|---|
| `h-control-sm` | 32px | Table pagination, compact toolbar controls, row actions |
| `h-control-md` | 40px | Default: inputs, selects, buttons |
| `h-control-lg` | 44px | Large buttons |

---

## Spacing

4px grid. Allowed steps: **4, 8, 12, 16, 24, 32, 48**. Tokens `--ui-space-1` to `--ui-space-12` are defined. Tailwind's default spacing scale is also 4px-based, so `p-4` and `gap-6` match the grid. Use only the listed steps.

Common uses: 4 between an icon and its label, 8 in tight groups, 12 in list rows, 16 between blocks, 24 between sections, 32 between major regions.

Pages use `gap-4` (16px) between header, separator and content. Form fields use 20px (`space-y-5`); form sections are separated by 32px with a `border-t`.

---

## Z-index

| Token | Value | Use |
|---|---|---|
| `z-dropdown` | 50 | Menus, popovers, tooltips |
| `z-sticky` | 40 | Sticky topbar, sticky table columns |
| `z-overlay` | 60 | Modal backdrops |
| `z-modal` | 70 | Dialogs, sheets |
| `z-toast` | 80 | Toasts |

## Motion

`--ui-motion-duration: 150ms`, `--ui-motion-easing: ease-out`. Use `transition-colors` for hover and focus.

---

## Shadows

- `shadow-sm`: the card elevation (`Card` uses it; dark mode drops it). It is also used on the active segment of a subtle switcher.
- The preset defines no custom shadow tokens. `AppShell` and `PageContainer` reference `shadow-card`, which is not defined; see [CONTRIBUTING](CONTRIBUTING.md#known-gaps).

Do not use heavy shadows (`shadow-xl`, `shadow-2xl`), blurs or gradients.

---

## Forbidden in apps

- Raw hex, rgb or hsl values in components
- Arbitrary Tailwind values: `p-[13px]`, `text-[#333]`, `rounded-[5px]`, `w-[220px]`
- Font sizes outside the seven roles
- Redefined tailwind `colors`, `borderRadius` or `fontSize` in an app config
- Copying values out of `tokens.css` into app CSS

If a value you need is missing, add a token to the library (see [CONTRIBUTING.md](CONTRIBUTING.md#changing-tokens)).
