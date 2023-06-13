import type { Meta, StoryObj } from "@storybook/react";

import InputControl from "./InputControl";

const meta: Meta<typeof InputControl> = {
  title: "Input/InputControl",
  component: InputControl,
  argTypes: {
    onFocus: { action: "focus" },
    onChange: { action: "change" },
    onBlur: { action: "blur" },
  },
};

export default meta;

type Story = StoryObj<typeof InputControl>;

export const Default: Story = {
  args: {
    label: "Name",
    name: "name",
  },
};
