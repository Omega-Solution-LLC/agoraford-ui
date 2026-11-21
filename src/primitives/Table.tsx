import * as React from "react";
import { cn } from "../lib/cn";

/* Plain table primitives. Sorting, selection and pagination belong to DataTable. */

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Class applied to the horizontal scroll wrapper. */
  wrapperClassName?: string;
}

/** Table with a horizontal scroll wrapper, so wide tables scroll inside their card on small screens. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, ...props }, ref) => (
    <div className={cn("w-full overflow-x-auto", wrapperClassName)}>
      <table
        ref={ref}
        className={cn("w-full border-collapse text-left font-sans text-body text-foreground", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        "border-b border-border bg-surface-muted font-sans text-caption font-semibold uppercase tracking-wider text-muted-foreground select-none",
        className,
      )}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("divide-y divide-border bg-surface font-sans text-body text-foreground", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-border bg-surface-muted font-medium text-foreground", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("transition-colors hover:bg-surface-muted data-[state=selected]:bg-brand-soft", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} scope="col" className={cn("h-10 px-4 py-2 align-middle whitespace-nowrap", className)} {...props} />
  ),
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-3 align-middle", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-small text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";
