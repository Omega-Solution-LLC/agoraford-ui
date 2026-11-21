import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Input, Select } from "../index";

const meta = {
  title: "Primitives/Field",
  component: Field,
  args: { label: "Owner", children: <Input id="owner" placeholder="Full name" />, htmlFor: "owner" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithHint: Story = { args: { hint: "Shown as a tooltip beside the label", labelRight: "Optional" } };
export const WithError: Story = { args: { error: "Enter an owner name" } };
export const Disabled: Story = { args: { children: <Input id="owner" disabled value="Locked" readOnly /> } };

export const SelectField: Story = {
  render: () => (
    <div className="w-72">
      <Field label="Region" htmlFor="region">
        <Select
          id="region"
          placeholder="Choose a region"
          options={[
            { value: "north", label: "North" },
            { value: "south", label: "South" },
          ]}
        />
      </Field>
    </div>
  ),
};
