"use client";
import * as React16 from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { Check, X, LoaderCircle, ChevronDown, ChevronRight, ChevronLeft, MoreHorizontal, ArrowUp, ArrowDown, ArrowUpDown, Search, Inbox, AlertTriangle, CalendarDays, Upload, Menu } from 'lucide-react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

// src/primitives/Button.tsx
var twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["title", "section", "subtitle", "body", "control", "small", "caption"] }]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Spinner({ label = "Loading", size = 16, className, ...props }) {
  return /* @__PURE__ */ jsx("span", { role: "status", "aria-label": label, className: cn("inline-flex", className), ...props, children: /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin", width: size, height: size, "aria-hidden": "true" }) });
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-sans text-control font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-hover",
        secondary: "bg-brand-soft text-brand hover:bg-brand/20",
        outline: "border border-border-strong bg-surface text-foreground hover:bg-surface-muted",
        ghost: "text-foreground hover:bg-surface-muted",
        danger: "bg-danger text-white hover:bg-danger/90",
        link: "text-brand underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-control-sm px-3 text-small font-semibold",
        md: "h-control-md px-4",
        lg: "h-control-lg px-5",
        icon: "h-control-md w-control-md p-0"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);
var Button = React16.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxs(
      Comp,
      {
        ref,
        className: cn(buttonVariants({ variant, size }), className),
        disabled: disabled || loading,
        "aria-busy": loading || void 0,
        ...props,
        children: [
          loading ? /* @__PURE__ */ jsx(Spinner, { label: "Loading", size: 14 }) : null,
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
function Field({ label, hint, error, required, htmlFor, className, children }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1.5", className), children: [
    label ? /* @__PURE__ */ jsxs("label", { htmlFor, className: "font-sans text-control text-foreground", children: [
      label,
      required ? /* @__PURE__ */ jsx("span", { className: "ml-0.5 text-danger", children: "*" }) : null
    ] }) : null,
    children,
    error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "text-small text-danger", children: error }) : hint ? /* @__PURE__ */ jsx("p", { className: "text-small text-muted-foreground", children: hint }) : null
  ] });
}
var controlBase = "w-full rounded-control border border-border-strong bg-surface px-3 font-sans text-body text-foreground placeholder:text-sidebar-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger";
var Input = React16.forwardRef(({ className, type = "text", ...props }, ref) => /* @__PURE__ */ jsx("input", { ref, type, className: cn(controlBase, "h-control-md", className), ...props }));
Input.displayName = "Input";
var Textarea = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "textarea",
  {
    ref,
    className: cn(controlBase, "min-h-24 py-2 leading-5", className),
    ...props
  }
));
Textarea.displayName = "Textarea";
function Select({ options, placeholder, invalid, className, id, "aria-label": ariaLabel, ...props }) {
  return /* @__PURE__ */ jsxs(SelectPrimitive.Root, { ...props, children: [
    /* @__PURE__ */ jsxs(
      SelectPrimitive.Trigger,
      {
        id,
        "aria-label": ariaLabel,
        "aria-invalid": invalid || void 0,
        className: cn(
          "inline-flex h-control-md w-full items-center justify-between rounded-control border border-border-strong bg-surface px-3 font-sans text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 aria-[invalid=true]:border-danger data-[placeholder]:text-sidebar-muted",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(SelectPrimitive.Value, { placeholder }),
          /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 text-muted-foreground", "aria-hidden": "true" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      SelectPrimitive.Content,
      {
        position: "popper",
        sideOffset: 4,
        className: "z-dropdown max-h-72 min-w-[--radix-select-trigger-width] overflow-hidden rounded-control border border-border bg-surface p-1 shadow-lg",
        children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { children: options.map((opt) => /* @__PURE__ */ jsxs(
          SelectPrimitive.Item,
          {
            value: opt.value,
            disabled: opt.disabled,
            className: "relative flex cursor-pointer select-none items-center rounded-control py-2 pl-8 pr-2 font-sans text-body text-foreground outline-none data-[highlighted]:bg-brand-soft data-[disabled]:opacity-50",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-2 inline-flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4 text-brand", "aria-hidden": "true" }) }) }),
              /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children: opt.label })
            ]
          },
          opt.value
        )) })
      }
    ) })
  ] });
}
var Checkbox = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn(
        "peer size-4 shrink-0 rounded-[4px] border border-border-strong bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-white",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ jsx(Check, { className: "size-3.5", "aria-hidden": "true" }) })
    }
  )
);
Checkbox.displayName = "Checkbox";
var Switch = React16.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      ref,
      className: cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-pill border border-transparent bg-border-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=checked]:bg-brand",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: "pointer-events-none block size-4 rounded-pill bg-surface shadow transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" })
    }
  )
);
Switch.displayName = "Switch";
var RadioGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { ref, className: cn("grid gap-2", className), ...props }));
RadioGroup.displayName = "RadioGroup";
var RadioGroupItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  RadioGroupPrimitive.Item,
  {
    ref,
    className: cn(
      "aspect-square size-4 rounded-pill border border-border-strong bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=checked]:border-brand",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "size-2 rounded-pill bg-brand" }) })
  }
));
RadioGroupItem.displayName = "RadioGroupItem";
var badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 font-sans text-caption font-medium",
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface-muted text-muted-foreground",
        brand: "border-brand/30 bg-brand-soft text-brand",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        danger: "border-danger/30 bg-danger/10 text-danger",
        info: "border-info/30 bg-info/10 text-info"
      }
    },
    defaultVariants: { tone: "neutral" }
  }
);
function Badge({ className, tone, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badgeVariants({ tone }), className), ...props });
}
function StatusBadge({ tone, label, ...props }) {
  return /* @__PURE__ */ jsxs(Badge, { tone, ...props, children: [
    /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-pill bg-current", "aria-hidden": "true" }),
    label
  ] });
}
var sizeClass = { sm: "size-6 text-caption", md: "size-8 text-small", lg: "size-10 text-body" };
function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function Avatar({ src, name, size = "md", className, ...props }) {
  return /* @__PURE__ */ jsxs(
    AvatarPrimitive.Root,
    {
      className: cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill bg-brand-soft align-middle",
        sizeClass[size],
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(AvatarPrimitive.Image, { src, alt: name, className: "size-full object-cover" }),
        /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, { className: "font-medium text-brand", children: initials(name) })
      ]
    }
  );
}
var iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      tone: {
        /** For the dark sidebar and topbar chrome. */
        inverse: "text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-item",
        /** For light surfaces. */
        default: "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
      }
    },
    defaultVariants: { tone: "inverse" }
  }
);
var IconButton = React16.forwardRef(
  ({ label, tone, className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": label,
      title: label,
      className: cn(iconButtonVariants({ tone }), "size-9", className),
      ...props,
      children
    }
  )
);
IconButton.displayName = "IconButton";
var TooltipProvider = TooltipPrimitive.Provider;
function Tooltip({ content, children, side = "top", delayMs = 300 }) {
  return /* @__PURE__ */ jsxs(TooltipPrimitive.Root, { delayDuration: delayMs, children: [
    /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      TooltipPrimitive.Content,
      {
        side,
        sideOffset: 6,
        className: cn(
          "z-dropdown rounded-control bg-foreground px-2 py-1 font-sans text-caption text-background shadow"
        ),
        children: content
      }
    ) })
  ] });
}
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
var DialogContent = React16.forwardRef(({ className, children, closeLabel = "Close", ...props }, ref) => /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
  /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-overlay bg-black/40" }),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-modal grid w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-panel border border-border bg-surface p-6 font-sans text-body text-foreground shadow-lg focus-visible:outline-none",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(
          DialogPrimitive.Close,
          {
            "aria-label": closeLabel,
            className: "absolute right-4 top-4 rounded-control p-1 text-muted-foreground hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-brand",
            children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  )
] }));
DialogContent.displayName = "DialogContent";
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-1 pr-8", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className), ...props });
}
var DialogTitle = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, { ref, className: cn("text-title text-foreground", className), ...props }));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-subtitle text-muted-foreground", className), ...props }));
DialogDescription.displayName = "DialogDescription";
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogContent = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPrimitive.Portal, { children: [
  /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { className: "fixed inset-0 z-overlay bg-black/40" }),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-modal grid w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-panel border border-border bg-surface p-6 font-sans text-body text-foreground shadow-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = "AlertDialogContent";
var AlertDialogTitle = AlertDialogPrimitive.Title;
var AlertDialogDescription = AlertDialogPrimitive.Description;
var AlertDialogAction = AlertDialogPrimitive.Action;
var AlertDialogCancel = AlertDialogPrimitive.Cancel;
var Sheet = DialogPrimitive.Root;
var SheetTrigger = DialogPrimitive.Trigger;
var SheetClose = DialogPrimitive.Close;
var SheetContent = React16.forwardRef(
  ({ side = "left", className, children, closeLabel = "Close", ...props }, ref) => /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-overlay bg-black/40" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed inset-y-0 z-modal flex h-full w-72 max-w-[85vw] flex-col gap-4 border-border bg-surface p-6 font-sans text-body text-foreground shadow-lg focus-visible:outline-none",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsx(
            DialogPrimitive.Close,
            {
              "aria-label": closeLabel,
              className: "absolute right-4 top-4 rounded-control p-1 text-muted-foreground hover:bg-surface-muted",
              children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": "true" })
            }
          )
        ]
      }
    )
  ] })
);
SheetContent.displayName = "SheetContent";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { ref, className: cn("my-1 h-px bg-border", className), ...props }));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuContent = React16.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-dropdown min-w-44 overflow-hidden rounded-control border border-border bg-surface p-1 font-sans text-body text-foreground shadow-lg",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = React16.forwardRef(({ className, destructive, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-control px-2 py-2 outline-none data-[highlighted]:bg-brand-soft data-[disabled]:opacity-50",
      destructive ? "text-danger" : "text-foreground",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = React16.forwardRef(({ className, align = "start", sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-dropdown w-72 rounded-card border border-border bg-surface p-4 font-sans text-body text-foreground shadow-lg outline-none",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = "PopoverContent";
var Tabs = TabsPrimitive.Root;
var TabsList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn("inline-flex items-center gap-1 border-b border-border", className),
    ...props
  }
));
TabsList.displayName = "TabsList";
var TabsTrigger = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "-mb-px inline-flex h-control-md items-center border-b-2 border-transparent px-4 font-sans text-body font-semibold text-muted-foreground transition-colors hover:border-border-strong hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 data-[state=active]:border-brand data-[state=active]:text-brand",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, { ref, className: cn("pt-4 focus-visible:outline-none", className), ...props }));
TabsContent.displayName = "TabsContent";
function SegmentedControl({ options, value, onValueChange, label, className }) {
  return /* @__PURE__ */ jsx("div", { role: "radiogroup", "aria-label": label, className: cn("inline-flex flex-wrap items-center gap-1 rounded-control border border-border bg-surface p-1", className), children: options.map((opt) => {
    const active = opt.value === value;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": active,
        onClick: () => onValueChange(opt.value),
        className: cn(
          "inline-flex h-control-sm items-center gap-1.5 rounded-control px-3 font-sans text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
          active ? "bg-brand text-white" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { children: opt.label }),
          opt.count !== void 0 ? /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "rounded px-1.5 py-0.5 text-caption font-semibold tabular-nums",
                active ? "bg-white/20 text-white" : "bg-surface-muted text-muted-foreground"
              ),
              children: opt.count
            }
          ) : null
        ]
      },
      opt.value
    );
  }) });
}
var cardVariants = cva("rounded-card border border-border bg-surface text-foreground font-sans shadow-sm dark:shadow-none", {
  variants: {
    padding: {
      none: "",
      sm: "p-4",
      comfortable: "p-5",
      md: "p-6"
    }
  },
  defaultVariants: { padding: "md" }
});
var Card = React16.forwardRef(({ className, padding, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn(cardVariants({ padding }), className), ...props }));
Card.displayName = "Card";
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-1 pb-4", className), ...props });
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("h3", { className: cn("text-control font-semibold text-foreground", className), ...props });
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("text-small text-muted-foreground", className), ...props });
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-4", className), ...props });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-2 pt-4", className), ...props });
}
var Separator2 = React16.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
    ...props
  }
));
Separator2.displayName = "Separator";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: cn("animate-pulse rounded-control bg-surface-muted", className), ...props });
}
function Progress({ value, label, className, ...props }) {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "progressbar",
      "aria-label": label,
      "aria-valuenow": clamped,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      className: cn("h-2 w-full overflow-hidden rounded-pill bg-surface-muted", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-pill bg-brand transition-[width]", style: { width: `${clamped}%` } })
    }
  );
}
var textVariants = cva("font-sans", {
  variants: {
    variant: {
      title: "text-title font-extrabold text-foreground",
      subtitle: "text-subtitle text-muted-foreground",
      body: "text-body text-foreground",
      control: "text-control text-foreground",
      small: "text-small text-muted-foreground",
      caption: "text-caption text-muted-foreground"
    }
  },
  defaultVariants: { variant: "body" }
});
var defaultTag = {
  title: "h1",
  subtitle: "p",
  body: "p",
  control: "span",
  small: "p",
  caption: "span"
};
function Text({ variant = "body", as, className, ...props }) {
  const Comp = as ?? defaultTag[variant ?? "body"];
  return /* @__PURE__ */ jsx(Comp, { className: cn(textVariants({ variant }), className), ...props });
}
function Toaster() {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      position: "bottom-right",
      toastOptions: {
        classNames: {
          toast: "rounded-control border border-border bg-surface font-sans text-body text-foreground shadow-lg",
          description: "text-small text-muted-foreground"
        }
      }
    }
  );
}
function Breadcrumb({ items, label, renderLink, className, ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": label, className: cn("font-sans text-small", className), ...props, children: /* @__PURE__ */ jsx("ol", { className: "flex flex-wrap items-center gap-1.5 text-muted-foreground", children: items.map((item, i) => {
    const last = i === items.length - 1;
    const content = item.href && !last ? renderLink ? renderLink(item, item.label) : /* @__PURE__ */ jsx("a", { href: item.href, children: item.label }) : item.label;
    return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
      i > 0 ? /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5", "aria-hidden": "true" }) : null,
      /* @__PURE__ */ jsx("span", { className: cn(last && "text-foreground font-medium", !last && "hover:text-foreground"), "aria-current": last ? "page" : void 0, children: content })
    ] }, i);
  }) }) });
}
function Pagination({ page, pageCount, onPageChange, labels, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center justify-between gap-2 font-sans text-small text-muted-foreground", className), children: [
    /* @__PURE__ */ jsx("span", { children: labels.pageOf(page, pageCount) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", "aria-label": labels.previous, disabled: page <= 1, onClick: () => onPageChange(page - 1), children: /* @__PURE__ */ jsx(ChevronLeft, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", "aria-label": labels.next, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), children: /* @__PURE__ */ jsx(ChevronRight, { "aria-hidden": "true" }) })
    ] })
  ] });
}
function Ellipsis({ className }) {
  return /* @__PURE__ */ jsx(MoreHorizontal, { className: cn("size-4 text-muted-foreground", className), "aria-hidden": "true" });
}
function DataTable({
  columns,
  data,
  labels,
  loading = false,
  loadingRows = 5,
  emptyState,
  footer,
  getRowId,
  className
}) {
  const [sorting, setSorting] = React16.useState([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId
  });
  const colCount = columns.length;
  const rows = table.getRowModel().rows;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-3", className), children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-card border border-border bg-surface", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse font-sans text-body", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-sticky border-b border-border bg-surface-muted text-muted-foreground", children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx("tr", { children: hg.headers.map((header) => {
        const sortable = header.column.getCanSort();
        const dir = header.column.getIsSorted();
        const sortLabel = dir === "asc" ? labels.sortDescending : labels.sortAscending;
        return /* @__PURE__ */ jsx("th", { className: "h-10 whitespace-nowrap px-4 text-left text-caption font-semibold uppercase tracking-wider text-muted-foreground", children: header.isPlaceholder ? null : sortable ? /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: header.column.getToggleSortingHandler(),
            "aria-label": sortLabel,
            className: "inline-flex items-center gap-1.5 uppercase tracking-wider hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            children: [
              flexRender(header.column.columnDef.header, header.getContext()),
              dir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "size-3.5", "aria-hidden": "true" }) : dir === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "size-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "size-3.5 opacity-60", "aria-hidden": "true" })
            ]
          }
        ) : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
      }) }, hg.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: loading ? Array.from({ length: loadingRows }).map((_, i) => /* @__PURE__ */ jsx("tr", { className: "border-t border-border", children: Array.from({ length: colCount }).map((__, j) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }) }, j)) }, `sk-${i}`)) : rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: colCount, className: "px-4 py-10 text-center text-muted-foreground", children: emptyState ?? labels.empty }) }) : rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-t border-border hover:bg-surface-muted", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3 align-middle text-foreground", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
    ] }) }),
    footer ? /* @__PURE__ */ jsx("div", { children: footer }) : null
  ] });
}
function SearchInput({ value, onValueChange, label, debounceMs = 300, clearLabel = "Clear", className, ...props }) {
  const [draft, setDraft] = React16.useState(value);
  const timer = React16.useRef(null);
  React16.useEffect(() => {
    setDraft(value);
  }, [value]);
  const emit = (next) => {
    setDraft(next);
    if (timer.current) clearTimeout(timer.current);
    if (debounceMs <= 0) {
      onValueChange(next);
      return;
    }
    timer.current = setTimeout(() => onValueChange(next), debounceMs);
  };
  React16.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full sm:w-72", className), children: [
    /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "search",
        "aria-label": label,
        placeholder: label,
        value: draft,
        onChange: (e) => emit(e.target.value),
        className: "pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden",
        ...props
      }
    ),
    draft ? /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        "aria-label": clearLabel,
        onClick: () => emit(""),
        className: "absolute right-1 top-1/2 h-control-sm w-control-sm -translate-y-1/2",
        children: /* @__PURE__ */ jsx(X, { "aria-hidden": "true" })
      }
    ) : null
  ] });
}
function FilterBar({ search, filters, actions, hasActiveFilters, onClear, clearLabel = "Clear all", className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-wrap items-center gap-2", className), children: [
    search,
    filters,
    hasActiveFilters && onClear ? /* @__PURE__ */ jsx(Button, { variant: "link", size: "sm", onClick: onClear, children: clearLabel }) : null,
    actions ? /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: actions }) : null
  ] });
}
function EmptyState({ title, description, icon, action, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col items-center gap-2 px-6 py-10 text-center", className), children: [
    /* @__PURE__ */ jsx("div", { className: "flex size-10 items-center justify-center rounded-pill bg-surface-muted text-muted-foreground", children: icon ?? /* @__PURE__ */ jsx(Inbox, { className: "size-5", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsx(Text, { variant: "control", as: "p", children: title }),
    description ? /* @__PURE__ */ jsx(Text, { variant: "small", children: description }) : null,
    action ? /* @__PURE__ */ jsx("div", { className: "pt-2", children: action }) : null
  ] });
}
function ErrorState({ title, description, retryLabel = "Retry", onRetry, className }) {
  return /* @__PURE__ */ jsxs("div", { role: "alert", className: cn("flex flex-col items-center gap-2 px-6 py-10 text-center", className), children: [
    /* @__PURE__ */ jsx("div", { className: "flex size-10 items-center justify-center rounded-pill bg-danger/10 text-danger", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "size-5", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsx(Text, { variant: "control", as: "p", children: title }),
    description ? /* @__PURE__ */ jsx(Text, { variant: "small", children: description }) : null,
    onRetry ? /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onRetry,
        className: "mt-2 rounded-control font-sans text-control text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        children: retryLabel
      }
    ) : null
  ] });
}
function PageHeader({ title, subtitle, breadcrumb, actions, className }) {
  return /* @__PURE__ */ jsxs("header", { className: cn("flex flex-wrap items-end justify-between gap-4", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [
      breadcrumb,
      /* @__PURE__ */ jsx(Text, { variant: "title", children: title }),
      subtitle ? /* @__PURE__ */ jsx(Text, { variant: "subtitle", children: subtitle }) : null
    ] }),
    actions ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: actions }) : null
  ] });
}
function FormSection({ title, description, children, className }) {
  return /* @__PURE__ */ jsxs("section", { className: cn("flex flex-col gap-4", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsx(Text, { variant: "control", as: "h2", className: "font-semibold", children: title }),
      description ? /* @__PURE__ */ jsx(Text, { variant: "small", children: description }) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4", children })
  ] });
}
var statToneClass = {
  neutral: "border-border border-l-border-strong bg-surface dark:bg-surface",
  brand: "border-brand/25 border-l-brand bg-brand/5 dark:bg-surface",
  success: "border-success/25 border-l-success bg-success/5 dark:bg-surface",
  warning: "border-warning/25 border-l-warning bg-warning/5 dark:bg-surface",
  danger: "border-danger/25 border-l-danger bg-danger/5 dark:bg-surface",
  info: "border-info/25 border-l-info bg-info/5 dark:bg-surface"
};
var statIconClass = {
  neutral: "bg-surface text-muted-foreground border-border",
  brand: "bg-surface text-brand border-brand/20",
  success: "bg-surface text-success border-success/20",
  warning: "bg-surface text-warning border-warning/20",
  danger: "bg-surface text-danger border-danger/20",
  info: "bg-surface text-info border-info/20"
};
var statRingClass = {
  neutral: "text-muted-foreground",
  brand: "text-brand",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info"
};
function StatCard({ tone = "neutral", label, value, hint, icon, progress, loading, className }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const clamped = progress !== void 0 ? Math.min(100, Math.max(0, Number(progress) || 0)) : 0;
  const dashOffset = circumference - clamped / 100 * circumference;
  return /* @__PURE__ */ jsxs(Card, { padding: "sm", className: cn("flex flex-col justify-between border-l-4", statToneClass[tone], className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        icon ? /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "flex size-9 shrink-0 items-center justify-center rounded-control border shadow-sm dark:bg-surface-muted dark:shadow-none [&_svg]:size-5",
              statIconClass[tone]
            ),
            "aria-hidden": "true",
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col", children: [
          /* @__PURE__ */ jsx(Text, { variant: "small", className: "truncate font-medium text-muted-foreground", children: label }),
          loading ? /* @__PURE__ */ jsx(Skeleton, { className: "mt-1 h-7 w-16" }) : /* @__PURE__ */ jsx("span", { className: "font-sans text-2xl font-bold leading-8 tracking-tight text-foreground tabular-nums", children: value })
        ] })
      ] }),
      progress !== void 0 ? /* @__PURE__ */ jsxs("div", { className: "relative flex size-12 shrink-0 items-center justify-center", children: [
        /* @__PURE__ */ jsxs("svg", { className: "size-12 -rotate-90", viewBox: "0 0 40 40", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("circle", { className: "text-border", strokeWidth: "4", stroke: "currentColor", fill: "transparent", r: radius, cx: "20", cy: "20" }),
          /* @__PURE__ */ jsx(
            "circle",
            {
              className: statRingClass[tone],
              strokeWidth: "4",
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              strokeLinecap: "round",
              stroke: "currentColor",
              fill: "transparent",
              r: radius,
              cx: "20",
              cy: "20"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "absolute text-caption font-semibold text-foreground tabular-nums", children: [
          clamped,
          "%"
        ] })
      ] }) : null
    ] }),
    hint ? /* @__PURE__ */ jsx("div", { className: "mt-2 border-t border-border/60 pt-2", children: /* @__PURE__ */ jsx(Text, { variant: "caption", className: "block truncate", children: hint }) }) : null
  ] });
}
function Timeline({ items, className }) {
  return /* @__PURE__ */ jsx("ol", { className: cn("flex flex-col", className), children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "relative flex gap-3 pb-6 last:pb-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "mt-1.5 size-2.5 rounded-pill bg-brand", "aria-hidden": "true" }),
      i < items.length - 1 ? /* @__PURE__ */ jsx("span", { className: "mt-1 w-px flex-1 bg-border", "aria-hidden": "true" }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
      /* @__PURE__ */ jsx(Text, { variant: "control", children: item.title }),
      item.description ? /* @__PURE__ */ jsx(Text, { variant: "small", children: item.description }) : null,
      item.time ? /* @__PURE__ */ jsx(Text, { variant: "caption", children: item.time }) : null
    ] })
  ] }, item.id)) });
}
function TopbarSearch({ label, shortcut, onOpen, value, onValueChange, className }) {
  const shell = cn(
    "flex h-9 w-full items-center gap-2 sm:w-80 rounded-control border border-sidebar-border bg-sidebar-active px-3 font-sans text-body text-sidebar-muted transition-colors hover:border-sidebar-muted focus-within:ring-2 focus-within:ring-brand",
    className
  );
  if (onOpen) {
    return /* @__PURE__ */ jsxs("button", { type: "button", onClick: onOpen, "aria-label": label, className: cn(shell, "text-left"), children: [
      /* @__PURE__ */ jsx(Search, { className: "size-4 shrink-0", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: label }),
      shortcut ? /* @__PURE__ */ jsx("kbd", { className: "rounded border border-sidebar-border px-1.5 text-caption text-sidebar-item/80", children: shortcut }) : null
    ] });
  }
  return /* @__PURE__ */ jsxs("label", { className: shell, children: [
    /* @__PURE__ */ jsx(Search, { className: "size-4 shrink-0", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        "aria-label": label,
        placeholder: label,
        value: value ?? "",
        onChange: (e) => onValueChange?.(e.target.value),
        className: "min-w-0 flex-1 bg-transparent text-sidebar-item placeholder:text-sidebar-muted focus-visible:outline-none"
      }
    ),
    shortcut ? /* @__PURE__ */ jsx("kbd", { className: "rounded border border-sidebar-border px-1.5 text-caption text-sidebar-item/80", children: shortcut }) : null
  ] });
}
function UserMenu({ name, role, src, onClick, "aria-label": ariaLabel, className }) {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden min-w-0 flex-col items-end text-right leading-tight md:flex", children: [
      /* @__PURE__ */ jsx("span", { className: "max-w-48 truncate font-sans text-body font-medium text-sidebar-item", children: name }),
      role ? /* @__PURE__ */ jsx("span", { className: "max-w-48 truncate text-caption text-sidebar-muted", children: role }) : null
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "relative inline-flex shrink-0", children: [
      /* @__PURE__ */ jsx(Avatar, { name, src, size: "md" }),
      /* @__PURE__ */ jsx("span", { className: "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-pill border-2 border-sidebar bg-success", "aria-hidden": "true" })
    ] })
  ] });
  const shell = cn("flex items-center gap-2.5 rounded-control py-1 pl-2 pr-1 transition-colors hover:bg-sidebar-active", className);
  if (onClick) {
    return /* @__PURE__ */ jsx("button", { type: "button", onClick, "aria-label": ariaLabel ?? name, title: ariaLabel ?? name, className: shell, children: content });
  }
  return /* @__PURE__ */ jsx("div", { className: shell, children: content });
}
function SectionCard({ title, subtitle, action, children, className, ...props }) {
  return /* @__PURE__ */ jsxs(Card, { padding: "none", className: cn("flex flex-col overflow-hidden", className), ...props, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 border-b border-border px-5 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsx(Text, { variant: "control", as: "h2", className: "font-bold tracking-tight", children: title }),
        subtitle ? /* @__PURE__ */ jsx(Text, { variant: "caption", className: "block", children: subtitle }) : null
      ] }),
      action ? /* @__PURE__ */ jsx("div", { className: "shrink-0", children: action }) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 p-5", children })
  ] });
}
var barTone = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info"
};
function ProgressCard({ title, subtitle, rows, action, emptyLabel, className }) {
  return /* @__PURE__ */ jsx(SectionCard, { title, subtitle, action, className, children: rows.length === 0 ? /* @__PURE__ */ jsx(Text, { variant: "small", children: emptyLabel }) : /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-4", children: rows.map((row) => {
    const pct = row.total > 0 ? Math.min(100, Math.round(row.value / row.total * 100)) : 0;
    return /* @__PURE__ */ jsxs("li", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx(Text, { variant: "control", children: row.label }),
        /* @__PURE__ */ jsx(Text, { variant: "small", as: "span", className: "tabular-nums", children: row.valueLabel ?? `${row.value} / ${row.total}` })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          role: "progressbar",
          "aria-valuenow": pct,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-label": typeof row.label === "string" ? row.label : void 0,
          className: "h-2 w-full overflow-hidden rounded-pill bg-surface-muted",
          children: /* @__PURE__ */ jsx("div", { className: cn("h-full rounded-pill transition-[width]", barTone[row.tone ?? "brand"]), style: { width: `${pct}%` } })
        }
      )
    ] }, row.id);
  }) }) });
}
var noticeVariants = cva("flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-card border p-4 sm:p-5 font-sans shadow-sm dark:shadow-none", {
  variants: {
    tone: {
      neutral: "border-border bg-surface text-foreground",
      brand: "border-brand/25 bg-brand-soft/60 dark:bg-surface text-foreground",
      success: "border-success/25 bg-success/5 dark:bg-surface text-foreground",
      warning: "border-warning/25 bg-warning/5 dark:bg-surface text-foreground",
      danger: "border-danger/25 bg-danger/5 dark:bg-surface text-foreground"
    }
  },
  defaultVariants: { tone: "neutral" }
});
var iconTone = {
  neutral: "border-border bg-surface-muted text-muted-foreground",
  brand: "border-brand/20 bg-brand-soft text-brand",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  danger: "border-danger/20 bg-danger/10 text-danger"
};
function NoticeBanner({ tone = "neutral", icon, title, description, action, className }) {
  const resolvedTone = tone ?? "neutral";
  return /* @__PURE__ */ jsxs("div", { role: "status", className: cn(noticeVariants({ tone: resolvedTone }), className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-4", children: [
      icon ? /* @__PURE__ */ jsx("span", { className: cn("flex size-10 shrink-0 items-center justify-center rounded-control border [&_svg]:size-5", iconTone[resolvedTone]), "aria-hidden": "true", children: icon }) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsx(Text, { variant: "control", className: "font-bold", children: title }),
        description ? /* @__PURE__ */ jsx(Text, { variant: "caption", className: "block", children: description }) : null
      ] })
    ] }),
    action ? /* @__PURE__ */ jsx("div", { className: "shrink-0", children: action }) : null
  ] });
}
var iconTone2 = {
  neutral: "bg-surface-muted text-muted-foreground",
  brand: "bg-brand-soft text-brand",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info"
};
var countTone = {
  neutral: "bg-surface-muted text-muted-foreground",
  brand: "bg-brand text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
  info: "bg-info text-white"
};
function ActionRow({ icon, label, caption, count, tone = "neutral", onClick, ariaLabel, className }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": ariaLabel,
      className: cn(
        "group flex w-full items-center gap-3 rounded-control border border-border bg-surface-muted/50 px-3 py-2.5 text-left font-sans transition-colors hover:border-border-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className
      ),
      children: [
        icon ? /* @__PURE__ */ jsx("span", { className: cn("flex size-8 shrink-0 items-center justify-center rounded-control [&_svg]:size-4", iconTone2[tone]), "aria-hidden": "true", children: icon }) : null,
        /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
          /* @__PURE__ */ jsx("span", { className: "truncate text-small font-semibold text-foreground group-hover:text-brand", children: label }),
          caption ? /* @__PURE__ */ jsx("span", { className: "truncate text-caption text-muted-foreground", children: caption }) : null
        ] }),
        count !== void 0 ? /* @__PURE__ */ jsx("span", { className: cn("shrink-0 rounded-pill px-2 py-0.5 text-caption font-bold tabular-nums", countTone[tone]), children: count }) : null,
        /* @__PURE__ */ jsx(ChevronRight, { className: "size-4 shrink-0 text-muted-foreground group-hover:text-brand", "aria-hidden": "true" })
      ]
    }
  );
}
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  loading = false
}) {
  return /* @__PURE__ */ jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { className: "text-title text-foreground", children: title }),
      description ? /* @__PURE__ */ jsx(AlertDialogDescription, { className: "text-subtitle text-muted-foreground", children: description }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { className: buttonVariants({ variant: "outline", size: "md" }), children: cancelLabel }),
      /* @__PURE__ */ jsx(
        AlertDialogAction,
        {
          disabled: loading,
          onClick: onConfirm,
          className: cn(buttonVariants({ variant: destructive ? "danger" : "primary", size: "md" })),
          children: confirmLabel
        }
      )
    ] })
  ] }) });
}
function DatePicker({ value, onValueChange, placeholder, displayFormat = "PP", disabled, id, className }) {
  const [open, setOpen] = React16.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { id, variant: "outline", disabled, className: cn("h-control-md w-full justify-start font-normal text-body", className), children: [
      /* @__PURE__ */ jsx(CalendarDays, { className: "text-muted-foreground", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: cn(!value && "text-sidebar-muted"), children: value ? format(value, displayFormat) : placeholder })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-2", children: /* @__PURE__ */ jsx(
      DayPicker,
      {
        mode: "single",
        selected: value,
        onSelect: (d) => {
          onValueChange(d);
          setOpen(false);
        }
      }
    ) })
  ] });
}
function DateRangePicker({ value, onValueChange, placeholder, displayFormat = "PP", disabled, className }) {
  const [open, setOpen] = React16.useState(false);
  const label = value?.from && value?.to ? `${format(value.from, displayFormat)} \u2013 ${format(value.to, displayFormat)}` : value?.from ? format(value.from, displayFormat) : null;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled, className: cn("h-control-md w-full justify-start font-normal text-body sm:w-auto", className), children: [
      /* @__PURE__ */ jsx(CalendarDays, { className: "text-muted-foreground", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: cn(!label && "text-sidebar-muted"), children: label ?? placeholder })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-2", children: /* @__PURE__ */ jsx(
      DayPicker,
      {
        mode: "range",
        selected: value,
        onSelect: (r) => {
          onValueChange(r);
          if (r?.from && r?.to) setOpen(false);
        }
      }
    ) })
  ] });
}
function FileUpload({ onFilesSelected, label, hint, accept, multiple = false, disabled, className }) {
  const inputRef = React16.useRef(null);
  const [dragging, setDragging] = React16.useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || void 0,
      onClick: () => !disabled && inputRef.current?.click(),
      onKeyDown: (e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      onDragOver: (e) => {
        e.preventDefault();
        setDragging(true);
      },
      onDragLeave: () => setDragging(false),
      onDrop: (e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) onFilesSelected(Array.from(e.dataTransfer.files));
      },
      className: cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed border-border-strong bg-surface px-6 py-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        dragging && "border-brand bg-brand-soft",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Upload, { className: "size-5 text-brand", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(Text, { variant: "control", as: "span", children: label }),
        hint ? /* @__PURE__ */ jsx(Text, { variant: "caption", children: hint }) : null,
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            className: "hidden",
            accept,
            multiple,
            disabled,
            onChange: (e) => {
              onFilesSelected(Array.from(e.target.files ?? []));
              e.target.value = "";
            }
          }
        )
      ]
    }
  );
}
function StepWizard({ steps, current, stepLabel, title, subtitle, onBack, onStepClick, children, className }) {
  const activeStep = steps[current];
  return /* @__PURE__ */ jsxs("div", { className: cn("overflow-hidden rounded-card border border-border bg-surface shadow-sm dark:shadow-none", className), children: [
    title ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-brand px-6 py-4 text-white", children: [
      onBack ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          "aria-label": "Back",
          className: "inline-flex size-8 shrink-0 items-center justify-center rounded-control text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
        }
      ) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-sans text-control font-bold text-white", children: title }),
        /* @__PURE__ */ jsx("p", { className: "font-sans text-small text-white/85", children: subtitle ?? `${stepLabel} ${current + 1} / ${steps.length}${activeStep ? `: ${activeStep.label}` : ""}` })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "border-b border-border px-6 py-5", children: [
      /* @__PURE__ */ jsx("ol", { className: "flex items-start justify-between gap-2 overflow-x-auto", children: steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return /* @__PURE__ */ jsxs(React16.Fragment, { children: [
          /* @__PURE__ */ jsxs("li", { className: "flex shrink-0 flex-col items-center gap-2 text-center", "aria-current": active ? "step" : void 0, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: !onStepClick || !done && !active,
                onClick: () => onStepClick?.(i),
                className: cn(
                  "flex size-10 items-center justify-center rounded-pill border-2 font-sans text-small font-semibold transition-colors [&_svg]:size-4",
                  done && "border-success bg-success text-white",
                  active && "border-brand bg-brand text-white",
                  !active && !done && "border-border-strong bg-surface-muted text-muted-foreground",
                  onStepClick && (done || active) ? "cursor-pointer" : "cursor-default"
                ),
                children: done ? /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }) : step.icon ?? i + 1
              }
            ),
            /* @__PURE__ */ jsx("span", { className: cn("max-w-24 font-sans text-small leading-tight", active || done ? "font-semibold text-foreground" : "text-muted-foreground"), children: step.label })
          ] }),
          i < steps.length - 1 ? /* @__PURE__ */ jsx("li", { "aria-hidden": "true", className: cn("mt-5 h-0.5 min-w-4 flex-1", done ? "bg-success" : "bg-border") }) : null
        ] }, step.id);
      }) }),
      !title ? /* @__PURE__ */ jsx(Text, { variant: "caption", as: "span", className: "mt-3 block text-center", children: `${stepLabel} ${current + 1} / ${steps.length}` }) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6", children })
  ] });
}
function Badge2({ count }) {
  return /* @__PURE__ */ jsx("span", { className: "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill bg-danger px-1.5 font-sans text-caption font-semibold leading-none text-white", children: count > 99 ? "99+" : count });
}
var linkBase = "flex h-9 w-full items-center gap-3 rounded-control px-3 font-sans text-body text-sidebar-item/90 transition-colors hover:bg-sidebar-active hover:text-sidebar-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&_svg]:size-4 [&_svg]:shrink-0";
var linkActive = "bg-sidebar-active font-semibold text-sidebar-item";
function defaultLink({ href, className, children, ...rest }) {
  return /* @__PURE__ */ jsx("a", { href, className, ...rest, children });
}
function NavRow({ item, collapsed, renderLink }) {
  const hasChildren = !!item.children?.length;
  const childActive = item.children?.some((c) => c.active || c.children?.some((g) => g.active)) ?? false;
  const [localOpen, setLocalOpen] = React16.useState(childActive);
  const open = item.expanded ?? localOpen;
  const toggle = () => {
    item.onExpandedChange?.(!open);
    if (item.expanded === void 0) setLocalOpen(!open);
  };
  const isActive = !!item.active;
  if (hasChildren) {
    return /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "aria-expanded": open,
          onClick: toggle,
          className: cn(linkBase, childActive && "text-sidebar-item"),
          title: collapsed ? item.label : void 0,
          children: [
            item.icon,
            !collapsed ? /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: item.label }) : null,
            !collapsed ? /* @__PURE__ */ jsx(ChevronDown, { className: cn("size-4 transition-transform", open && "rotate-180"), "aria-hidden": "true" }) : null
          ]
        }
      ),
      open && !collapsed ? /* @__PURE__ */ jsx("ul", { className: "ml-5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3", children: item.children.filter((c) => !c.hidden).map((child) => /* @__PURE__ */ jsx(NavRow, { item: child, collapsed, renderLink }, child.id)) }) : null
    ] });
  }
  const className = cn(linkBase, isActive && linkActive);
  return /* @__PURE__ */ jsx("li", { children: item.href ? renderLink({ href: item.href, className, onClick: item.onSelect, children: /* @__PURE__ */ jsxs(Fragment, { children: [
    item.icon,
    !collapsed ? /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.label }) : /* @__PURE__ */ jsx("span", { className: "sr-only", children: item.label }),
    !collapsed && item.badge && item.badge > 0 ? /* @__PURE__ */ jsx(Badge2, { count: item.badge }) : null
  ] }), "aria-current": isActive ? "page" : void 0 }) : /* @__PURE__ */ jsxs("button", { type: "button", onClick: item.onSelect, className, children: [
    item.icon,
    !collapsed ? /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.label }) : null
  ] }) });
}
function Sidebar({ brand, items = [], sections, footer, collapsed = false, renderLink = defaultLink, label, className }) {
  return /* @__PURE__ */ jsxs("aside", { className: cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", collapsed ? "w-16" : "w-sidebar", "border-r border-sidebar-border transition-[width] duration-150", className), children: [
    brand ? /* @__PURE__ */ jsx("div", { className: "flex h-topbar shrink-0 items-center border-b border-sidebar-border px-4", children: brand }) : null,
    /* @__PURE__ */ jsx("nav", { "aria-label": label, className: "flex-1 overflow-y-auto p-2", children: sections ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: sections.map((section) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
      !collapsed ? /* @__PURE__ */ jsx("span", { className: "px-3 pb-1 font-sans text-caption font-medium uppercase tracking-wide text-sidebar-muted", children: section.label }) : null,
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-0.5", children: section.items.filter((i) => !i.hidden).map((item) => /* @__PURE__ */ jsx(NavRow, { item, collapsed, renderLink }, item.id)) })
    ] }, section.id)) }) : /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-0.5", children: items.filter((i) => !i.hidden).map((item) => /* @__PURE__ */ jsx(NavRow, { item, collapsed, renderLink }, item.id)) }) }),
    footer ? /* @__PURE__ */ jsx("div", { className: "shrink-0 border-t border-sidebar-border p-2", children: footer }) : null
  ] });
}
function Topbar({ leading, trailing, className }) {
  return /* @__PURE__ */ jsxs("header", { className: cn("sticky top-0 z-sticky flex h-topbar shrink-0 items-center justify-between gap-4 border-b border-sidebar-border bg-sidebar px-5 text-sidebar-foreground", className), children: [
    /* @__PURE__ */ jsx("div", { className: "flex min-w-0 items-center gap-3", children: leading }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: trailing })
  ] });
}
function AppShell({ sidebar, topbar, menuLabel, children, className }) {
  const [mobileOpen, setMobileOpen] = React16.useState(false);
  return /* @__PURE__ */ jsx(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: /* @__PURE__ */ jsxs("div", { className: cn("flex h-dvh min-h-0 bg-background font-sans text-body text-foreground", className), children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex", children: /* @__PURE__ */ jsx(Sidebar, { ...sidebar, className: "h-full" }) }),
    /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "bg-sidebar p-0 text-sidebar-foreground", children: /* @__PURE__ */ jsx(Sidebar, { ...sidebar, className: "h-full w-full" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsx(
        Topbar,
        {
          leading: /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": menuLabel, className: "text-sidebar-foreground hover:bg-sidebar-foreground/10 md:hidden", children: /* @__PURE__ */ jsx(Menu, { "aria-hidden": "true" }) }) }),
          trailing: topbar
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "min-h-0 flex-1 overflow-y-auto p-4 md:p-6", children })
    ] })
  ] }) });
}
function PageContainer({ children, width = "full", className }) {
  const max = { md: "max-w-3xl", lg: "max-w-5xl", xl: "max-w-7xl", full: "max-w-none" }[width];
  return /* @__PURE__ */ jsx("div", { className: cn("mx-auto flex w-full flex-col gap-6", max, className), children });
}
function AuthLayout({ brand, children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex min-h-dvh items-center justify-center bg-background p-4 font-sans text-body text-foreground", className), children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-md flex-col gap-6 rounded-panel border border-border bg-surface p-6", children: [
    brand ? /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: brand }) : null,
    children
  ] }) });
}
function SettingsLayout({ nav, children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]", className), children: [
    /* @__PURE__ */ jsx("aside", { className: "flex flex-col gap-1", children: nav }),
    /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-col gap-6", children })
  ] });
}

export { ActionRow, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AppShell, AuthLayout, Avatar, Badge, Breadcrumb, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, ConfirmDialog, DataTable, DatePicker, DateRangePicker, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Ellipsis, EmptyState, ErrorState, Field, FileUpload, FilterBar, FormSection, IconButton, Input, NoticeBanner, PageContainer, PageHeader, Pagination, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProgressCard, RadioGroup, RadioGroupItem, SearchInput, SectionCard, SegmentedControl, Select, Separator2 as Separator, SettingsLayout, Sheet, SheetClose, SheetContent, SheetTrigger, Sidebar, Skeleton, Spinner, StatCard, StatusBadge, StepWizard, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, Timeline, Toaster, Tooltip, TooltipProvider, Topbar, TopbarSearch, UserMenu, badgeVariants, buttonVariants, cn, textVariants };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map