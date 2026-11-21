import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 font-sans text-caption font-medium",
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface-muted text-muted-foreground",
        brand: "border-brand/30 bg-brand-soft text-brand",
        success: "border-success/30 [background-color:color-mix(in_srgb,rgb(var(--ui-success))_12%,rgb(var(--ui-surface)))] text-success",
        warning: "border-warning/30 [background-color:color-mix(in_srgb,rgb(var(--ui-warning))_12%,rgb(var(--ui-surface)))] text-warning",
        danger: "border-danger/30 [background-color:color-mix(in_srgb,rgb(var(--ui-danger))_12%,rgb(var(--ui-surface)))] text-danger",
        info: "border-brand/30 bg-brand-soft text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
