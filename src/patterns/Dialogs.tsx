import * as React from "react";
import { buttonVariants } from "../primitives/Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogTitle,
} from "../primitives/Dialog";
import { cn } from "../lib/cn";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Translated button labels, passed by the app. */
  confirmLabel: string;
  cancelLabel: string;
  /** Use the danger style for destructive actions (delete, revoke). */
  destructive?: boolean;
  onConfirm: () => void;
  /** Shows a loading state on the confirm button while the action runs. */
  loading?: boolean;
}

/** Confirm or cancel before an action. Use for every delete and irreversible step. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex flex-col gap-1">
          <AlertDialogTitle className="text-title text-foreground">{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription className="text-subtitle text-muted-foreground">{description}</AlertDialogDescription> : null}
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel className={buttonVariants({ variant: "outline", size: "md" })}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={onConfirm}
            className={cn(buttonVariants({ variant: destructive ? "danger" : "primary", size: "md" }))}
          >
            {confirmLabel}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
