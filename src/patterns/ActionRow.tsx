import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import type { StatTone } from "./Content";

const iconTone: Record<StatTone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  brand: "bg-brand-soft text-brand",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
};

const countTone: Record<StatTone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  brand: "bg-brand text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
  info: "bg-info text-white",
};

export interface ActionRowProps {
  /** Icon node, rendered inside a tinted 36px tile. */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** One short line under the label, e.g. "All clear". */
  caption?: React.ReactNode;
  /** Count shown as a pill on the right. */
  count?: number;
  tone?: StatTone;
  onClick?: () => void;
  /** Accessible name for the whole row. Translated by the app. */
  ariaLabel?: string;
  className?: string;
}

/** Clickable list row for "requires attention" style lists. */
export function ActionRow({ icon, label, caption, count, tone = "neutral", onClick, ariaLabel, className }: ActionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "group flex w-full items-center gap-3 rounded-control border border-border bg-surface px-3 py-3 text-left font-sans transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      {icon ? (
        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-pill [&_svg]:size-4", iconTone[tone])} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-body font-medium text-foreground group-hover:text-brand">{label}</span>
        {caption ? <span className="truncate text-caption text-muted-foreground">{caption}</span> : null}
      </span>
      {count !== undefined ? (
        <span className={cn("shrink-0 rounded-pill px-2 py-0.5 text-caption font-semibold tabular-nums", countTone[tone])}>{count}</span>
      ) : null}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-brand" aria-hidden="true" />
    </button>
  );
}
