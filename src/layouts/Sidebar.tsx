import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Target path or URL. Apps decide routing; the library only renders. */
  href?: string;
  active?: boolean;
  /** Nested items. The group opens when any child is active. */
  children?: SidebarNavItem[];
  /** Hide the item for users without permission. Apps compute this. */
  hidden?: boolean;
  /** Controlled expansion for a group. Omit to let the group manage its own state. */
  expanded?: boolean;
  /** Called with the next expanded value when a group is toggled. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Count shown as a red pill on the right. Hidden when 0 or missing. */
  badge?: number;
  /** Runs on click, for example to switch a tab. Works with or without href. */
  onSelect?: () => void;
}

function Badge({ count }: { count: number }) {
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill bg-danger px-1.5 font-sans text-caption font-semibold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

/** A labelled group of nav items, e.g. a tier or module area. */
export interface SidebarSection {
  id: string;
  label: string;
  items: SidebarNavItem[];
}

export interface SidebarProps {
  /** Brand block at the top, e.g. logo and product name. */
  brand?: React.ReactNode;
  /** Flat list of items. Ignored when `sections` is given. */
  items?: SidebarNavItem[];
  /** Labelled groups. Each label is shown above its items. */
  sections?: SidebarSection[];
  /** Footer block, for example the logout button. */
  footer?: React.ReactNode;
  /** Collapsed to icons only. */
  collapsed?: boolean;
  /**
   * Renders a link. Keeps the library router-agnostic.
   * Default renders a plain anchor. Apps pass next/link or react-router Link.
   */
  renderLink?: (props: LinkProps) => React.ReactNode;
  /** Accessible name for the nav landmark. Translated by the app. */
  label: string;
  className?: string;
}

const linkBase =
  "mx-2 flex w-[calc(100%-1rem)] items-center justify-between gap-3 rounded-control px-3 py-2 font-sans text-body font-normal leading-5 text-sidebar-item/90 transition-colors hover:bg-sidebar-active hover:text-sidebar-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&_svg]:size-[17px] [&_svg]:shrink-0";
const linkActive = "bg-sidebar-active text-sidebar-item";

export interface LinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  "aria-current"?: "page";
}

function defaultLink({ href, className, children, ...rest }: LinkProps) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

