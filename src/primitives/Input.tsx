import * as React from "react";
import { cn } from "../lib/cn";

const controlBase =
  "w-full rounded-control border border-border-strong bg-surface px-3 font-sans text-body font-normal text-foreground placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn(controlBase, "h-control-md", className)} {...props} />
));
Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(controlBase, "min-h-24 py-2 leading-5", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";
