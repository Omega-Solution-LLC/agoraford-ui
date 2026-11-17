import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

export type TabsVariant = "underline" | "segmented";

const TabsVariantContext = React.createContext<TabsVariant>("segmented");

export const Tabs = TabsPrimitive.Root;

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "segmented", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        variant === "segmented"
          ? "inline-flex flex-wrap items-center gap-1 rounded-control border border-border bg-surface p-1"
          : "inline-flex items-center gap-1 border-b border-border",
        className,
      )}
      {...props}
    />
  </TabsVariantContext.Provider>
));
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode;
  count?: number | string;
}

/** Tab trigger: underline (default) or segmented pill matching the live mojaboard design. */
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, icon, count, children, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        variant === "segmented"
          ? "group inline-flex h-control-sm items-center gap-1.5 whitespace-nowrap rounded-control px-3 font-sans text-body font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=active]:bg-brand data-[state=active]:text-white"
          : "group -mb-px inline-flex h-control-md items-center gap-1.5 border-b-2 border-transparent px-4 font-sans text-body font-semibold text-muted-foreground transition-colors hover:border-border-strong hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=active]:border-brand data-[state=active]:text-brand",
        className,
      )}
      {...props}
    >
      {icon ? <span className="shrink-0 [&_svg]:size-4">{icon}</span> : null}
      {children}
      {count !== undefined ? (
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-caption font-semibold tabular-nums",
            variant === "segmented"
              ? "bg-surface-muted text-muted-foreground group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white"
              : "bg-surface-muted text-muted-foreground group-data-[state=active]:bg-brand-soft group-data-[state=active]:text-brand",
          )}
        >
          {count}
        </span>
      ) : null}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("pt-4 focus-visible:outline-none", className)} {...props} />
));
TabsContent.displayName = "TabsContent";
