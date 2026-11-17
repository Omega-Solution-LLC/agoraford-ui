import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../lib/cn";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  /** Used for the fallback initials and the alt text. */
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClass = { sm: "size-6 text-caption", md: "size-8 text-small", lg: "size-10 text-body" };

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ src, name, size = "md", className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill bg-brand-soft align-middle",
        sizeClass[size],
        className,
      )}
      {...props}
    >
      <AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover" />
      <AvatarPrimitive.Fallback className="font-medium text-brand">{initials(name)}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
