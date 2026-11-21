import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../lib/cn";
import { Sheet, SheetContent } from "../primitives/Sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../primitives/Tabs";
import type { DetailTabItem } from "./Detail";

/* DetailSheet: the detail-page anatomy in a right-hand drawer.
 *   header   icon tile, title, description, badges, header actions (close button is reserved space)
 *   tabs?    underline tabs (same as DetailTabs) OR children as the body
 *   footer?  right-aligned actions
 * Replaces hand-built drawer chrome. Apps own data, copy and handlers. */

export interface DetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Entity name. Rendered as the dialog title for screen readers. */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** lucide icon, rendered in a soft tile. */
  icon?: React.ReactNode;
  /** Status / type badges under the title. Keep to two. */
  badges?: React.ReactNode;
  /** Header actions, e.g. Edit. Keep to one or two. */
  actions?: React.ReactNode;
  /** Underline tabs. When set, `children` is ignored. */
  tabs?: DetailTabItem[];
  tabValue?: string;
  onTabChange?: (value: string) => void;
  /** Body when there are no tabs. */
  children?: React.ReactNode;
  /** Right-aligned footer actions. */
  footer?: React.ReactNode;
  /** Accessible label for the close button. */
  closeLabel?: string;
  className?: string;
}

export function DetailSheet({
  open,
  onOpenChange,
  title,
  description,
  icon,
  badges,
  actions,
  tabs,
  tabValue,
  onTabChange,
  children,
  footer,
  closeLabel = "Close",
  className,
}: DetailSheetProps) {
  const defaultTab = tabs?.[0]?.value;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel={closeLabel}
        className={cn("w-full max-w-xl gap-0 p-0", className)}
      >
        <header className="flex flex-col gap-3 border-b border-border px-4 py-4 pr-12 md:px-6">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? (
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand [&_svg]:size-5"
              >
                {icon}
              </span>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <DialogPrimitive.Title className="break-words font-sans text-subtitle font-semibold text-foreground">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="font-sans text-small text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
              {badges ? <div className="flex flex-wrap items-center gap-2 pt-1">{badges}</div> : null}
            </div>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </header>

        {tabs ? (
          <Tabs
            className="flex min-h-0 flex-1 flex-col"
            value={tabValue}
            defaultValue={tabValue === undefined ? defaultTab : undefined}
            onValueChange={onTabChange}
          >
            <div className="overflow-x-auto px-4 pt-2 md:px-6">
              <TabsList variant="underline" className="w-full min-w-max">
                {tabs.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} icon={item.icon} count={item.count}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((item) => (
              <TabsContent key={item.value} value={item.value} className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                {item.content}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
        )}

        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-4 py-3 md:px-6">
            {footer}
          </footer>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
