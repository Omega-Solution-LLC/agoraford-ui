import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "../lib/cn";
import { Card } from "../primitives/Card";
import { Avatar } from "../primitives/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../primitives/Tabs";

/* Detail-page pattern (mirrors live MojaBoard).
 *   DetailPage
 *     DetailHeader        brand hero band: back, icon tile, title, badges, actions
 *     notice?             NoticeBanner under the band (archived, returned, etc.)
 *     main                DetailTabs (underline tabs in one card) or DetailCard
 *     aside?              DetailRail (Actions / quick actions / overview rows)
 * The aside is optional: pages with no side actions render main at full width. */

/* ----- DetailPage ----- */

/* Placement (required, matches live MojaBoard):
 *   - The DetailHeader band sits on the page canvas, NOT inside a white surface card.
 *     Render the app page with PageContainer/AppShell surface="plain" so the band is never wrapped.
 *   - Tab card / rail card / sections are the only bordered surfaces. No card around the header.
 *   - Rail items are separated by gap, not touching: RailSection py-4 with hairline dividers. */
export interface DetailPageProps {
  header: React.ReactNode;
  /** Optional banner between the header band and the content. */
  notice?: React.ReactNode;
  children: React.ReactNode;
  /** Right rail. Omit for a full-width page. */
  aside?: React.ReactNode;
  className?: string;
}

export function DetailPage({ header, notice, children, aside, className }: DetailPageProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {header}
      {notice}
      {aside ? (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">{children}</div>
          <aside className="flex min-w-0 flex-col gap-4 lg:col-span-1">{aside}</aside>
        </div>
      ) : (
        <div className="flex min-w-0 flex-col gap-4">{children}</div>
      )}
    </div>
  );
}

/* ----- DetailHeader ----- */

export interface DetailHeaderProps {
  title: React.ReactNode;
  /** lucide icon, rendered in a soft tile. */
  icon?: React.ReactNode;
  /** Status / type badges shown under the title. Keep to two. */
  badges?: React.ReactNode;
  /** Right-aligned buttons. Use ghost-on-brand styling from the app only when needed. */
  actions?: React.ReactNode;
  /** Back button handler. Omit to hide the back button. */
  onBack?: () => void;
  backLabel?: string;
  className?: string;
}

