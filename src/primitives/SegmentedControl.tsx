import * as React from "react";
import { cn } from "../lib/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
  ariaLabel?: string;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Accessible name for the group. Apps pass translated text. */
  label: string;
  /** "brand" uses solid primary blue for active tab; "subtle" uses muted surface (e.g. view-mode switchers). */
  variant?: "brand" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

/** Rectangular segmented switcher on the control radius token (`rounded-control`). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  label,
  variant = "brand",
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex flex-wrap items-center rounded-control border border-border p-1",
        variant === "subtle" ? "gap-0.5 bg-surface-muted" : "gap-1 bg-surface",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.ariaLabel}
            onClick={() => onValueChange(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-control font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              size === "sm" ? "h-7 px-2.5 text-small" : "h-control-sm px-3 text-body",
              active
                ? variant === "subtle"
                  ? "bg-surface font-semibold text-foreground shadow-sm"
                  : "bg-brand text-white"
                : variant === "subtle"
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {opt.icon ? <span className="shrink-0 [&_svg]:size-4">{opt.icon}</span> : null}
            {opt.label ? <span>{opt.label}</span> : null}
            {opt.count !== undefined ? (
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-caption font-semibold tabular-nums",
                  active
                    ? variant === "subtle"
                      ? "bg-surface text-foreground"
                      : "bg-white/20 text-white"
                    : "bg-surface-muted text-muted-foreground",
                )}
              >
                {opt.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
