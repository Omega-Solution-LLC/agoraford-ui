import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      tone: {
        /** For the dark sidebar and topbar chrome. */
        inverse: "text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-item",
        /** For light surfaces. */
        default: "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
      },
    },
    defaultVariants: { tone: "inverse" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Required: icon-only buttons need an accessible name. Translated by the app. */
  label: string;
}

/** Square icon-only button, 36px, used in the topbar and toolbars. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, tone, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ tone }), "size-9", className)}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = "IconButton";
