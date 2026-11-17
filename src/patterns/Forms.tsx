import * as React from "react";
import { format } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import { CalendarDays, Upload } from "lucide-react";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/Popover";
import { Button } from "../primitives/Button";
import { Text } from "../primitives/Text";

export interface DatePickerProps {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  placeholder: string;
  /** Date format for display, from date-fns. */
  displayFormat?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/** Single date picker on react-day-picker. Replaces antd DatePicker. */
export function DatePicker({ value, onValueChange, placeholder, displayFormat = "PP", disabled, id, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} variant="outline" disabled={disabled} className={cn("h-control-md w-full justify-start font-normal text-body", className)}>
          <CalendarDays className="text-muted-foreground" aria-hidden="true" />
          <span className={cn(!value && "text-sidebar-muted")}>{value ? format(value, displayFormat) : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={(d) => {
            onValueChange(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  value?: DateRange;
  onValueChange: (range: DateRange | undefined) => void;
  placeholder: string;
  displayFormat?: string;
  disabled?: boolean;
  className?: string;
}

/** Date range picker. Replaces the antd RangePicker use in filters. */
export function DateRangePicker({ value, onValueChange, placeholder, displayFormat = "PP", disabled, className }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const label =
    value?.from && value?.to
      ? `${format(value.from, displayFormat)} – ${format(value.to, displayFormat)}`
      : value?.from
        ? format(value.from, displayFormat)
        : null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled} className={cn("h-control-md w-full justify-start font-normal text-body sm:w-auto", className)}>
          <CalendarDays className="text-muted-foreground" aria-hidden="true" />
          <span className={cn(!label && "text-sidebar-muted")}>{label ?? placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <DayPicker
          mode="range"
          selected={value}
          onSelect={(r) => {
            onValueChange(r);
            if (r?.from && r?.to) setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  /** Text shown in the drop area. Translated by the app. */
  label: string;
  /** Hint under the label, e.g. accepted types and max size. */
  hint?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Click-or-drop file area. Validation and upload stay in the app. */
export function FileUpload({ onFilesSelected, label, hint, accept, multiple = false, disabled, className }: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) onFilesSelected(Array.from(e.dataTransfer.files));
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed border-border-strong bg-surface px-6 py-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        dragging && "border-brand bg-brand-soft",
        className,
      )}
    >
      <Upload className="size-5 text-brand" aria-hidden="true" />
      <Text variant="control" as="span">{label}</Text>
      {hint ? <Text variant="caption">{hint}</Text> : null}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          onFilesSelected(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
    </div>
  );
}

export interface StepWizardProps {
  steps: { id: string; label: string }[];
  /** Index of the active step, 0-based. */
  current: number;
  /** Prefix for the step count, e.g. "Step". Translated by the app. */
  stepLabel: string;
  children: React.ReactNode;
  className?: string;
}

/** Step indicator for multi-step forms. Navigation buttons stay in the app. */
export function StepWizard({ steps, current, stepLabel, children, className }: StepWizardProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ol className="flex flex-wrap items-center gap-3">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step.id} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-pill border font-sans text-caption font-medium",
                  active && "border-brand bg-brand text-white",
                  done && "border-brand bg-brand-soft text-brand",
                  !active && !done && "border-border-strong text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              <Text variant="small" className={cn(active && "text-foreground font-medium")}>
                {step.label}
              </Text>
            </li>
          );
        })}
      </ol>
      <Text variant="caption" as="span">{`${stepLabel} ${current + 1} / ${steps.length}`}</Text>
      {children}
    </div>
  );
}
