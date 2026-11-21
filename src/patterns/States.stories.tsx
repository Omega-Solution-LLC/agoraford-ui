import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Users, Wallet } from "lucide-react";
import { Button, EmptyState, ErrorState, PageHeader, Separator, StatCard } from "../index";

const meta = {
  title: "Patterns/States and headers",
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    title: "No documents yet",
    description: "Upload a document to start the review.",
    icon: <FileText />,
    action: <Button>Upload document</Button>,
  },
};

export const Error: StoryObj = {
  render: () => (
    <ErrorState title="Could not load matters" description="Check your connection and try again." onRetry={() => {}} />
  ),
};

export const Header: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Matters"
        subtitle="Open and closed matters for your team."
        actions={<Button>New matter</Button>}
      />
      <Separator />
      <p className="text-body text-muted-foreground">Page content</p>
    </div>
  ),
};

export const KpiStrip: StoryObj = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard tone="brand" label="Open matters" value="24" hint="Updated today" icon={<FileText />} />
      <StatCard tone="success" label="Closed this month" value="9" progress={60} icon={<Users />} />
      <StatCard tone="warning" label="Pending spend" value="$18,400" icon={<Wallet />} />
    </div>
  ),
};
