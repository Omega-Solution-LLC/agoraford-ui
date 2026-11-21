import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { DataTable, EmptyState, RowActions, StatusBadge, TablePagination } from "../index";

type Row = { id: string; name: string; status: "open" | "closed"; amount: number };

const rows: Row[] = [
  { id: "1", name: "Harbour lease renewal", status: "open", amount: 12000 },
  { id: "2", name: "Supplier agreement", status: "closed", amount: 4800 },
  { id: "3", name: "Office fit-out", status: "open", amount: 36500 },
];

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        tone={row.original.status === "open" ? "success" : "neutral"}
        label={row.original.status === "open" ? "Open" : "Closed"}
      />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { align: "right" },
    cell: ({ row }) => row.original.amount.toLocaleString("en-US"),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    meta: { sticky: "right", align: "right" },
    cell: () => (
      <RowActions
        moreLabel="More actions"
        actions={[
          { key: "view", label: "View", icon: <Eye />, onClick: () => {} },
          { key: "edit", label: "Edit", icon: <Pencil />, onClick: () => {} },
          { key: "delete", label: "Delete", icon: <Trash2 />, destructive: true, onClick: () => {} },
        ]}
      />
    ),
  },
];

const labels = { empty: "No matters", sortAscending: "Sort ascending", sortDescending: "Sort descending" };

const meta = {
  title: "Patterns/DataTable",
  component: DataTable,
  args: { columns, data: rows, labels },
} satisfies Meta<typeof DataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { loading: true, loadingRows: 3 } };

export const Empty: Story = {
  args: {
    data: [],
    emptyState: <EmptyState title="No matters yet" description="Create a matter to get started." />,
  },
};

export const WithPagination: Story = {
  args: {
    footer: (
      <TablePagination
        page={1}
        pageSize={20}
        total={54}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        labels={{
          showing: (from, to, total) => `Showing ${from} to ${to} of ${total}`,
          perPage: "Rows per page",
          first: "First page",
          previous: "Previous page",
          next: "Next page",
          last: "Last page",
        }}
      />
    ),
  },
};
