import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, StatusBadge } from "../index";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: { children: "Label" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="brand">Brand</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="info">Info</Badge>
    </div>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="success" label="Open" />
      <StatusBadge tone="warning" label="Action required" />
      <StatusBadge tone="danger" label="Overdue" />
      <StatusBadge tone="neutral" label="Closed" />
    </div>
  ),
};
