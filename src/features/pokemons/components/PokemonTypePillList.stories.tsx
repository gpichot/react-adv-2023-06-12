import { Meta, StoryObj } from "@storybook/react";

import PokemonTypePillList from "./PokemonTypePillList";

const meta: Meta<typeof PokemonTypePillList> = {
  title: "PokemonTypePillList",
  component: PokemonTypePillList,
  argTypes: {
    onClickType: { action: "onClickType" },
  },
};

export default meta;

type Story = StoryObj<typeof PokemonTypePillList>;

export const Default: Story = {
  args: {
    types: ["electric", "fire"],
  },
};
export const Default2: Story = {
  args: {
    types: ["electric", "fire", "grass"],
  },
};
