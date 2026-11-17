import * as React from "react";
import { cn } from "../lib/cn";
import { Card } from "../primitives/Card";
import { Text } from "../primitives/Text";
import { Skeleton } from "../primitives/Feedback";

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Breadcrumb or back link, rendered above the title. */
  breadcrumb?: React.ReactNode;
  /** Right-aligned actions. */
  actions?: React.ReactNode;
  className?: string;
}

/** Page title block: title (30px, extra bold), subtitle (14px), actions on the right. */
export function PageHeader({ title, subtitle, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="flex min-w-0 flex-col gap-1">
        {breadcrumb}
        <Text variant="title">{title}</Text>
        {subtitle ? <Text variant="subtitle">{subtitle}</Text> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export interface FormSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Titled group of form fields. Fields inside are spaced 16px apart. */
export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <Text variant="control" as="h2" className="font-semibold">{title}</Text>
        {description ? <Text variant="small">{description}</Text> : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export type StatTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

const statToneClass: Record<StatTone, string> = {
  neutral: "border-border bg-surface",
  brand: "border-brand/40 bg-brand/5",
  success: "border-success/40 bg-success/5",
  warning: "border-warning/40 bg-warning/5",
  danger: "border-danger/40 bg-danger/5",
  info: "border-info/40 bg-info/5",
};

const statIconClass: Record<StatTone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  brand: "bg-brand/10 text-brand",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
};

export interface StatCardProps {
  /** Accent for the live dashboard KPI tiles. Defaults to neutral. */
  tone?: StatTone;
  label: React.ReactNode;
  value: React.ReactNode;
  /** Small line under the value, e.g. a date range or a delta. */
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  /** Shows a skeleton instead of the value. */
  loading?: boolean;
  className?: string;
}

/** KPI tile: label, large value, optional icon and hint. */
export function StatCard({ tone = "neutral", label, value, hint, icon, loading, className }: StatCardProps) {
  return (
    <Card padding="comfortable" className={cn("flex flex-col gap-3", statToneClass[tone], className)}>
      <div className="flex items-center gap-3">
        {icon ? (
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-control [&_svg]:size-5", statIconClass[tone])} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <Text variant="small" className="min-w-0 truncate">{label}</Text>
      </div>
      {loading ? <Skeleton className="h-8 w-24" /> : <Text variant="title" as="span">{value}</Text>}
      {hint ? <Text variant="caption">{hint}</Text> : null}
    </Card>
  );
}

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
}

/** Vertical event list, for status history and activity logs. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="mt-1.5 size-2.5 rounded-pill bg-brand" aria-hidden="true" />
            {i < items.length - 1 ? <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" /> : null}
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <Text variant="control">{item.title}</Text>
            {item.description ? <Text variant="small">{item.description}</Text> : null}
            {item.time ? <Text variant="caption">{item.time}</Text> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
