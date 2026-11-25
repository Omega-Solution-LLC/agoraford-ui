import * as React from "react";
import { format } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import { CalendarDays, Check, ChevronLeft, Upload } from "lucide-react";
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
          showOutsideDays
          onSelect={(d) => {
            onValueChange(d);
            setOpen(false);
          }}
          classNames={calendarClassNames}
        />
      </PopoverContent>
    </Popover>
  );
}

/** Token-based styling for react-day-picker v10, shared by the date pickers. */
const calendarClassNames = {
  root: "w-fit font-sans text-body text-foreground",
  months: "flex flex-col gap-4",
  month: "flex flex-col gap-4",
  month_caption: "relative flex h-9 items-center justify-center",
  caption_label: "text-body font-semibold text-foreground",
  nav: "absolute inset-x-0 top-0 flex items-center justify-between",
  button_previous:
    "inline-flex h-9 w-9 items-center justify-center rounded-control text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
  button_next:
    "inline-flex h-9 w-9 items-center justify-center rounded-control text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
  chevron: "size-4",
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday: "flex h-9 w-9 items-center justify-center text-caption font-medium text-muted-foreground",
  week: "mt-1 flex w-full",
  day: "p-0.5 text-center text-small",
  day_button:
    "inline-flex h-9 w-9 items-center justify-center rounded-control text-small font-normal text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40",
  selected: "[&>button]:bg-brand [&>button]:font-semibold [&>button]:text-white [&>button:hover]:bg-brand-hover",
  today: "[&>button]:border [&>button]:border-brand [&>button]:text-brand",
  outside: "text-muted-foreground opacity-60",
  disabled: "opacity-40",
  hidden: "invisible",
};

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
          showOutsideDays
          onSelect={(r) => {
            onValueChange(r);
            if (r?.from && r?.to) setOpen(false);
          }}
          classNames={calendarClassNames}
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

export interface StepWizardStep {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepWizardStep[];
  /** Index of the active step, 0-based. */
  current: number;
  /** Optional step click handler for completed/accessible steps. */
  onStepClick?: (index: number) => void;
  /** Accessible label for the step list. */
  label?: string;
  className?: string;
}

/** Horizontal circle stepper matching live mojaboard. */
export function Stepper({ steps, current, onStepClick, label = "Progress steps", className }: StepperProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex items-start justify-between gap-2 overflow-x-auto">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <React.Fragment key={step.id}>
              <li className="flex shrink-0 flex-col items-center gap-2 text-center" aria-current={active ? "step" : undefined}>
                <button
                  type="button"
                  disabled={!onStepClick || (!done && !active)}
                  onClick={() => onStepClick?.(i)}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-pill border-2 font-sans text-small font-semibold transition-colors [&_svg]:size-4",
                    done && "border-success bg-success text-white",
                    active && "border-brand bg-brand text-white",
                    !active && !done && "border-border-strong bg-surface-muted text-muted-foreground",
                    onStepClick && (done || active) ? "cursor-pointer" : "cursor-default",
                  )}
                >
                  {done ? <Check aria-hidden="true" /> : step.icon ?? i + 1}
                </button>
                <span className={cn("max-w-24 font-sans text-small leading-tight", active || done ? "font-semibold text-foreground" : "text-muted-foreground")}>
                  {step.label}
                </span>
              </li>
              {i < steps.length - 1 ? (
                <li aria-hidden="true" className={cn("mt-5 h-0.5 min-w-4 flex-1", done ? "bg-success" : "bg-border")} />
              ) : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export interface StepWizardProps {
  steps: StepWizardStep[];
  /** Index of the active step, 0-based. */
  current: number;
  /** Prefix for the step count, e.g. "Step". Translated by the app. */
  stepLabel: string;
  /** Optional card header title (renders the mojaboard blue header band when set). */
  title?: React.ReactNode;
  /** Optional subtitle under the header title. */
  subtitle?: React.ReactNode;
  /** Optional trailing actions in the header band (e.g. draft status badge). */
  headerActions?: React.ReactNode;
  /** Optional back handler rendered on the left of the header band. */
  onBack?: () => void;
  /** Optional step click handler for completed/accessible steps. */
  onStepClick?: (index: number) => void;
  children: React.ReactNode;
  className?: string;
}

/** Multi-step wizard card with horizontal circle stepper matching live mojaboard. */
export function StepWizard({ steps, current, stepLabel, title, subtitle, headerActions, onBack, onStepClick, children, className }: StepWizardProps) {
  const activeStep = steps[current];
  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-surface shadow-sm dark:shadow-none", className)}>
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-brand px-6 py-4 text-white">
          <div className="flex min-w-0 items-center gap-3">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-control text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
            ) : null}
            <div className="flex min-w-0 flex-col gap-0.5">
              <h2 className="font-sans text-control font-bold text-white">{title}</h2>
              <p className="font-sans text-small text-white/85">
                {subtitle ?? `${stepLabel} ${current + 1} of ${steps.length}${activeStep ? `: ${activeStep.label}` : ""}`}
              </p>
            </div>
          </div>
          {headerActions ? <div className="flex shrink-0 items-center gap-2">{headerActions}</div> : null}
        </div>
      ) : null}
      <div className="border-b border-border px-6 py-5">
        <Stepper steps={steps} current={current} onStepClick={onStepClick} />
        {!title ? (
          <Text variant="caption" as="span" className="mt-3 block text-center">{`${stepLabel} ${current + 1} / ${steps.length}`}</Text>
        ) : null}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
