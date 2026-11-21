import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "../index";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Save changes" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
export const Link: Story = { args: { variant: "link" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button>
        <Plus />
        New matter
      </Button>
      <Button variant="danger">
        <Trash2 />
        Delete
      </Button>
      <Button variant="outline">
        <Check />
        Mark done
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
