import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../lib/cn";
import { Avatar } from "../primitives/Avatar";

export interface TopbarSearchProps {
  /** Accessible name and placeholder, translated by the app. */
  label: string;
  /** Shortcut hint shown on the right, e.g. "⌘K". */
  shortcut?: string;
  /** Opens a search dialog when set. The field is a button, not an input, so it can open a modal. */
  onOpen?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/** Topbar search pill: 36px, 320px wide on desktop, matches the live mojaboard search. */
export function TopbarSearch({ label, shortcut, onOpen, value, onValueChange, className }: TopbarSearchProps) {
  const shell = cn(
    "flex h-9 w-full items-center gap-2 sm:w-80 rounded-control border border-sidebar-border bg-sidebar-active px-3 font-sans text-body text-sidebar-muted transition-colors hover:border-sidebar-muted focus-within:ring-2 focus-within:ring-brand",
    className,
  );
  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} aria-label={label} className={cn(shell, "text-left")}>
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate">{label}</span>
        {shortcut ? <kbd className="rounded border border-sidebar-border px-1.5 text-caption text-sidebar-item/80">{shortcut}</kbd> : null}
      </button>
    );
  }
  return (
    <label className={shell}>
      <Search className="size-4 shrink-0" aria-hidden="true" />
      <input
        type="search"
        aria-label={label}
        placeholder={label}
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sidebar-item placeholder:text-sidebar-muted focus-visible:outline-none"
      />
      {shortcut ? <kbd className="rounded border border-sidebar-border px-1.5 text-caption text-sidebar-item/80">{shortcut}</kbd> : null}
    </label>
  );
}

export interface UserMenuProps {
  name: string;
  /** Secondary line under the name, e.g. the role. */
  role?: string;
  src?: string;
  /** Opens the user menu. */
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
}

/** Avatar with name and role, as shown at the right of the live topbar. */
export function UserMenu({ name, role, src, onClick, "aria-label": ariaLabel, className }: UserMenuProps) {
  const content = (
    <>
      <div className="hidden min-w-0 flex-col items-end text-right leading-tight md:flex">
        <span className="max-w-48 truncate font-sans text-control font-semibold text-sidebar-item">{name}</span>
        {role ? <span className="max-w-48 truncate text-caption text-sidebar-muted">{role}</span> : null}
      </div>
      <Avatar name={name} src={src} size="md" />
    </>
  );
  const shell = cn("flex items-center gap-2.5 rounded-control py-1 pl-2 pr-1 transition-colors hover:bg-sidebar-active", className);
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel ?? name} title={ariaLabel ?? name} className={shell}>
        {content}
      </button>
    );
  }
  return <div className={shell}>{content}</div>;
}

