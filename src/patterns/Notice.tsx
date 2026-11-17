import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Text } from "../primitives/Text";

const noticeVariants = cva("flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-card border p-4 sm:p-5 font-sans shadow-sm dark:shadow-none", {
  variants: {
    tone: {
      neutral: "border-border bg-surface text-foreground",
      brand: "border-brand/25 bg-brand-soft/60 dark:bg-surface text-foreground",
      success: "border-success/25 bg-success/5 dark:bg-surface text-foreground",
      warning: "border-warning/25 bg-warning/5 dark:bg-surface text-foreground",
      danger: "border-danger/25 bg-danger/5 dark:bg-surface text-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});

const iconTone: Record<NonNullable<VariantProps<typeof noticeVariants>["tone"]>, string> = {
  neutral: "border-border bg-surface-muted text-muted-foreground",
  brand: "border-brand/20 bg-brand-soft text-brand",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  danger: "border-danger/20 bg-danger/10 text-danger",
};

export interface NoticeBannerProps extends VariantProps<typeof noticeVariants> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned action, e.g. a button. */
  action?: React.ReactNode;
  className?: string;
}

/** Inline status message with an optional icon tile and action. Used for attestation and deadline notices. */
export function NoticeBanner({ tone = "neutral", icon, title, description, action, className }: NoticeBannerProps) {
  const resolvedTone = tone ?? "neutral";
  return (
    <div role="status" className={cn(noticeVariants({ tone: resolvedTone }), className)}>
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {icon ? (
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-control border [&_svg]:size-5", iconTone[resolvedTone])} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Text variant="control" className="font-bold">{title}</Text>
          {description ? <Text variant="caption" className="block">{description}</Text> : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
