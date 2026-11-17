import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/cn";
import { Input, type InputProps } from "./Input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /** Accessible label for the visibility toggle button. Translated by the app. */
  toggleLabel?: { show: string; hide: string };
}

/** Password input with a visibility toggle button. */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, toggleLabel, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const label = visible
      ? (toggleLabel?.hide ?? "Hide password")
      : (toggleLabel?.show ?? "Show password");

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          disabled={disabled}
          aria-label={label}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-7 items-center justify-center rounded-control text-muted-foreground hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
