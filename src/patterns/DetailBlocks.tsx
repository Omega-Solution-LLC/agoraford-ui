import * as React from "react";
import { CircleCheck, Circle } from "lucide-react";
import { cn } from "../lib/cn";
import { Card } from "../primitives/Card";
import { Text } from "../primitives/Text";

/* Blocks composed into the detail rail or a detail tab body.
 *   ReadinessChecklist     what must be true before the next step
 *   StatusActionCallout    one next step with one CTA
 *   DocumentPreviewFrame   framed preview for a document, with header actions
 * Apps pass translated strings as props; the library never hard-codes copy. */

/* ----- ReadinessChecklist ----- */

export interface ReadinessItem {
  id: string;
  label: React.ReactNode;
  done: boolean;
  /** One line under the label. */
  hint?: React.ReactNode;
}

export interface ReadinessChecklistProps {
  items: ReadinessItem[];
  /** Summary above the list, e.g. "2 of 4 complete". Receives the counts; the app owns the copy. */
  summary?: (done: number, total: number) => React.ReactNode;
  className?: string;
}

export function ReadinessChecklist({ items, summary, className }: ReadinessChecklistProps) {
  const done = items.filter((item) => item.done).length;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {summary ? <Text variant="small">{summary(done, items.length)}</Text> : null}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            {item.done ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-label="Done" />
            ) : (
              <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-label="Not done" />
            )}
            <div className="flex min-w-0 flex-col">
              <Text variant="body" as="span" className="font-medium">
                {item.label}
              </Text>
              {item.hint ? <Text variant="small">{item.hint}</Text> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----- StatusActionCallout ----- */

export type CalloutTone = "neutral" | "brand" | "success" | "warning" | "danger";

const calloutTone: Record<CalloutTone, string> = {
  neutral: "border-border bg-surface-muted",
  brand: "border-brand/25 bg-brand/5",
  success: "border-success/25 bg-success/5",
  warning: "border-warning/25 bg-warning/5",
  danger: "border-danger/25 bg-danger/5",
};

export interface StatusActionCalloutProps {
  tone?: CalloutTone;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** One primary button for the single next step. */
  action?: React.ReactNode;
  className?: string;
}

/** The single next step for the record, with its CTA. Place first in the rail's Actions block. */
export function StatusActionCallout({ tone = "neutral", icon, title, description, action, className }: StatusActionCalloutProps) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-card border p-4 font-sans", calloutTone[tone], className)}>
      <div className="flex min-w-0 items-start gap-3">
        {icon ? <span aria-hidden="true" className="mt-0.5 shrink-0 text-brand [&_svg]:size-4">{icon}</span> : null}
        <div className="flex min-w-0 flex-col gap-1">
          <Text variant="control">{title}</Text>
          {description ? <Text variant="small">{description}</Text> : null}
        </div>
      </div>
      {action ? <div className="flex">{action}</div> : null}
    </div>
  );
}

/* ----- DocumentPreviewFrame ----- */

export interface DocumentPreviewFrameProps {
  title: React.ReactNode;
  /** Header actions, e.g. Download, Open. */
  actions?: React.ReactNode;
  /** The preview (iframe, img, or rendered document). */
  children?: React.ReactNode;
  /** Shown when there is no preview. */
  empty?: React.ReactNode;
  className?: string;
}

export function DocumentPreviewFrame({ title, actions, children, empty, className }: DocumentPreviewFrameProps) {
  const hasPreview = children !== undefined && children !== null && children !== false;
  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <Text variant="control" className="min-w-0 truncate">{title}</Text>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="flex min-h-80 items-center justify-center bg-surface-muted p-4">
        {hasPreview ? (
          <div className="size-full">{children}</div>
        ) : (
          <Text variant="small" className="text-center">{empty}</Text>
        )}
      </div>
    </Card>
  );
}
