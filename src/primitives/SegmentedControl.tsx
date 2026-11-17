import * as React from "react";
import { cn } from "../lib/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
  count?: number;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Accessible name for the group. Apps pass translated text. */
  label: string;
  className?: string;
}

/** Rectangular segmented switcher (8px radius), matching the live mojaboard range tabs. */
export function SegmentedControl<T extends string>({ options, value, onValueChange, label, className }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex flex-wrap items-center gap-1 rounded-control border border-border bg-surface p-1", className)}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(opt.value)}
            className={cn(
              "inline-flex h-control-sm items-center gap-1.5 rounded-control px-3 font-sans text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              active ? "bg-brand text-white" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            )}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined ? (
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-caption font-semibold tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-surface-muted text-muted-foreground",
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
