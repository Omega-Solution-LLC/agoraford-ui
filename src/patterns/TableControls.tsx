import * as React from "react";
import { Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns3, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "../primitives/Button";
import { Select } from "../primitives/Select";
import { Tooltip } from "../primitives/Tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../primitives/DropdownMenu";

/* ----- RowActions ----- */

export interface RowAction {
  key: string;
  /** Tooltip and menu text. Translated by the app. */
  label: string;
  /** lucide icon element, e.g. <Eye />. */
  icon: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
  /** Skip the action when the user lacks permission or the state does not allow it. */
  hidden?: boolean;
}

export interface RowActionsProps {
  actions: RowAction[];
  /** Icons shown outside the menu. Default 3. The rest go in the "more" menu. */
  maxInline?: number;
  /** aria-label and tooltip for the kebab. */
  moreLabel: string;
  className?: string;
}

/**
 * Table row actions. Always icon-only with a tooltip (never a text label), the most-used
 * `maxInline` shown, the rest in a kebab menu. Order actions by frequency of use.
 * Put it in a column with `meta: { sticky: "right", align: "right" }`.
 */
export function RowActions({ actions, maxInline = 3, moreLabel, className }: RowActionsProps) {
  const visible = actions.filter((a) => !a.hidden);
  const needsMenu = visible.length > maxInline + 1;
  const inline = needsMenu ? visible.slice(0, maxInline) : visible;
  const overflow = needsMenu ? visible.slice(maxInline) : [];
  return (
    <div className={cn("flex items-center justify-end gap-1", className)}>
      {inline.map((a) => (
        <Tooltip key={a.key} content={a.label}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={a.label}
            disabled={a.disabled}
            onClick={a.onClick}
            className={cn("h-8 w-8 p-0 [&_svg]:size-4", a.destructive && "text-danger hover:text-danger")}
          >
            {a.icon}
          </Button>
        </Tooltip>
      ))}
      {overflow.length > 0 ? (
        <DropdownMenu>
          <Tooltip content={moreLabel}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={moreLabel} className="h-8 w-8 p-0">
                <MoreHorizontal className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
          </Tooltip>
          <DropdownMenuContent align="end">
            {overflow.map((a) => (
              <DropdownMenuItem key={a.key} destructive={a.destructive} disabled={a.disabled} onSelect={a.onClick}>
                <span className="[&_svg]:size-4">{a.icon}</span>
                {a.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}

/* ----- Column visibility ----- */

export interface ColumnOption {
  id: string;
  label: string;
  /** Cannot be hidden (title column, actions). */
  locked?: boolean;
}

export interface ColumnVisibilityMenuProps {
  columns: ColumnOption[];
  visibility: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
  labels: { button: string; reset: string };
  className?: string;
}

/** "Columns" dropdown with a checkmark per column. Sits in the table toolbar, same height as Filter/Export. */
export function ColumnVisibilityMenu({ columns, visibility, onChange, labels, className }: ColumnVisibilityMenuProps) {
  const shown = columns.filter((c) => visibility[c.id] !== false).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Columns3 className="size-4" aria-hidden="true" />
          {labels.button}
          <span className="rounded px-1.5 py-0.5 text-caption font-semibold tabular-nums bg-surface-muted text-muted-foreground">{shown}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 min-w-56 overflow-y-auto">
        {columns.map((c) => {
          const on = visibility[c.id] !== false;
          return (
            <DropdownMenuItem
              key={c.id}
              disabled={c.locked}
              onSelect={(e) => {
                e.preventDefault();
                onChange({ ...visibility, [c.id]: !on });
              }}
            >
              <span className="inline-flex size-4 items-center justify-center">{on ? <Check className="size-4 text-brand" aria-hidden="true" /> : null}</span>
              {c.label}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onChange({});
          }}
        >
          {labels.reset}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Column visibility that survives reloads. `storageKey` must be unique per table
 * (e.g. "coi-register.columns"). Falls back to in-memory when storage is blocked.
 */
export function useColumnVisibility(storageKey: string, initial: Record<string, boolean> = {}) {
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(initial);
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setVisibility(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* storage unavailable */
    }
  }, [storageKey]);
  const update = React.useCallback(
    (next: Record<string, boolean>) => {
      setVisibility(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
    },
    [storageKey],
  );
  return [visibility, update] as const;
}

/* ----- TablePagination ----- */

export interface TablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  labels: {
    /** e.g. "Showing 1 to 20 of 54". */
    showing: (from: number, to: number, total: number) => string;
    perPage: string;
    first: string;
    previous: string;
    next: string;
    last: string;
  };
  className?: string;
}

/** Footer: range text, per-page select, first/prev/next/last. Every control is 32px tall (`h-control-sm`). */
export function TablePagination({ page, pageSize, total, pageSizeOptions = [10, 20, 50, 100], onPageChange, onPageSizeChange, labels, className }: TablePaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const nav = "h-control-sm w-control-sm p-0 [&_svg]:size-4";
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 font-sans text-small text-muted-foreground", className)}>
      <div className="flex flex-wrap items-center gap-4">
        <span>{labels.showing(from, to, total)}</span>
        <div className="flex items-center gap-2">
          <span>{labels.perPage}</span>
          <Select
            aria-label={labels.perPage}
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
            options={pageSizeOptions.map((n) => ({ value: String(n), label: String(n) }))}
            className="h-control-sm w-20 text-small"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" aria-label={labels.first} disabled={page <= 1} onClick={() => onPageChange(1)} className={nav}><ChevronsLeft aria-hidden="true" /></Button>
        <Button variant="outline" aria-label={labels.previous} disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={nav}><ChevronLeft aria-hidden="true" /></Button>
        <span className="inline-flex h-control-sm min-w-control-sm items-center justify-center rounded-control bg-brand px-2 text-small font-semibold tabular-nums text-white">{page}</span>
        <Button variant="outline" aria-label={labels.next} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} className={nav}><ChevronRight aria-hidden="true" /></Button>
        <Button variant="outline" aria-label={labels.last} disabled={page >= pageCount} onClick={() => onPageChange(pageCount)} className={nav}><ChevronsRight aria-hidden="true" /></Button>
      </div>
    </div>
  );
}
