import * as React from "react";
import { DetailPage } from "./Detail";
import { cn } from "../lib/cn";

/* Document-reader archetype (policy text, manuals, notices read end to end).
 *   header   DetailHeader band (back, title, badges, actions)
 *   notice?  NoticeBanner under the band (acknowledgement due, superseded)
 *   body     one reading column, max-w-3xl, on a bordered surface
 *   aside?   DetailRail with acknowledgement, versions, related items
 * Same band, rail and type roles as the entity detail pages; only the body differs. */

export interface DocumentReaderProps {
  header: React.ReactNode;
  notice?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DocumentReader({ header, notice, aside, children, className }: DocumentReaderProps) {
  return (
    <DetailPage header={header} notice={notice} aside={aside} className={className}>
      <article
        className={cn(
          "mx-auto w-full max-w-3xl rounded-card border border-border bg-surface p-4 font-sans text-body leading-relaxed text-foreground shadow-sm dark:shadow-none md:p-8",
        )}
      >
        {children}
      </article>
    </DetailPage>
  );
}
