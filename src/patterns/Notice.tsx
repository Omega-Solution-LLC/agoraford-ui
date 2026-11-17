import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Text } from "../primitives/Text";

const noticeVariants = cva("flex items-start gap-3 rounded-card border p-4 font-sans", {
  variants: {
    tone: {
      neutral: "border-border bg-surface text-foreground",
      brand: "border-brand/30 bg-brand-soft text-foreground",
      success: "border-success/30 bg-success/10 text-foreground",
      warning: "border-warning/30 bg-warning/10 text-foreground",
      danger: "border-danger/30 bg-danger/10 text-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface NoticeBannerProps extends VariantProps<typeof noticeVariants> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned action, e.g. a button. */
  action?: React.ReactNode;
  className?: string;
}

/** Inline status message with an optional icon and action. Used for attestation and deadline notices. */
export function NoticeBanner({ tone, icon, title, description, action, className }: NoticeBannerProps) {
  return (
    <div role="status" className={cn(noticeVariants({ tone }), className)}>
      {icon ? <span className="mt-0.5 shrink-0 text-brand [&_svg]:size-4">{icon}</span> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Text variant="control">{title}</Text>
        {description ? <Text variant="small">{description}</Text> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