/** Brand band at the top of every detail page. Title is white, one line. */
export function DetailHeader({ title, icon, badges, actions, onBack, backLabel = "Back", className }: DetailHeaderProps) {
  return (
    <header className={cn("flex flex-wrap items-center justify-between gap-4 rounded-card bg-brand p-4 text-white md:p-6 dark:border dark:border-border dark:bg-surface", className)}>
      <div className="flex min-w-0 basis-full items-center gap-3 sm:flex-1 sm:basis-0">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-control text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : null}
        {icon ? (
          <span className="hidden size-12 shrink-0 items-center justify-center sm:inline-flex rounded-card bg-brand-soft text-brand [&_svg]:size-6">
            {icon}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="line-clamp-2 break-words font-sans text-xl font-bold tracking-tight text-white dark:text-foreground sm:text-title">{title}</h1>
          {badges ? <div className="flex flex-wrap items-center gap-2">{badges}</div> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

/* ----- DetailTabs ----- */

export interface DetailTabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: number | string;
  content: React.ReactNode;
}

export interface DetailTabsProps {
  items: DetailTabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/** One card, underline tabs, panel padding 24px. Tab bodies are bare content, never nested cards. */
export function DetailTabs({ items, value, defaultValue, onValueChange, className }: DetailTabsProps) {
  const first = items[0]?.value;
  return (
    <Card padding="none" className={className}>
      <Tabs
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? first) : undefined}
        onValueChange={onValueChange}
      >
        <div className="overflow-x-auto px-4 pt-2">
          <TabsList variant="underline" className="w-full min-w-max">
            {items.map((item) => (
              <TabsTrigger key={item.value} value={item.value} icon={item.icon} count={item.count}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {items.map((item) => (
          <TabsContent key={item.value} value={item.value} className="p-4 md:p-6">
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

/* ----- DetailCard (single-panel pages, no tabs) ----- */

export interface DetailCardProps {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DetailCard({ title, action, children, className }: DetailCardProps) {
  return (
    <Card padding="none" className={className}>
      {title || action ? (
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 md:px-6">
          {title ? <h2 className="font-sans text-subtitle font-semibold text-foreground">{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      <div className="p-4 md:p-6">{children}</div>
    </Card>
  );
}

/* ----- DetailSection / DetailGrid / DetailField ----- */

export interface DetailSectionProps {
  title: React.ReactNode;
  /** Right-aligned control, e.g. an `Edit` button. */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Titled block inside a tab body. Sections are separated by gap-6, never boxed. */
export function DetailSection({ title, action, children, className }: DetailSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-sans text-subtitle font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Stack of DetailSection blocks. Use as the root of a tab body. */
export function DetailStack({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}

export interface DetailGridProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Columns at lg. Default 3. */
  columns?: 1 | 2 | 3;
}

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
} as const;

export function DetailGrid({ columns = 3, className, ...props }: DetailGridProps) {
  return <dl className={cn("grid gap-4", gridCols[columns], className)} {...props} />;
}

export interface DetailFieldProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  /** Shown when children is empty. Default em dash. */
  empty?: React.ReactNode;
  className?: string;
}

/** Label (small, muted) above value (body, medium). Same on every detail page. */
export function DetailField({ label, children, empty = "—", className }: DetailFieldProps) {
  const hasValue = children !== undefined && children !== null && children !== "" && children !== false;
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <dt className="font-sans text-small text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words font-sans text-body font-medium text-foreground">
        {hasValue ? children : <span className="font-normal text-muted-foreground">{empty}</span>}
      </dd>
    </div>
  );
}

/* ----- ContactCard ----- */

export interface ContactCardProps {
  /** Role label, e.g. Chair. */
  role: React.ReactNode;
  name?: string;
  email?: React.ReactNode;
  /** Text when no one holds the role. */
  vacantText?: React.ReactNode;
  className?: string;
}

/** Person with role. One bordered tile; use in a 2-column grid. */
export function ContactCard({ role, name, email, vacantText = "Vacant", className }: ContactCardProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3 rounded-card border border-border bg-surface p-3", className)}>
      <Avatar name={name ?? "—"} size="lg" className="size-10" />
      <div className="flex min-w-0 flex-col">
        <span className="font-sans text-small text-muted-foreground">{role}</span>
        {name ? (
          <>
            <span className="truncate font-sans text-body font-semibold text-foreground">{name}</span>
            {email ? <span className="truncate font-sans text-small text-muted-foreground">{email}</span> : null}
          </>
        ) : (
          <span className="font-sans text-body text-muted-foreground">{vacantText}</span>
        )}
      </div>
    </div>
  );
}

/* ----- DetailRail ----- */

export interface DetailRailProps {
  /** Rail tab title. Default "Actions". Rendered as a single underline tab. */
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Pin below the topbar while the main column scrolls. */
  sticky?: boolean;
}

/** Right column card. Children are RailSection blocks separated by hairlines. */
export function DetailRail({ title = "Actions", children, className, sticky }: DetailRailProps) {
  return (
    <Card padding="none" className={cn(sticky && "lg:sticky lg:top-4", className)}>
      <div className="px-4 pt-2">
        <div className="inline-flex border-b border-border">
          <span className="-mb-px inline-flex h-control-md items-center border-b-2 border-brand px-4 font-sans text-body font-semibold text-brand">
            {title}
          </span>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-border p-4">{children}</div>
    </Card>
  );
}

export interface RailSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Uppercase caption label + content. Sections after the first get a hairline above. */
export function RailSection({ title, children, className }: RailSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3 py-4 first:pt-0 last:pb-0", className)}>
      <h3 className="font-sans text-caption font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

export type QuickActionTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

const quickToneTile: Record<QuickActionTone, string> = {
  neutral: "bg-foreground text-surface",
  brand: "bg-brand text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
  info: "bg-info text-white",
};

const quickToneSurface: Record<QuickActionTone, string> = {
  neutral: "border-border bg-surface-muted hover:bg-surface-muted/70",
  brand: "border-brand/20 bg-brand/5 hover:bg-brand/10",
  success: "border-success/20 bg-success/5 hover:bg-success/10",
  warning: "border-warning/20 bg-warning/5 hover:bg-warning/10",
  danger: "border-danger/20 bg-danger/5 hover:bg-danger/10",
  info: "border-info/20 bg-info/5 hover:bg-info/10",
};

export interface QuickActionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** lucide icon. */
  icon: React.ReactNode;
  title: React.ReactNode;
  /** Short hint under the title, one line. */
  hint?: React.ReactNode;
  tone?: QuickActionTone;
}

/** Tile with a tinted icon, title and one-line hint. Danger tone for destructive actions. */
export const QuickAction = React.forwardRef<HTMLButtonElement, QuickActionProps>(
  ({ icon, title, hint, tone = "neutral", className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-card border p-3 text-left font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
        quickToneSurface[tone],
        className,
      )}
      {...props}
    >
      <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-control [&_svg]:size-4", quickToneTile[tone])}>
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={cn("text-small font-semibold", tone === "danger" ? "text-danger" : "text-foreground")}>{title}</span>
        {hint ? <span className="truncate text-caption text-muted-foreground">{hint}</span> : null}
      </span>
    </button>
  ),
);
QuickAction.displayName = "QuickAction";

/** 2-column grid of QuickAction tiles (1 column when only one action fits). */
export function QuickActionGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2", className)} {...props} />;
}

export interface RailRowProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  empty?: React.ReactNode;
}

/** Label left, value right-aligned. For the rail's Overview block. */
export function RailRow({ label, children, empty = "—" }: RailRowProps) {
  const hasValue = children !== undefined && children !== null && children !== "" && children !== false;
  return (
    <div className="flex items-center justify-between gap-3 font-sans text-body">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right font-medium text-foreground">
        {hasValue ? children : <span className="font-normal text-muted-foreground">{empty}</span>}
      </dd>
    </div>
  );
}

export function RailRows({ className, ...props }: React.HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("flex flex-col gap-3", className)} {...props} />;
}
