import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger, SegmentedControl } from "../index";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Segmented: Story = {
  render: () => (
    <Tabs defaultValue="open">
      <TabsList>
        <TabsTrigger value="open" count={3}>Open</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
      </TabsList>
      <TabsContent value="open">Open matters</TabsContent>
      <TabsContent value="closed">Closed matters</TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Details body</TabsContent>
      <TabsContent value="history">History body</TabsContent>
    </Tabs>
  ),
};

export const SegmentedFilter: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<"all" | "open" | "closed">("all");
    return (
      <SegmentedControl
        label="Status"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "all", label: "All", count: 7 },
          { value: "open", label: "Open", count: 3 },
          { value: "closed", label: "Closed", count: 4 },
        ]}
      />
    );
  },
};
