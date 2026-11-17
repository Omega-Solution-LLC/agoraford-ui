import * as React from "react";
import { cn } from "../lib/cn";

export interface FieldProps {
  /** Label text. The library never hard-codes labels; apps pass translated text. */
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label, control and hint or error text. Label-to-control gap is 6px. */
export function Field({ label, hint, error, required, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={htmlFor} className="font-sans text-control text-foreground">
          {label}
          {required ? <span className="ml-0.5 text-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p role="alert" className="text-small text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="text-small text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
