import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PokemonDetail } from "./types";

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const baseUrl = "https://pokeapi.fly.dev/gpichot2023-06-12";

export function usePokemonDetailQuery(pokemonId: string | number | undefined) {
  return useQuery(
    ["pokemon-details", pokemonId],
    async () => {
      await wait();
      const response = await fetch(`${baseUrl}/pokemons/${pokemonId}`);
      return response.json() as Promise<PokemonDetail>;
    },
    {
      enabled: Boolean(pokemonId),
    }
  );
}

async function getPokemonList({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  await wait();
  const response = await fetch(
    `${baseUrl}/pokemons?offset=${offset}&limit=${limit}`
  );
  return response.json() as Promise<{
    previousOffset: number | null;
    nextOffset: number | null;
    count: number;
    results: PokemonDetail[];
  }>;
}

export function usePokemonListQuery({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const params = { offset: offset + limit, limit };
    queryClient.prefetchQuery({
      queryKey: ["pokemon-list", params],
      queryFn: () => getPokemonList(params),
    });
  }, [offset, limit, queryClient]);
  return useQuery(
    ["pokemon-list", { offset, limit }],
    async () => {
      return getPokemonList({ offset, limit });
    },
    {
      keepPreviousData: true,
      cacheTime: 60 * 1000,
      notifyOnChangeProps: "all",
    }
  );
}
