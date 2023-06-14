import { useQuery } from "@tanstack/react-query";

import { PokemonDetail } from "./types";

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export function usePokemonDetailQuery(pokemonId: string | number | undefined) {
  return useQuery(
    ["pokemon-details", pokemonId],
    async () => {
      await wait();
      const response = await fetch(
        `https://pokeapi.fly.dev/gpichot/pokemons/${pokemonId}`
      );
      return response.json() as Promise<PokemonDetail>;
    },
    {
      enabled: Boolean(pokemonId),
    }
  );
}
