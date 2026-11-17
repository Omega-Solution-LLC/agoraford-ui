import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Accessible name for the nav landmark. Apps pass translated text. */
  label: string;
  /** Link component for router-agnostic rendering, e.g. next/link or react-router Link. */
  renderLink?: (item: BreadcrumbItem, children: React.ReactNode) => React.ReactNode;
}

export function Breadcrumb({ items, label, renderLink, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={cn("font-sans text-small", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          const content = item.href && !last ? (renderLink ? renderLink(item, item.label) : <a href={item.href}>{item.label}</a>) : item.label;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 ? <ChevronRight className="size-3.5" aria-hidden="true" /> : null}
              <span className={cn(last && "text-foreground font-medium", !last && "hover:text-foreground")} aria-current={last ? "page" : undefined}>
                {content}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Translated labels, passed by the app. */
  labels: { previous: string; next: string; pageOf: (page: number, total: number) => string };
  className?: string;
}

/** Previous and next paging with a "page x of y" label. Labels are passed in. */
export function Pagination({ page, pageCount, onPageChange, labels, className }: PaginationProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 font-sans text-small text-muted-foreground", className)}>
      <span>{labels.pageOf(page, pageCount)}</span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" aria-label={labels.previous} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label={labels.next} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

/** Collapsed-overflow marker, for lists that are too long to show. */
export function Ellipsis({ className }: { className?: string }) {
  return <MoreHorizontal className={cn("size-4 text-muted-foreground", className)} aria-hidden="true" />;
}
