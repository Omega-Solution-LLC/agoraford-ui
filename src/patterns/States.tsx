import * as React from "react";
import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "../lib/cn";
import { Text } from "../primitives/Text";

export interface EmptyStateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional icon. Defaults to an inbox icon. */
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/** Shown when a list or section has no items. Text is always passed in, translated. */
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-6 py-10 text-center", className)}>
      <div className="flex size-10 items-center justify-center rounded-pill bg-surface-muted text-muted-foreground">
        {icon ?? <Inbox className="size-5" aria-hidden="true" />}
      </div>
      <Text variant="control" as="p">{title}</Text>
      {description ? <Text variant="small">{description}</Text> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}

export interface ErrorStateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

/** Shown when loading failed. Retry is optional. */
export function ErrorState({ title, description, retryLabel = "Retry", onRetry, className }: ErrorStateProps) {
  return (
    <div role="alert" className={cn("flex flex-col items-center gap-2 px-6 py-10 text-center", className)}>
      <div className="flex size-10 items-center justify-center rounded-pill bg-danger/10 text-danger">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </div>
      <Text variant="control" as="p">{title}</Text>
      {description ? <Text variant="small">{description}</Text> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-control font-sans text-control text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
