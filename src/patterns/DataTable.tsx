import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type OnChangeFn,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Skeleton } from "../primitives/Feedback";

export interface DataTableLabels {
  /** Shown when there are no rows. Translated by the app. */
  empty: string;
  /** Read by screen readers on sortable headers. */
  sortAscending: string;
  sortDescending: string;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** Pin the column. Use "right" for the Actions column so it never scrolls away. */
    sticky?: "left" | "right";
    /** Right-align header and cells (numbers, actions). */
    align?: "right";
  }
}

export interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  labels: DataTableLabels;
  /** Shows skeleton rows instead of data. */
  loading?: boolean;
  /** Rows shown while loading. */
  loadingRows?: number;
  /** Replaces the empty message, for example an EmptyState node. */
  emptyState?: React.ReactNode;
  /** Pagination or other footer content, placed below the table. */
  footer?: React.ReactNode;
  getRowId?: (row: T, index: number) => string;
  /** Controlled column visibility. Pair with ColumnVisibilityMenu + useColumnVisibility. */
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  className?: string;
}

function cellMeta(meta: { sticky?: "left" | "right"; align?: "right" } | undefined, kind: "head" | "cell") {
  return cn(
    meta?.align === "right" && "text-right",
    meta?.sticky === "right" && cn("sticky right-0 border-l border-border", kind === "head" ? "z-sticky bg-surface-muted" : "bg-surface group-hover:bg-surface-muted"),
    meta?.sticky === "left" && cn("sticky left-0 border-r border-border", kind === "head" ? "z-sticky bg-surface-muted" : "bg-surface group-hover:bg-surface-muted"),
  );
}

/**
 * Data table on TanStack Table. Sticky header, sortable columns, loading skeleton,
 * empty state, horizontal scroll on narrow screens. Sort state is internal.
 */
export function DataTable<T>({
  columns,
  data,
  labels,
  loading = false,
  loadingRows = 5,
  emptyState,
  footer,
  getRowId,
  columnVisibility,
  onColumnVisibilityChange,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, ...(columnVisibility ? { columnVisibility } : {}) },
    onSortingChange: setSorting,
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
  });

  const colCount = table.getVisibleLeafColumns().length;
  const rows = table.getRowModel().rows;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-x-auto rounded-card border border-border bg-surface">
        <table className="w-full border-collapse font-sans text-body">
          <thead className="sticky top-0 z-sticky border-b border-border bg-surface-muted text-muted-foreground">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const sortable = header.column.getCanSort();
                  const dir = header.column.getIsSorted();
                  const sortLabel = dir === "asc" ? labels.sortDescending : labels.sortAscending;
                  return (
                    <th key={header.id} className={cn("h-10 whitespace-nowrap px-4 text-left text-caption font-semibold uppercase tracking-wider text-muted-foreground", cellMeta(header.column.columnDef.meta, "head"))}>
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          aria-label={sortLabel}
                          className="inline-flex items-center gap-1.5 uppercase tracking-wider hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {dir === "asc" ? <ArrowUp className="size-3.5" aria-hidden="true" /> : dir === "desc" ? <ArrowDown className="size-3.5" aria-hidden="true" /> : <ArrowUpDown className="size-3.5 opacity-60" aria-hidden="true" />}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`sk-${i}`} className="border-t border-border">
                  {Array.from({ length: colCount }).map((__, j) => (
                    <td key={j} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="px-4 py-10 text-center text-muted-foreground">
                  {emptyState ?? labels.empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="group border-t border-border hover:bg-surface-muted">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cn("px-4 py-3 align-middle text-foreground", cellMeta(cell.column.columnDef.meta, "cell"))}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {footer ? <div>{footer}</div> : null}
    </div>
  );
}
