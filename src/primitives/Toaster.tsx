import { Toaster as SonnerToaster, toast } from "sonner";

export { toast };

/** Mount once at the app root. Toasts use the library tokens. */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "rounded-control border border-border bg-surface font-sans text-body text-foreground shadow-lg",
          description: "text-small text-muted-foreground",
        },
      }}
    />
  );
}
