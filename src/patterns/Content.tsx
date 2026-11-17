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

/** Page title block: title (24px, bold), subtitle (14px), actions on the right. */
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

/** Titled group of form fields. Fields inside are spaced 20px apart. */
export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <Text variant="subtitle" as="h2" className="font-semibold text-foreground">{title}</Text>
        {description ? <Text variant="small">{description}</Text> : null}
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

export type StatTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

const statToneClass: Record<StatTone, string> = {
  neutral: "border-border border-l-border-strong bg-surface dark:bg-surface",
  brand: "border-brand/25 border-l-brand bg-brand/5 dark:bg-surface",
  success: "border-success/25 border-l-success bg-success/5 dark:bg-surface",
  warning: "border-warning/25 border-l-warning bg-warning/5 dark:bg-surface",
  danger: "border-danger/25 border-l-danger bg-danger/5 dark:bg-surface",
  info: "border-info/25 border-l-info bg-info/5 dark:bg-surface",
};

const statIconClass: Record<StatTone, string> = {
  neutral: "bg-surface text-muted-foreground border-border",
  brand: "bg-surface text-brand border-brand/20",
  success: "bg-surface text-success border-success/20",
  warning: "bg-surface text-warning border-warning/20",
  danger: "bg-surface text-danger border-danger/20",
  info: "bg-surface text-info border-info/20",
};

const statRingClass: Record<StatTone, string> = {
  neutral: "text-muted-foreground",
  brand: "text-brand",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

export interface StatCardProps {
  /** Accent for the live dashboard KPI tiles. Defaults to neutral. */
  tone?: StatTone;
  label: React.ReactNode;
  value: React.ReactNode;
  /** Small line under the value, e.g. a date range or a delta. */
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  /** Optional 0–100 circular progress indicator on the right. */
  progress?: number;
  /** Shows a skeleton instead of the value. */
  loading?: boolean;
  className?: string;
}

/** KPI tile: left accent border, icon tile on the left, label and 24px value stacked beside it, hint below a hairline. */
export function StatCard({ tone = "neutral", label, value, hint, icon, progress, loading, className }: StatCardProps) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const clamped = progress !== undefined ? Math.min(100, Math.max(0, Number(progress) || 0)) : 0;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <Card padding="sm" className={cn("flex flex-col justify-between border-l-4", statToneClass[tone], className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {icon ? (
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-control border shadow-sm dark:bg-surface-muted dark:shadow-none [&_svg]:size-5",
                statIconClass[tone],
              )}
              aria-hidden="true"
            >
              {icon}
            </span>
          ) : null}
          <div className="flex min-w-0 flex-col">
            <Text variant="small" className="truncate font-medium text-muted-foreground">
              {label}
            </Text>
            {loading ? (
              <Skeleton className="mt-1 h-7 w-16" />
            ) : (
              <span className="font-sans text-2xl font-bold leading-8 tracking-tight text-foreground tabular-nums">
                {value}
              </span>
            )}
          </div>
        </div>
        {progress !== undefined ? (
          <div className="relative flex size-12 shrink-0 items-center justify-center">
            <svg className="size-12 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
              <circle className="text-border" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
              <circle
                className={statRingClass[tone]}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="20"
                cy="20"
              />
            </svg>
            <span className="absolute text-caption font-semibold text-foreground tabular-nums">{clamped}%</span>
          </div>
        ) : null}
      </div>
      {hint ? (
        <div className="mt-2 border-t border-border/60 pt-2">
          <Text variant="caption" className="block truncate">
            {hint}
          </Text>
        </div>
      ) : null}
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
