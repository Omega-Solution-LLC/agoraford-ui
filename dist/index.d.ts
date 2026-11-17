import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { VariantProps } from 'class-variance-authority';
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
import { ColumnDef } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';
import { ClassValue } from 'clsx';
export { toast } from 'sonner';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    /** Shows a spinner and disables the button. */
    loading?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Accessible label read by screen readers. */
    label?: string;
    size?: number;
}
declare function Spinner({ label, size, className, ...props }: SpinnerProps): React$1.JSX.Element;

interface FieldProps {
    /** Label text. The library never hard-codes labels; apps pass translated text. */
    label?: React$1.ReactNode;
    hint?: React$1.ReactNode;
    error?: React$1.ReactNode;
    required?: boolean;
    htmlFor?: string;
    className?: string;
    children: React$1.ReactNode;
}
/** Label, control and hint or error text. Label-to-control gap is 6px. */
declare function Field({ label, hint, error, required, htmlFor, className, children }: FieldProps): React$1.JSX.Element;

type InputProps = React$1.InputHTMLAttributes<HTMLInputElement>;
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;
type TextareaProps = React$1.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

interface SelectOption {
    value: string;
    label: React$1.ReactNode;
    disabled?: boolean;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    invalid?: boolean;
    /** Accessible name when there is no visible label. Translated by the app. */
    "aria-label"?: string;
    className?: string;
}
/** Single-value select on Radix. Labels come from the app (translated). */
declare function Select({ options, placeholder, invalid, className, id, "aria-label": ariaLabel, ...props }: SelectProps): React$1.JSX.Element;

type CheckboxProps = React$1.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

type SwitchProps = React$1.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;
declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const RadioGroup: React$1.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React$1.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const badgeVariants: (props?: ({
    tone?: "danger" | "neutral" | "brand" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, tone, ...props }: BadgeProps): React$1.JSX.Element;

type StatusTone = NonNullable<BadgeProps["tone"]>;
interface StatusBadgeProps extends Omit<BadgeProps, "tone"> {
    /** Maps a status to a tone. Apps pass their own mapping; the label is translated text. */
    tone: StatusTone;
    label: React.ReactNode;
}
/** Status pill (for example Open, Closed, Overdue). Label is passed in, never hard-coded. */
declare function StatusBadge({ tone, label, ...props }: StatusBadgeProps): React$1.JSX.Element;

interface AvatarProps extends React$1.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src?: string;
    /** Used for the fallback initials and the alt text. */
    name: string;
    size?: "sm" | "md" | "lg";
}
declare function Avatar({ src, name, size, className, ...props }: AvatarProps): React$1.JSX.Element;

