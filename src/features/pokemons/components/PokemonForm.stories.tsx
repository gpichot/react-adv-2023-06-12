import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

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
  play: async (context) => {
    const screen = within(context.canvasElement);

    const name = screen.getByLabelText("Name");
    const type = screen.getByLabelText("Type");
    const weight = screen.getByLabelText("Weight");
    const height = screen.getByLabelText("Height");
    const submit = screen.getByRole("button", { name: /create/i });

    await userEvent.type(name, "Pikachu", { delay: 10 });
    await userEvent.type(type, "Electric", { delay: 10 });
    await userEvent.type(weight, "60", { delay: 10 });
    await userEvent.type(height, "42", { delay: 10 });

    userEvent.click(submit);

    expect(context.args.onSubmit).toHaveBeenCalledWith({
      name: "Pikachu",
      type: "Electric",
      weight: 60,
      height: 42,
    });
  },
};
