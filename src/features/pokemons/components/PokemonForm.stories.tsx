import type { Meta, StoryObj } from "@storybook/react";

import PokemonForm from "./PokemonForm";

const meta: Meta<typeof PokemonForm> = {
  title: "Pokemons/PokemonForm",
  component: PokemonForm,
  argTypes: {
    onSubmit: { action: "submit" },
  },
};

export default meta;

type Story = StoryObj<typeof PokemonForm>;

export const Default: Story = {
  args: {},
};
