import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/** Typography roles from the live mojaboard UI. Do not invent sizes in apps. */
export const textVariants = cva("font-sans", {
  variants: {
    variant: {
      title: "text-title font-extrabold text-foreground",
      subtitle: "text-subtitle text-muted-foreground",
      body: "text-body text-foreground",
      control: "text-control text-foreground",
      small: "text-small text-muted-foreground",
      caption: "text-caption text-muted-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

const defaultTag: Record<NonNullable<VariantProps<typeof textVariants>["variant"]>, keyof React.JSX.IntrinsicElements> = {
  title: "h1",
  subtitle: "p",
  body: "p",
  control: "span",
  small: "p",
  caption: "span",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

export function Text({ variant = "body", as, className, ...props }: TextProps) {
  const Comp = (as ?? defaultTag[variant ?? "body"]) as React.ElementType;
  return <Comp className={cn(textVariants({ variant }), className)} {...props} />;
}
