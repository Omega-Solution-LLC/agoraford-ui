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
}

export interface SidebarProps {
  /** Brand block at the top, e.g. logo and product name. */
  brand?: React.ReactNode;
  items: SidebarNavItem[];
  /** Footer block, for example the logout button. */
  footer?: React.ReactNode;
  /** Collapsed to icons only. */
  collapsed?: boolean;
  /**
   * Renders a link. Keeps the library router-agnostic.
   * Default renders a plain anchor. Apps pass next/link or react-router Link.
   */
  renderLink?: (props: { href: string; className: string; children: React.ReactNode; "aria-current"?: "page" }) => React.ReactNode;
  /** Accessible name for the nav landmark. Translated by the app. */
  label: string;
  className?: string;
}

const linkBase =
  "flex w-full items-center gap-3 rounded-control px-3 py-2 font-sans text-body text-sidebar-foreground transition-colors hover:bg-sidebar-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";
const linkActive = "bg-sidebar-foreground/15 font-medium text-white";

function defaultLink({ href, className, children, ...rest }: { href: string; className: string; children: React.ReactNode; "aria-current"?: "page" }) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

function NavRow({ item, collapsed, renderLink }: { item: SidebarNavItem; collapsed: boolean; renderLink: NonNullable<SidebarProps["renderLink"]> }) {
  const hasChildren = !!item.children?.length;
  const childActive = item.children?.some((c) => c.active || c.children?.some((g) => g.active)) ?? false;
  const [open, setOpen] = React.useState(childActive);
  const isActive = !!item.active;

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(linkBase, childActive && "text-white")}
          title={collapsed ? item.label : undefined}
        >
          {item.icon}
          {!collapsed ? <span className="flex-1 text-left">{item.label}</span> : null}
          {!collapsed ? <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" /> : null}
        </button>
        {open && !collapsed ? (
          <ul className="mt-1 flex flex-col gap-1 pl-7">
            {item.children!.filter((c) => !c.hidden).map((child) => (
              <NavRow key={child.id} item={child} collapsed={collapsed} renderLink={renderLink} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  const className = cn(linkBase, isActive && linkActive, "text-sm");
  return (
    <li>
      {item.href ? (
        renderLink({ href: item.href, className, children: <>{item.icon}{!collapsed ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}</>, "aria-current": isActive ? "page" : undefined })
      ) : (
        <span className={className}>{item.icon}{!collapsed ? <span>{item.label}</span> : null}</span>
      )}
    </li>
  );
}

/** Dark navy sidebar. Nested groups expand inline. Active item is highlighted. */
export function Sidebar({ brand, items, footer, collapsed = false, renderLink = defaultLink, label, className }: SidebarProps) {
  return (
    <aside className={cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", collapsed ? "w-16" : "w-64", "transition-[width] duration-150", className)}>
      {brand ? <div className="flex h-14 shrink-0 items-center border-b border-sidebar-foreground/10 px-4">{brand}</div> : null}
      <nav aria-label={label} className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {items.filter((i) => !i.hidden).map((item) => (
            <NavRow key={item.id} item={item} collapsed={collapsed} renderLink={renderLink} />
          ))}
        </ul>
      </nav>
      {footer ? <div className="shrink-0 border-t border-sidebar-foreground/10 p-3">{footer}</div> : null}
    </aside>
  );
}
