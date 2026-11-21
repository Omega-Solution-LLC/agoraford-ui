import { Badge, type BadgeProps } from "./Badge";

export type StatusTone = NonNullable<BadgeProps["tone"]>;

export interface StatusBadgeProps extends Omit<BadgeProps, "tone"> {
  /** Maps a status to a tone. Apps pass their own mapping; the label is translated text. */
  tone: StatusTone;
  label: React.ReactNode;
}

/** Status pill (for example Open, Closed, Overdue). Text only: no leading dot or icon by default. */
export function StatusBadge({ tone, label, ...props }: StatusBadgeProps) {
  return (
    <Badge tone={tone} {...props}>
      {label}
    </Badge>
  );
}
