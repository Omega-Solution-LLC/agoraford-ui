import * as React from "react";
import { cn } from "../lib/cn";
import { Card } from "../primitives/Card";
import { Text } from "../primitives/Text";

export interface SectionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned action, e.g. a "View all" link or a button. */
  action?: React.ReactNode;
  children: React.ReactNode;
}

/** Titled card: title and subtitle on the left, action on the right, content below. */
export function SectionCard({ title, subtitle, action, children, className, ...props }: SectionCardProps) {
  return (
    <Card padding="comfortable" className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <Text variant="control" as="h2" className="font-semibold">{title}</Text>
          {subtitle ? <Text variant="small">{subtitle}</Text> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </Card>
  );
}

export type ProgressTone = "brand" | "success" | "warning" | "danger" | "info";

const barTone: Record<ProgressTone, string> = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export interface ProgressRow {
  id: string;
  label: React.ReactNode;
  value: number;
  total: number;
  tone?: ProgressTone;
  /** Right-hand text, e.g. "12 / 40". Defaults to value / total. */
  valueLabel?: React.ReactNode;
}

export interface ProgressCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  rows: ProgressRow[];
  /** Shown when there are no rows. Translated by the app. */
  emptyLabel?: React.ReactNode;
  className?: string;
}

/** Labelled progress bars inside a SectionCard, for SLA and status breakdowns. */
export function ProgressCard({ title, subtitle, rows, emptyLabel, className }: ProgressCardProps) {
  return (
    <SectionCard title={title} subtitle={subtitle} className={className}>
      {rows.length === 0 ? (
        <Text variant="small">{emptyLabel}</Text>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => {
            const pct = row.total > 0 ? Math.min(100, Math.round((row.value / row.total) * 100)) : 0;
            return (
              <li key={row.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Text variant="control">{row.label}</Text>
                  <Text variant="small" as="span" className="tabular-nums">{row.valueLabel ?? `${row.value} / ${row.total}`}</Text>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={typeof row.label === "string" ? row.label : undefined}
                  className="h-2 w-full overflow-hidden rounded-pill bg-surface-muted"
                >
                  <div className={cn("h-full rounded-pill transition-[width]", barTone[row.tone ?? "brand"])} style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
