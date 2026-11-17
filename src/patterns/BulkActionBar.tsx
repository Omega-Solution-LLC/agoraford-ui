import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "../primitives/Button";

export interface BulkActionBarProps {
  /** Number of selected items. When 0, the bar is hidden. */
  selectedCount: number;
  /** Singular/plural label, e.g. "3 selected". App owns formatting/i18n. */
  selectedLabel?: string;
  /** Clear selection callback. */
  onClear?: () => void;
  clearLabel?: string;
  /** Action buttons rendered on the right. */
  children?: React.ReactNode;
  className?: string;
}

/** Floating action bar anchored to the bottom of the viewport for multi-row selection. */
export function BulkActionBar({
  selectedCount,
  selectedLabel,
  onClear,
  clearLabel = "Clear",
  children,
  className,
}: BulkActionBarProps) {
  if (selectedCount <= 0) return null;

  return (
    <div
      role="region"
      aria-label={selectedLabel ?? `${selectedCount} selected`}
      className={cn(
        "fixed bottom-6 left-1/2 z-sticky -translate-x-1/2 flex items-center gap-3 rounded-card border border-sidebar-border bg-sidebar px-4 py-2.5 text-sidebar-item shadow-lg",
        className,
      )}
    >
      <span className="font-sans text-small font-semibold whitespace-nowrap">
        {selectedLabel ?? `${selectedCount} selected`}
      </span>
      {children ? (
        <div className="flex items-center gap-2 border-l border-sidebar-border pl-3">
          {children}
        </div>
      ) : null}
      {onClear ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-sidebar-foreground hover:bg-sidebar-active hover:text-sidebar-item"
          aria-label={clearLabel}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">{clearLabel}</span>
        </Button>
      ) : null}
    </div>
  );
}
