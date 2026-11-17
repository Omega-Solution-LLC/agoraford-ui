import * as React from "react";
import { ChevronDown } from "lucide-react";
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
  "flex h-9 w-full items-center gap-3 rounded-control px-3 font-sans text-body text-sidebar-item/90 transition-colors hover:bg-sidebar-active hover:text-sidebar-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&_svg]:size-4 [&_svg]:shrink-0";
const linkActive = "bg-sidebar-active font-semibold text-sidebar-item";

export interface LinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
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

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          aria-expanded={open}
          onClick={toggle}
          className={cn(linkBase, childActive && "text-sidebar-item")}
          title={collapsed ? item.label : undefined}
        >
          {item.icon}
          {!collapsed ? <span className="flex-1 text-left">{item.label}</span> : null}
          {!collapsed ? <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" /> : null}
        </button>
        {open && !collapsed ? (
          <ul className="ml-5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
            {item.children!.filter((c) => !c.hidden).map((child) => (
              <NavRow key={child.id} item={child} collapsed={collapsed} renderLink={renderLink} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  const className = cn(linkBase, isActive && linkActive);
  return (
    <li>
      {item.href ? (
        renderLink({ href: item.href, className, onClick: item.onSelect, children: <>{item.icon}{!collapsed ? <span className="flex-1 truncate">{item.label}</span> : <span className="sr-only">{item.label}</span>}{!collapsed && item.badge && item.badge > 0 ? <Badge count={item.badge} /> : null}</>, "aria-current": isActive ? "page" : undefined })
      ) : (
        <button type="button" onClick={item.onSelect} className={className}>{item.icon}{!collapsed ? <span className="flex-1 truncate">{item.label}</span> : null}</button>
      )}
    </li>
  );
}

/** Dark navy sidebar. Nested groups expand inline. Active item is highlighted. */
export function Sidebar({ brand, items = [], sections, footer, collapsed = false, renderLink = defaultLink, label, className }: SidebarProps) {
  return (
    <aside className={cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", collapsed ? "w-16" : "w-sidebar", "border-r border-sidebar-border transition-[width] duration-150", className)}>
      {brand ? <div className="flex h-topbar shrink-0 items-center border-b border-sidebar-border px-4">{brand}</div> : null}
      <nav aria-label={label} className="flex-1 overflow-y-auto p-2">
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
