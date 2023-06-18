import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, Mock, vi } from "vitest";

import { PokedexProvider, usePokedexContext } from "@/features/pokedex";
import { render, screen } from "@/test-utils";

import { pikachu } from "../mock";
import PokemonCard, { PokemonCardProps } from "./PokemonCard";

const context = {
  isCaptured: vi.fn(),
  addPokemon: vi.fn(),
  removePokemon: vi.fn(),
};

vi.mock("@/features/pokedex", async () => ({
  ...(await vi.importActual<typeof import("@/features/pokedex")>(
    "@/features/pokedex"
  )),
  usePokedexContext: vi.fn(),
}));

function renderWrapper(overrides: Partial<PokemonCardProps> = {}) {
  const view = render(<PokemonCard pokemon={pikachu} {...overrides} />);

  return {
    ...view,
    fields: {
      getNameInput: () => screen.getByRole("textbox", { name: /name/i }),
    },
  };
}

describe("PokemonCard", () => {
  beforeAll(() => {
    (usePokedexContext as Mock).mockReturnValue(context);
  });
  it("renders the name and types of the pokemon", () => {
    const { fields } = renderWrapper();

    fields.getNameInput();

    expect(screen.getByText("pikachu")).toBeVisible();
    expect(screen.getByText(/electric/)).toBeVisible();
  });

  it("captures and releases the pokemon", async () => {
    const user = userEvent.setup();
    context.isCaptured.mockReturnValue(false);
    render(<PokemonCard pokemon={pikachu} />);

    await user.click(screen.getByText("Capture"));

    expect(context.addPokemon).toHaveBeenCalledWith(25);
  });

  it("releases the pokemon", async () => {
    const user = userEvent.setup();
    context.isCaptured.mockReturnValue(true);
    render(<PokemonCard pokemon={pikachu} />);

    await user.click(screen.getByText("Release"));

    expect(context.removePokemon).toHaveBeenCalledWith(25);
  });
});
