import type { Meta, StoryObj } from "@storybook/react";

import { pikachu } from "../mock";
import PokemonCard from "./PokemonCard";

const meta: Meta<typeof PokemonCard> = {
  title: "Pokemons/PokemonCard",
  component: PokemonCard,
};

export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const Pikapika: Story = {
  args: {
    pokemon: pikachu,
  },
};
