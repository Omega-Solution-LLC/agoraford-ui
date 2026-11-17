import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Input } from "../primitives/Input";
import { Button } from "../primitives/Button";

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible label and placeholder, translated by the app. */
  label: string;
  /** Debounce in ms before onValueChange fires. 0 disables debounce. */
  debounceMs?: number;
  clearLabel?: string;
}

/**
 * Search field with a leading icon and clear button. Keeps its own text while the list loads,
 * so typing is never lost (see mojaboard CLAUDE.md rule on search fields).
 */
export function SearchInput({ value, onValueChange, label, debounceMs = 300, clearLabel = "Clear", className, ...props }: SearchInputProps) {
  const [draft, setDraft] = React.useState(value);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  const emit = (next: string) => {
    setDraft(next);
    if (timer.current) clearTimeout(timer.current);
    if (debounceMs <= 0) {
      onValueChange(next);
      return;
    }
    timer.current = setTimeout(() => onValueChange(next), debounceMs);
  };

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div className={cn("relative w-full sm:w-72", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        type="search"
        aria-label={label}
        placeholder={label}
        value={draft}
        onChange={(e) => emit(e.target.value)}
        className="pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {draft ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={clearLabel}
          onClick={() => emit("")}
          className="absolute right-1 top-1/2 h-control-sm w-control-sm -translate-y-1/2"
        >
          <X aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}

export interface FilterBarProps {
  /** Search field, usually a SearchInput. */
  search?: React.ReactNode;
  /** Filter controls (Select, SegmentedControl, DatePicker). */
  filters?: React.ReactNode;
  /** Right-aligned actions, for example "Add" or view toggles. */
  actions?: React.ReactNode;
  /** Shows a "Clear all" button when true. */
  hasActiveFilters?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  className?: string;
}

/** Search, filters, actions and clear-all in one row. Wraps on narrow screens. */
export function FilterBar({ search, filters, actions, hasActiveFilters, onClear, clearLabel = "Clear all", className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {search}
      {filters}
      {hasActiveFilters && onClear ? (
        <Button variant="link" size="sm" onClick={onClear}>
          {clearLabel}
        </Button>
      ) : null}
      {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
