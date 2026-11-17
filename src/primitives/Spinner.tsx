import { LoaderCircle } from "lucide-react";
import { cn } from "../lib/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accessible label read by screen readers. */
  label?: string;
  size?: number;
}

export function Spinner({ label = "Loading", size = 16, className, ...props }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex", className)} {...props}>
      <LoaderCircle className="animate-spin" width={size} height={size} aria-hidden="true" />
    </span>
  );
}
