import * as React from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "../lib/cn";

export interface ViewModeSwitcherOption<T extends string = string> {
  value: T;
  label: string;
  icon: React.ReactNode;
}

export interface ViewModeSwitcherProps<T extends string = "table" | "cards"> {
  value: T;
  onValueChange: (value: T) => void;
  options?: ViewModeSwitcherOption<T>[];
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const DEFAULT_VIEW_OPTIONS: ViewModeSwitcherOption<"table" | "cards">[] = [
  { value: "table", label: "Table View", icon: <LayoutList className="size-4" /> },
  { value: "cards", label: "Cards View", icon: <LayoutGrid className="size-4" /> },
];

/**
 * Compact view-mode toggle (list/table vs cards/grid) matching MojaBoard's
 * muted track with elevated white active surface.
 */
export function ViewModeSwitcher<T extends string = "table" | "cards">({
  value,
  onValueChange,
  options,
  label = "Switch layout view",
  size = "md",
  className,
}: ViewModeSwitcherProps<T>) {
  const items = (options ?? DEFAULT_VIEW_OPTIONS) as ViewModeSwitcherOption<T>[];

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-control border border-border bg-surface-muted/70 p-1 select-none",
        size === "sm" ? "h-control-sm" : "h-control-md",
        className,
      )}
    >
      {items.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-label={opt.label}
            aria-pressed={active}
            title={opt.label}
            onClick={() => onValueChange(opt.value)}
            className={cn(
              "inline-flex items-center justify-center rounded-xs border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&_svg]:size-4",
              size === "sm" ? "h-6 w-7" : "h-full px-2.5",
              active
                ? "border-border/80 bg-surface font-semibold text-foreground shadow-xs"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
