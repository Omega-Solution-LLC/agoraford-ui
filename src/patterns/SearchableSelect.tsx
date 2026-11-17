"use client";

import * as React from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/Popover";
import type { SelectOption } from "../primitives/Select";

export interface SearchableSelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearLabel?: string;
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  /** Hide search input when total options <= searchThreshold. Defaults to 0 (always show). */
  searchThreshold?: number;
  id?: string;
  "aria-label"?: string;
  className?: string;
}

/**
 * Filterable single-value select built on Popover.
 * Labels and empty text are passed as props so the app owns translations.
 */
export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No matching options",
  clearLabel = "Clear selection",
  clearable = false,
  disabled = false,
  invalid = false,
  searchThreshold = 0,
  id,
  "aria-label": ariaLabel,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selected = React.useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => {
      const text = typeof opt.label === "string" ? opt.label : opt.value;
      return text.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q);
    });
  }, [options, query]);

  const handleSelect = (nextValue: string) => {
    onValueChange?.(nextValue);
    setOpen(false);
    setQuery("");
  };

  const showSearch = options.length > searchThreshold || Boolean(query);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
        setActiveIndex(0);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      return;
    }
    if (e.key === "Enter" && filtered[activeIndex] && !filtered[activeIndex].disabled) {
      e.preventDefault();
      handleSelect(filtered[activeIndex].value);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setActiveIndex(0);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            "inline-flex h-control-md w-full items-center justify-between gap-2 rounded-control border border-border-strong bg-surface px-3 font-sans text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
            !selected && "text-sidebar-muted",
            className,
          )}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <span className="flex shrink-0 items-center gap-1">
            {clearable && selected && !disabled ? (
              <span
                role="button"
                tabIndex={0}
                aria-label={clearLabel}
                onClick={(e) => {
                  e.stopPropagation();
                  onValueChange?.("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onValueChange?.("");
                  }
                }}
                className="inline-flex size-5 items-center justify-center rounded-control text-muted-foreground hover:bg-surface-muted hover:text-foreground"
              >
                <X className="size-3.5" aria-hidden="true" />
              </span>
            ) : null}
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        onKeyDown={handleKeyDown}
        className="w-[var(--radix-popover-trigger-width)] min-w-56 rounded-control p-2"
      >
        {showSearch ? (
          <div className="relative mb-2">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autoFocus
              className="h-control-sm w-full rounded-control border border-border bg-surface pl-8 pr-2.5 font-sans text-small text-foreground placeholder:text-sidebar-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
          </div>
        ) : null}
        <div role="listbox" className="max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-2 py-4 text-center font-sans text-small text-muted-foreground">
              {emptyText}
            </p>
          ) : (
            filtered.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-control py-2 pl-8 pr-2 text-left font-sans text-body text-foreground outline-none hover:bg-brand-soft focus-visible:bg-brand-soft disabled:pointer-events-none disabled:opacity-50",
                    isSelected && "bg-brand-soft font-medium",
                  )}
                >
                  <span className="absolute left-2 inline-flex size-4 items-center justify-center">
                    {isSelected ? <Check className="size-4 text-brand" aria-hidden="true" /> : null}
                  </span>
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
