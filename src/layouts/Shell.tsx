import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../lib/cn";
import { Sheet, SheetContent, SheetTrigger } from "../primitives/Sheet";
import { Button } from "../primitives/Button";
import { Sidebar, type SidebarProps } from "./Sidebar";

export interface TopbarProps {
  /** Left side: menu button on mobile, breadcrumb or title. */
  leading?: React.ReactNode;
  /** Right side: search, notifications, user menu. */
  trailing?: React.ReactNode;
  className?: string;
}

/** Top bar, 56px tall, dark navy to match the sidebar. */
export function Topbar({ leading, trailing, className }: TopbarProps) {
  return (
    <header className={cn("sticky top-0 z-sticky flex h-topbar shrink-0 items-center justify-between gap-4 border-b border-sidebar-border bg-sidebar px-5 text-sidebar-foreground", className)}>
      <div className="flex min-w-0 items-center gap-3">{leading}</div>
      <div className="flex items-center gap-3">{trailing}</div>
    </header>
  );
}

export interface AppShellProps {
  sidebar: Omit<SidebarProps, "className">;
  topbar?: React.ReactNode;
  /** Breadcrumb + back link bar rendered above the main content card. */
  breadcrumb?: React.ReactNode;
  /** Wrap main page content in the MojaBoard white surface card. Defaults to "card". */
  contentSurface?: "card" | "plain";
  /** Label on the mobile menu button. Translated by the app. */
  menuLabel: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Full app layout: fixed sidebar on desktop, drawer on mobile, topbar, scrolling content.
 * Renders an optional breadcrumb bar above a white surface card (`contentSurface="card"`).
 * Routes and data stay in the app; this only places the chrome.
 */
export function AppShell({ sidebar, topbar, breadcrumb, contentSurface = "card", menuLabel, children, className }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className={cn("flex h-dvh min-h-0 bg-background font-sans text-body text-foreground", className)}>
        <div className="hidden md:flex">
          <Sidebar {...sidebar} className="h-full" />
        </div>
        <SheetContent side="left" className="bg-sidebar p-0 text-sidebar-foreground">
          <Sidebar {...sidebar} className="h-full w-full" />
        </SheetContent>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            leading={
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={menuLabel} className="text-sidebar-foreground hover:bg-sidebar-foreground/10 md:hidden">
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
            }
            trailing={topbar}
          />
          <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
            {breadcrumb ? <div className="mb-3">{breadcrumb}</div> : null}
            {contentSurface === "card" ? (
              <div className="rounded-card border border-border bg-surface p-4 shadow-card md:p-6">{children}</div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </Sheet>
  );
}

export interface PageContainerProps {
  children: React.ReactNode;
  /** Optional breadcrumb + back bar rendered above the content card. */
  breadcrumb?: React.ReactNode;
  /** Wrap content in the MojaBoard white surface card. Defaults to "card". */
  surface?: "card" | "plain";
  /** Max width for the content column. */
  width?: "md" | "lg" | "xl" | "full";
  className?: string;
}

/** Content column with optional breadcrumb bar, white surface card, consistent max width, and 24px section gap. */
export function PageContainer({ children, breadcrumb, surface = "card", width = "full", className }: PageContainerProps) {
  const max = { md: "max-w-3xl", lg: "max-w-5xl", xl: "max-w-7xl", full: "max-w-none" }[width];
  return (
    <div className={cn("mx-auto flex w-full flex-col gap-3", max, className)}>
      {breadcrumb}
      {surface === "card" ? (
        <div className="flex flex-col gap-6 rounded-card border border-border bg-surface p-4 shadow-card md:p-6">{children}</div>
      ) : (
        <div className="flex flex-col gap-6">{children}</div>
      )}
    </div>
  );
}

export interface AuthLayoutProps {
  /** Brand block shown above the form. */
  brand?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Centered card layout for login, sign-up, password reset and invitation pages. */
export function AuthLayout({ brand, children, className }: AuthLayoutProps) {
  return (
    <div className={cn("flex min-h-dvh items-center justify-center bg-background p-4 font-sans text-body text-foreground", className)}>
      <div className="flex w-full max-w-md flex-col gap-6 rounded-panel border border-border bg-surface p-6">
        {brand ? <div className="flex justify-center">{brand}</div> : null}
        {children}
      </div>
    </div>
  );
}

export interface SettingsLayoutProps {
  /** Side list of settings sections. */
  nav: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Two-column settings page: section list on the left, form on the right. Stacks on mobile. */
export function SettingsLayout({ nav, children, className }: SettingsLayoutProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]", className)}>
      <aside className="flex flex-col gap-1">{nav}</aside>
      <div className="flex min-w-0 flex-col gap-6">{children}</div>
    </div>
  );
}
