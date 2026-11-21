import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ConfirmDialog } from "../index";

const meta = {
  title: "Patterns/ConfirmDialog",
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Destructive: StoryObj = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete matter</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete this matter?"
          description="This cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          destructive
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Loading: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: "Revoking access",
    confirmLabel: "Revoke",
    cancelLabel: "Cancel",
    destructive: true,
    loading: true,
    onConfirm: () => {},
  },
};