declare const iconButtonVariants: (props?: ({
    tone?: "inverse" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface IconButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
    /** Required: icon-only buttons need an accessible name. Translated by the app. */
    label: string;
}
/** Square icon-only button, 36px, used in the topbar and toolbars. */
declare const IconButton: React$1.ForwardRefExoticComponent<IconButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
interface TooltipProps {
    content: React$1.ReactNode;
    children: React$1.ReactElement;
    side?: "top" | "right" | "bottom" | "left";
    delayMs?: number;
}
/** Hover and focus hint. Wrap the app once in TooltipProvider. */
declare function Tooltip({ content, children, side, delayMs }: TooltipProps): React$1.JSX.Element;

declare const Dialog: React$1.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    closeLabel?: string;
} & React$1.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
declare function DialogFooter({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
declare const DialogTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;
/** Confirmation dialog that cannot be dismissed by outside click. Use for destructive actions. */
declare const AlertDialog: React$1.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogContent: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AlertDialogTitle: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
declare const AlertDialogAction: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogActionProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancel: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogCancelProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const Sheet: React$1.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
interface SheetContentProps extends React$1.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    side?: "left" | "right";
    closeLabel?: string;
}
/** Side drawer. Used for the mobile navigation drawer and side panels. */
declare const SheetContent: React$1.ForwardRefExoticComponent<SheetContentProps & React$1.RefAttributes<HTMLDivElement>>;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownMenuItemProps extends React$1.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    destructive?: boolean;
}
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>>;

declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Tabs: React$1.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
/** Underline tab. Active tab uses the brand color and a 2px underline. */
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface SegmentedOption<T extends string> {
    value: T;
    label: React$1.ReactNode;
}
interface SegmentedControlProps<T extends string> {
    options: SegmentedOption<T>[];
    value: T;
    onValueChange: (value: T) => void;
    /** Accessible name for the group. Apps pass translated text. */
    label: string;
    className?: string;
}
/** Pill group for a small set of exclusive options, e.g. the date range chips on the dashboard. */
declare function SegmentedControl<T extends string>({ options, value, onValueChange, label, className }: SegmentedControlProps<T>): React$1.JSX.Element;

declare const cardVariants: (props?: ({
    padding?: "sm" | "md" | "none" | "comfortable" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
/** Surface container. sm = 16px, comfortable = 20px (live dashboard cards), md = 24px. */
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;
declare function CardHeader({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
declare function CardTitle({ className, ...props }: React$1.HTMLAttributes<HTMLHeadingElement>): React$1.JSX.Element;
declare function CardDescription({ className, ...props }: React$1.HTMLAttributes<HTMLParagraphElement>): React$1.JSX.Element;
declare function CardContent({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
declare function CardFooter({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;

declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function Skeleton({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
interface ProgressProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 0 to 100. */
    value: number;
    label: string;
}
declare function Progress({ value, label, className, ...props }: ProgressProps): React$1.JSX.Element;

/** Typography roles from the live mojaboard UI. Do not invent sizes in apps. */
declare const textVariants: (props?: ({
    variant?: "title" | "body" | "caption" | "small" | "subtitle" | "control" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextProps extends React$1.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    as?: keyof React$1.JSX.IntrinsicElements;
}
declare function Text({ variant, as, className, ...props }: TextProps): React$1.JSX.Element;

/** Mount once at the app root. Toasts use the library tokens. */
declare function Toaster(): React$1.JSX.Element;

interface BreadcrumbItem {
    label: React$1.ReactNode;
    href?: string;
}
interface BreadcrumbProps extends React$1.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    /** Accessible name for the nav landmark. Apps pass translated text. */
    label: string;
    /** Link component for router-agnostic rendering, e.g. next/link or react-router Link. */
    renderLink?: (item: BreadcrumbItem, children: React$1.ReactNode) => React$1.ReactNode;
}
declare function Breadcrumb({ items, label, renderLink, className, ...props }: BreadcrumbProps): React$1.JSX.Element;
interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    /** Translated labels, passed by the app. */
    labels: {
        previous: string;
        next: string;
        pageOf: (page: number, total: number) => string;
    };
    className?: string;
}
/** Previous and next paging with a "page x of y" label. Labels are passed in. */
declare function Pagination({ page, pageCount, onPageChange, labels, className }: PaginationProps): React$1.JSX.Element;
/** Collapsed-overflow marker, for lists that are too long to show. */
declare function Ellipsis({ className }: {
    className?: string;
}): React$1.JSX.Element;

interface DataTableLabels {
    /** Shown when there are no rows. Translated by the app. */
    empty: string;
    /** Read by screen readers on sortable headers. */
    sortAscending: string;
    sortDescending: string;
}
interface DataTableProps<T> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    labels: DataTableLabels;
    /** Shows skeleton rows instead of data. */
    loading?: boolean;
    /** Rows shown while loading. */
    loadingRows?: number;
    /** Replaces the empty message, for example an EmptyState node. */
    emptyState?: React$1.ReactNode;
    /** Pagination or other footer content, placed below the table. */
    footer?: React$1.ReactNode;
    getRowId?: (row: T, index: number) => string;
    className?: string;
}
/**
 * Data table on TanStack Table. Sticky header, sortable columns, loading skeleton,
 * empty state, horizontal scroll on narrow screens. Sort state is internal.
 */
declare function DataTable<T>({ columns, data, labels, loading, loadingRows, emptyState, footer, getRowId, className, }: DataTableProps<T>): React$1.JSX.Element;

interface SearchInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value: string;
    onValueChange: (value: string) => void;
    /** Accessible label and placeholder, translated by the app. */
    label: string;
    /** Debounce in ms before onValueChange fires. 0 disables debounce. */
    debounceMs?: number;
    clearLabel?: string;
}
/**
 * Search field with a leading icon and clear button. Keeps its own text while the list loads,
 * so typing is never lost (see mojaboard CLAUDE.md rule on search fields).
 */
declare function SearchInput({ value, onValueChange, label, debounceMs, clearLabel, className, ...props }: SearchInputProps): React$1.JSX.Element;
interface FilterBarProps {
    /** Search field, usually a SearchInput. */
    search?: React$1.ReactNode;
    /** Filter controls (Select, SegmentedControl, DatePicker). */
    filters?: React$1.ReactNode;
    /** Right-aligned actions, for example "Add" or view toggles. */
    actions?: React$1.ReactNode;
    /** Shows a "Clear all" button when true. */
    hasActiveFilters?: boolean;
    onClear?: () => void;
    clearLabel?: string;
    className?: string;
}
/** Search, filters, actions and clear-all in one row. Wraps on narrow screens. */
declare function FilterBar({ search, filters, actions, hasActiveFilters, onClear, clearLabel, className }: FilterBarProps): React$1.JSX.Element;

interface EmptyStateProps {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    /** Optional icon. Defaults to an inbox icon. */
    icon?: React$1.ReactNode;
    action?: React$1.ReactNode;
    className?: string;
}
/** Shown when a list or section has no items. Text is always passed in, translated. */
declare function EmptyState({ title, description, icon, action, className }: EmptyStateProps): React$1.JSX.Element;
interface ErrorStateProps {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    retryLabel?: string;
    onRetry?: () => void;
    className?: string;
}
/** Shown when loading failed. Retry is optional. */
declare function ErrorState({ title, description, retryLabel, onRetry, className }: ErrorStateProps): React$1.JSX.Element;

interface PageHeaderProps {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    /** Breadcrumb or back link, rendered above the title. */
    breadcrumb?: React$1.ReactNode;
    /** Right-aligned actions. */
    actions?: React$1.ReactNode;
    className?: string;
}
/** Page title block: title (30px, extra bold), subtitle (14px), actions on the right. */
declare function PageHeader({ title, subtitle, breadcrumb, actions, className }: PageHeaderProps): React$1.JSX.Element;
interface FormSectionProps {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    children: React$1.ReactNode;
    className?: string;
}
/** Titled group of form fields. Fields inside are spaced 16px apart. */
declare function FormSection({ title, description, children, className }: FormSectionProps): React$1.JSX.Element;
type StatTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";
interface StatCardProps {
    /** Accent for the live dashboard KPI tiles. Defaults to neutral. */
    tone?: StatTone;
    label: React$1.ReactNode;
    value: React$1.ReactNode;
    /** Small line under the value, e.g. a date range or a delta. */
    hint?: React$1.ReactNode;
    icon?: React$1.ReactNode;
    /** Shows a skeleton instead of the value. */
    loading?: boolean;
    className?: string;
}
/** KPI tile: label, large value, optional icon and hint. */
declare function StatCard({ tone, label, value, hint, icon, loading, className }: StatCardProps): React$1.JSX.Element;
interface TimelineItem {
    id: string;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    time?: React$1.ReactNode;
}
/** Vertical event list, for status history and activity logs. */
declare function Timeline({ items, className }: {
    items: TimelineItem[];
    className?: string;
}): React$1.JSX.Element;

interface TopbarSearchProps {
    /** Accessible name and placeholder, translated by the app. */
    label: string;
    /** Shortcut hint shown on the right, e.g. "⌘K". */
    shortcut?: string;
    /** Opens a search dialog when set. The field is a button, not an input, so it can open a modal. */
    onOpen?: () => void;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}
/** Topbar search pill: 36px, 320px wide on desktop, matches the live mojaboard search. */
declare function TopbarSearch({ label, shortcut, onOpen, value, onValueChange, className }: TopbarSearchProps): React$1.JSX.Element;
interface UserMenuProps {
    name: string;
    /** Secondary line under the name, e.g. the role. */
    role?: string;
    src?: string;
    /** Opens the user menu. */
    onClick?: () => void;
    "aria-label"?: string;
    className?: string;
}
/** Avatar with name and role, as shown at the right of the live topbar. */
declare function UserMenu({ name, role, src, onClick, "aria-label": ariaLabel, className }: UserMenuProps): React$1.JSX.Element;

interface SectionCardProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    /** Right-aligned action, e.g. a "View all" link or a button. */
    action?: React$1.ReactNode;
    children: React$1.ReactNode;
}
/** Titled card: title and subtitle on the left, action on the right, content below. */
declare function SectionCard({ title, subtitle, action, children, className, ...props }: SectionCardProps): React$1.JSX.Element;
type ProgressTone = "brand" | "success" | "warning" | "danger" | "info";
interface ProgressRow {
    id: string;
    label: React$1.ReactNode;
    value: number;
    total: number;
    tone?: ProgressTone;
    /** Right-hand text, e.g. "12 / 40". Defaults to value / total. */
    valueLabel?: React$1.ReactNode;
}
interface ProgressCardProps {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    rows: ProgressRow[];
    /** Right-aligned action in the card header, e.g. a drill-down link. */
    action?: React$1.ReactNode;
    /** Shown when there are no rows. Translated by the app. */
    emptyLabel?: React$1.ReactNode;
    className?: string;
}
/** Labelled progress bars inside a SectionCard, for SLA and status breakdowns. */
declare function ProgressCard({ title, subtitle, rows, action, emptyLabel, className }: ProgressCardProps): React$1.JSX.Element;

declare const noticeVariants: (props?: ({
    tone?: "danger" | "neutral" | "brand" | "success" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface NoticeBannerProps extends VariantProps<typeof noticeVariants> {
    icon?: React$1.ReactNode;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    /** Right-aligned action, e.g. a button. */
    action?: React$1.ReactNode;
    className?: string;
}
/** Inline status message with an optional icon and action. Used for attestation and deadline notices. */
declare function NoticeBanner({ tone, icon, title, description, action, className }: NoticeBannerProps): React$1.JSX.Element;

interface ActionRowProps {
    /** Icon node, rendered inside a tinted 36px tile. */
    icon?: React$1.ReactNode;
    label: React$1.ReactNode;
    /** One short line under the label, e.g. "All clear". */
    caption?: React$1.ReactNode;
    /** Count shown as a pill on the right. */
    count?: number;
    tone?: StatTone;
    onClick?: () => void;
    /** Accessible name for the whole row. Translated by the app. */
    ariaLabel?: string;
    className?: string;
}
/** Clickable list row for "requires attention" style lists. */
declare function ActionRow({ icon, label, caption, count, tone, onClick, ariaLabel, className }: ActionRowProps): React$1.JSX.Element;

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
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
declare function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, destructive, onConfirm, loading, }: ConfirmDialogProps): React$1.JSX.Element;

interface DatePickerProps {
    value?: Date;
    onValueChange: (date: Date | undefined) => void;
    placeholder: string;
    /** Date format for display, from date-fns. */
    displayFormat?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
}
/** Single date picker on react-day-picker. Replaces antd DatePicker. */
declare function DatePicker({ value, onValueChange, placeholder, displayFormat, disabled, id, className }: DatePickerProps): React$1.JSX.Element;
interface DateRangePickerProps {
    value?: DateRange;
    onValueChange: (range: DateRange | undefined) => void;
    placeholder: string;
    displayFormat?: string;
    disabled?: boolean;
    className?: string;
}
/** Date range picker. Replaces the antd RangePicker use in filters. */
declare function DateRangePicker({ value, onValueChange, placeholder, displayFormat, disabled, className }: DateRangePickerProps): React$1.JSX.Element;
interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    /** Text shown in the drop area. Translated by the app. */
    label: string;
    /** Hint under the label, e.g. accepted types and max size. */
    hint?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    className?: string;
}
/** Click-or-drop file area. Validation and upload stay in the app. */
declare function FileUpload({ onFilesSelected, label, hint, accept, multiple, disabled, className }: FileUploadProps): React$1.JSX.Element;
interface StepWizardProps {
    steps: {
        id: string;
        label: string;
    }[];
    /** Index of the active step, 0-based. */
    current: number;
    /** Prefix for the step count, e.g. "Step". Translated by the app. */
    stepLabel: string;
    children: React$1.ReactNode;
    className?: string;
}
/** Step indicator for multi-step forms. Navigation buttons stay in the app. */
declare function StepWizard({ steps, current, stepLabel, children, className }: StepWizardProps): React$1.JSX.Element;

interface SidebarNavItem {
    id: string;
    label: string;
    icon?: React$1.ReactNode;
    /** Target path or URL. Apps decide routing; the library only renders. */
    href?: string;
    active?: boolean;
    /** Nested items. The group opens when any child is active. */
    children?: SidebarNavItem[];
    /** Hide the item for users without permission. Apps compute this. */
    hidden?: boolean;
    /** Controlled expansion for a group. Omit to let the group manage its own state. */
    expanded?: boolean;
    /** Called with the next expanded value when a group is toggled. */
    onExpandedChange?: (expanded: boolean) => void;
    /** Count shown as a red pill on the right. Hidden when 0 or missing. */
    badge?: number;
    /** Runs on click, for example to switch a tab. Works with or without href. */
    onSelect?: () => void;
}
/** A labelled group of nav items, e.g. a tier or module area. */
interface SidebarSection {
    id: string;
    label: string;
    items: SidebarNavItem[];
}
interface SidebarProps {
    /** Brand block at the top, e.g. logo and product name. */
    brand?: React$1.ReactNode;
    /** Flat list of items. Ignored when `sections` is given. */
    items?: SidebarNavItem[];
    /** Labelled groups. Each label is shown above its items. */
    sections?: SidebarSection[];
    /** Footer block, for example the logout button. */
    footer?: React$1.ReactNode;
    /** Collapsed to icons only. */
    collapsed?: boolean;
    /**
     * Renders a link. Keeps the library router-agnostic.
     * Default renders a plain anchor. Apps pass next/link or react-router Link.
     */
    renderLink?: (props: LinkProps) => React$1.ReactNode;
    /** Accessible name for the nav landmark. Translated by the app. */
    label: string;
    className?: string;
}
interface LinkProps {
    href: string;
    className: string;
    children: React$1.ReactNode;
    onClick?: () => void;
    "aria-current"?: "page";
}
/** Dark navy sidebar. Nested groups expand inline. Active item is highlighted. */
declare function Sidebar({ brand, items, sections, footer, collapsed, renderLink, label, className }: SidebarProps): React$1.JSX.Element;

interface TopbarProps {
    /** Left side: menu button on mobile, breadcrumb or title. */
    leading?: React$1.ReactNode;
    /** Right side: search, notifications, user menu. */
    trailing?: React$1.ReactNode;
    className?: string;
}
/** Top bar, 56px tall, dark navy to match the sidebar. */
declare function Topbar({ leading, trailing, className }: TopbarProps): React$1.JSX.Element;
interface AppShellProps {
    sidebar: Omit<SidebarProps, "className">;
    topbar?: React$1.ReactNode;
    /** Label on the mobile menu button. Translated by the app. */
    menuLabel: string;
    children: React$1.ReactNode;
    className?: string;
}
/**
 * Full app layout: fixed sidebar on desktop, drawer on mobile, topbar, scrolling content.
 * Routes and data stay in the app; this only places the chrome.
 */
declare function AppShell({ sidebar, topbar, menuLabel, children, className }: AppShellProps): React$1.JSX.Element;
interface PageContainerProps {
    children: React$1.ReactNode;
    /** Max width for the content column. */
    width?: "md" | "lg" | "xl" | "full";
    className?: string;
}
/** Content column with consistent max width and gap between page sections (24px). */
declare function PageContainer({ children, width, className }: PageContainerProps): React$1.JSX.Element;
interface AuthLayoutProps {
    /** Brand block shown above the form. */
    brand?: React$1.ReactNode;
    children: React$1.ReactNode;
    className?: string;
}
/** Centered card layout for login, sign-up, password reset and invitation pages. */
declare function AuthLayout({ brand, children, className }: AuthLayoutProps): React$1.JSX.Element;
interface SettingsLayoutProps {
    /** Side list of settings sections. */
    nav: React$1.ReactNode;
    children: React$1.ReactNode;
    className?: string;
}
/** Two-column settings page: section list on the left, form on the right. Stacks on mobile. */
declare function SettingsLayout({ nav, children, className }: SettingsLayoutProps): React$1.JSX.Element;

/** Merge class names, resolving Tailwind conflicts. Use for every component. */
declare function cn(...inputs: ClassValue[]): string;

export { ActionRow, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AppShell, AuthLayout, Avatar, Badge, Breadcrumb, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, ConfirmDialog, DataTable, DatePicker, DateRangePicker, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Ellipsis, EmptyState, ErrorState, Field, FileUpload, FilterBar, FormSection, IconButton, Input, NoticeBanner, PageContainer, PageHeader, Pagination, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProgressCard, RadioGroup, RadioGroupItem, SearchInput, SectionCard, SegmentedControl, Select, Separator, SettingsLayout, Sheet, SheetClose, SheetContent, SheetTrigger, Sidebar, Skeleton, Spinner, StatCard, StatusBadge, StepWizard, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, Timeline, Toaster, Tooltip, TooltipProvider, Topbar, TopbarSearch, UserMenu, badgeVariants, buttonVariants, cn, textVariants };
export type { ActionRowProps, AppShellProps, AuthLayoutProps, AvatarProps, BadgeProps, BreadcrumbItem, BreadcrumbProps, ButtonProps, CardProps, CheckboxProps, ConfirmDialogProps, DataTableLabels, DataTableProps, DatePickerProps, DateRangePickerProps, DropdownMenuItemProps, EmptyStateProps, ErrorStateProps, FieldProps, FileUploadProps, FilterBarProps, IconButtonProps, InputProps, LinkProps, NoticeBannerProps, PageContainerProps, PageHeaderProps, PaginationProps, ProgressCardProps, ProgressProps, ProgressRow, ProgressTone, SearchInputProps, SectionCardProps, SegmentedControlProps, SegmentedOption, SelectOption, SelectProps, SettingsLayoutProps, SheetContentProps, SidebarNavItem, SidebarProps, SidebarSection, SpinnerProps, StatCardProps, StatTone, StatusBadgeProps, StatusTone, StepWizardProps, SwitchProps, TextProps, TextareaProps, TimelineItem, TooltipProps, TopbarProps, TopbarSearchProps, UserMenuProps };
