import { Badge, type BadgeProps } from "./Badge";

export type StatusTone = NonNullable<BadgeProps["tone"]>;

export interface StatusBadgeProps extends Omit<BadgeProps, "tone"> {
  /** Maps a status to a tone. Apps pass their own mapping; the label is translated text. */
  tone: StatusTone;
  label: React.ReactNode;
}

/** Status pill (for example Open, Closed, Overdue). Label is passed in, never hard-coded. */
export function StatusBadge({ tone, label, ...props }: StatusBadgeProps) {
  return (
    <Badge tone={tone} {...props}>
      <span className="size-1.5 rounded-pill bg-current" aria-hidden="true" />
      {label}
    </Badge>
  );
}