function NavRow({ item, collapsed, renderLink }: { item: SidebarNavItem; collapsed: boolean; renderLink: NonNullable<SidebarProps["renderLink"]> }) {
  const hasChildren = !!item.children?.length;
  const childActive = item.children?.some((c) => c.active || c.children?.some((g) => g.active)) ?? false;
  // Uncontrolled unless the app passes `expanded`; then the app owns the state.
  const [localOpen, setLocalOpen] = React.useState(childActive);
  const open = item.expanded ?? localOpen;
  const toggle = () => {
    item.onExpandedChange?.(!open);
    if (item.expanded === undefined) setLocalOpen(!open);
  };
  const isActive = !!item.active;

  const [flyoutOpen, setFlyoutOpen] = React.useState(false);
  const [flyoutPos, setFlyoutPos] = React.useState<{ top: number; left: number } | null>(null);
  const [leafTooltipPos, setLeafTooltipPos] = React.useState<{ top: number; left: number } | null>(null);
  const rowRef = React.useRef<HTMLLIElement>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openFlyout = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      setFlyoutPos({ top: rect.top, left: rect.right });
    }
    setFlyoutOpen(true);
  };

  const scheduleCloseFlyout = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setFlyoutOpen(false), 120);
  };

  const showLeafTooltip = () => {
    if (!collapsed || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setLeafTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
  };

  const hideLeafTooltip = () => setLeafTooltipPos(null);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (hasChildren) {
    const visibleChildren = item.children!.filter((c) => !c.hidden);
    return (
      <li
        ref={rowRef}
        className="relative"
        onMouseEnter={collapsed ? openFlyout : undefined}
        onMouseLeave={collapsed ? scheduleCloseFlyout : undefined}
      >
        <button
          type="button"
          aria-expanded={collapsed ? flyoutOpen : open}
          onClick={collapsed ? () => setFlyoutOpen((v) => !v) : toggle}
          className={cn(linkBase, collapsed && "justify-center px-0", childActive && "text-sidebar-item")}
          title={item.label}
        >
          <span className="flex min-w-0 items-center gap-3">
            {item.icon}
            {!collapsed ? <span className="truncate text-left">{item.label}</span> : null}
          </span>
          {!collapsed ? <ChevronRight className={cn("!size-3.5 text-sidebar-muted transition-transform", open && "rotate-90")} aria-hidden="true" /> : null}
        </button>
        {open && !collapsed ? (
          <ul className="ml-5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
            {visibleChildren.map((child) => (
              <NavRow key={child.id} item={child} collapsed={collapsed} renderLink={renderLink} />
            ))}
          </ul>
        ) : null}
        {collapsed && flyoutOpen && flyoutPos && visibleChildren.length > 0 ? (
          <div
            className="fixed z-50 pl-2"
            style={{ top: flyoutPos.top, left: flyoutPos.left }}
            onMouseEnter={openFlyout}
            onMouseLeave={scheduleCloseFlyout}
          >
            <div className="min-w-[210px] rounded-card border border-sidebar-border bg-sidebar py-1.5 text-sidebar-foreground shadow-lg">
              <div className="border-b border-sidebar-border px-3 py-1.5 font-sans text-caption font-semibold text-sidebar-item">
                {item.label}
              </div>
              <ul className="mt-1 flex flex-col gap-0.5 px-1">
                {visibleChildren.map((child) => {
                  const childClass = cn(
                    "flex w-full items-center justify-between gap-2 rounded-control px-2.5 py-1.5 font-sans text-small text-sidebar-item/90 transition-colors hover:bg-sidebar-active hover:text-sidebar-item",
                    child.active && linkActive,
                  );
                  const childContent = (
                    <>
                      <span className="flex min-w-0 items-center gap-2.5">
                        {child.icon}
                        <span className="truncate">{child.label}</span>
                      </span>
                      {child.badge && child.badge > 0 ? <Badge count={child.badge} /> : null}
                    </>
                  );
                  return (
                    <li key={child.id}>
                      {child.href ? (
                        renderLink({
                          href: child.href,
                          className: childClass,
                          onClick: () => {
                            setFlyoutOpen(false);
                            child.onSelect?.();
                          },
                          title: child.label,
                          children: childContent,
                          "aria-current": child.active ? "page" : undefined,
                        })
                      ) : (
                        <button
                          type="button"
                          title={child.label}
                          onClick={() => {
                            setFlyoutOpen(false);
                            child.onSelect?.();
                          }}
                          className={childClass}
                        >
                          {childContent}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </li>
    );
  }

  const className = cn(linkBase, collapsed && "justify-center px-0", isActive && linkActive);
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        {item.icon}
        {!collapsed ? <span className="truncate">{item.label}</span> : <span className="sr-only">{item.label}</span>}
      </span>
      {!collapsed && item.badge && item.badge > 0 ? <Badge count={item.badge} /> : null}
    </>
  );
  return (
    <li
      ref={rowRef}
      className="relative"
      onMouseEnter={showLeafTooltip}
      onMouseLeave={hideLeafTooltip}
    >
      {item.href ? (
        renderLink({ href: item.href, className, onClick: item.onSelect, title: item.label, children: content, "aria-current": isActive ? "page" : undefined })
      ) : (
        <button type="button" onClick={item.onSelect} title={item.label} className={className}>{content}</button>
      )}
      {collapsed && leafTooltipPos ? (
        <span
          role="tooltip"
          style={{ top: leafTooltipPos.top, left: leafTooltipPos.left }}
          className="pointer-events-none fixed z-50 -translate-y-1/2 whitespace-nowrap rounded-control border border-sidebar-border bg-sidebar px-2.5 py-1 font-sans text-caption font-medium text-sidebar-item shadow-md"
        >
          {item.label}
        </span>
      ) : null}
    </li>
  );
}

/** Dark navy sidebar. Nested groups expand inline. Active item is highlighted. */
export function Sidebar({ brand, items = [], sections, footer, collapsed = false, renderLink = defaultLink, label, className }: SidebarProps) {
  return (
    <aside className={cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", collapsed ? "w-16" : "w-sidebar", "border-r border-sidebar-border transition-[width] duration-150", className)}>
      {brand ? <div className="flex h-topbar shrink-0 items-center border-b border-sidebar-border px-4">{brand}</div> : null}
      <nav aria-label={label} className="flex-1 overflow-y-auto py-3">
        {sections ? (
          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <div key={section.id} className="flex flex-col gap-0.5">
                {!collapsed ? (
                  <span className="px-3 pb-1 font-sans text-caption font-medium uppercase tracking-wide text-sidebar-muted">{section.label}</span>
                ) : null}
                <ul className="flex flex-col gap-0.5">
                  {section.items.filter((i) => !i.hidden).map((item) => (
                    <NavRow key={item.id} item={item} collapsed={collapsed} renderLink={renderLink} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {items.filter((i) => !i.hidden).map((item) => (
              <NavRow key={item.id} item={item} collapsed={collapsed} renderLink={renderLink} />
            ))}
          </ul>
        )}
      </nav>
      {footer ? <div className="shrink-0 border-t border-sidebar-border p-2">{footer}</div> : null}
    </aside>
  );
}
