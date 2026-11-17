import * as React from "react";
import { Bell, Check, Search } from "lucide-react";
import { cn } from "../lib/cn";
import { Avatar } from "../primitives/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../primitives/DropdownMenu";

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
        <span className="max-w-48 truncate font-sans text-body font-medium text-sidebar-item">{name}</span>
        {role ? <span className="max-w-48 truncate text-caption text-sidebar-muted">{role}</span> : null}
      </div>
      <span className="relative inline-flex shrink-0">
        <Avatar name={name} src={src} size="md" />
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-pill border-2 border-sidebar bg-success" aria-hidden="true" />
      </span>
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

export interface LanguageOption {
  code: string;
  label: string;
  short?: string;
}

export interface LanguageSwitcherProps {
  options: LanguageOption[];
  value: string;
  onValueChange: (code: string) => void;
  /** Accessible name for the trigger button. */
  label?: string;
  /** "inverse" for the dark topbar/auth surfaces, "default" for light surfaces. */
  tone?: "inverse" | "default";
  className?: string;
}

/** Topbar language switcher button (`EN`) with dropdown menu, matching the live mojaboard header. */
export function LanguageSwitcher({
  options,
  value,
  onValueChange,
  label = "Select language",
  tone = "inverse",
  className,
}: LanguageSwitcherProps) {
  const active = options.find((opt) => opt.code === value) ?? options[0];
  const shortCode = (active?.short ?? active?.code ?? value).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label}
          title={label}
          className={cn(
            "inline-flex h-9 min-w-9 items-center justify-center rounded-control px-2.5 font-sans text-body font-medium uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            tone === "inverse"
              ? "text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-item"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            className,
          )}
        >
          <span>{shortCode}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {options.map((opt) => {
          const selected = opt.code === value;
          return (
            <DropdownMenuItem key={opt.code} onSelect={() => onValueChange(opt.code)}>
              <span className="flex w-4 shrink-0 items-center justify-center">
                {selected ? <Check className="size-4 text-brand" aria-hidden="true" /> : null}
              </span>
              <span className="flex-1">{opt.label}</span>
              <span className="text-caption font-semibold uppercase text-muted-foreground">
                {opt.short ?? opt.code}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface NotificationBellButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  unreadCount?: number;
  /** Accessible name for the button. */
  label?: string;
  tone?: "inverse" | "default";
}

/** Notification bell icon button with top-right unread count badge, matching the live mojaboard header. */
export const NotificationBellButton = React.forwardRef<HTMLButtonElement, NotificationBellButtonProps>(
  ({ unreadCount = 0, label, tone = "inverse", className, ...props }, ref) => {
    const ariaLabel = label ?? (unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications");
    const badge = unreadCount > 99 ? "99+" : String(unreadCount);

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        title="Notifications"
        className={cn(
          "relative inline-flex size-9 shrink-0 items-center justify-center rounded-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
          tone === "inverse"
            ? "text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-item"
            : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          className,
        )}
        {...props}
      >
        <Bell className="size-5" strokeWidth={1.7} aria-hidden="true" />
        {unreadCount > 0 ? (
          <span
            className={cn(
              "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-danger px-1 font-sans text-caption font-bold leading-none text-white ring-2",
              tone === "inverse" ? "ring-sidebar" : "ring-surface",
            )}
          >
            {badge}
          </span>
        ) : null}
      </button>
    );
  },
);
NotificationBellButton.displayName = "NotificationBellButton";

