import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { PokedexProvider } from "@/features/pokedex";
import { render, screen } from "@/test-utils";

import { pikachu } from "../mock";
import PokemonCard from "./PokemonCard";

describe("PokemonCard", () => {
  it("renders the name and types of the pokemon", () => {
    render(<PokemonCard pokemon={pikachu} />);

    expect(screen.getByText("pikachu")).toBeVisible();
  });
});
