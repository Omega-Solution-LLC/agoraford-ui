import * as React from "react";
import { CircleHelp } from "lucide-react";
import { cn } from "../lib/cn";
import { Tooltip, TooltipProvider } from "./Tooltip";

export interface FieldProps {
  /** Label text. The library never hard-codes labels; apps pass translated text. */
  label?: React.ReactNode;
  /** Optional metadata aligned to the right of the label row (e.g. "Optional", character counter). */
  labelRight?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label (with optional hover help icon and right-aligned metadata), control, and error text. */
export function Field({ label, labelRight, hint, error, required, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label || labelRight ? (
        <div className="flex items-center justify-between gap-2">
          {label ? (
            <div className="flex items-center gap-1.5">
              <label htmlFor={htmlFor} className="font-sans text-body font-medium text-foreground">
                {label}
                {required ? <span className="ml-0.5 text-danger">*</span> : null}
              </label>
              {hint ? (
                <TooltipProvider delayDuration={200}>
                  <Tooltip content={hint}>
                    <button
                      type="button"
                      aria-label={typeof hint === "string" ? hint : "Field help"}
                      className="inline-flex items-center rounded-pill text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <CircleHelp className="size-3.5" aria-hidden="true" />
                    </button>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
          ) : (
            <span />
          )}
          {labelRight ? <span className="text-caption text-muted-foreground">{labelRight}</span> : null}
        </div>
      ) : null}
      {children}
      {error ? (
        <p role="alert" className="text-small text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
