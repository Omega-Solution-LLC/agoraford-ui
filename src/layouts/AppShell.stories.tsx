import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell, Breadcrumb, Button, PageHeader, Separator } from "../index";

const meta = {
  title: "Layouts/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuLabel: "Open menu",
    sidebar: {
      label: "Main navigation",
      brand: <span className="text-control font-semibold text-sidebar-item">Product</span>,
      sections: [
        {
          id: "work",
          label: "Work",
          items: [
            { id: "home", label: "Dashboard", href: "/" },
            { id: "matters", label: "Matters", href: "/matters", active: true },
          ],
        },
      ],
    },
    breadcrumb: (
      <Breadcrumb
        label="Breadcrumb"
        items={[{ label: "Dashboard", href: "/" }, { label: "Matters" }]}
        backAction={{ label: "Back to Dashboard", href: "/" }}
      />
    ),
    children: (
      <div className="flex flex-col gap-4">
        <PageHeader title="Matters" subtitle="Open and closed matters." actions={<Button>New matter</Button>} />
        <Separator />
        <p className="text-body text-muted-foreground">Page content goes here.</p>
      </div>
    ),
  },
};
