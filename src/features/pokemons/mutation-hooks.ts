import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { baseUrl } from "./query-hooks";
import { PokemonDetail } from "./types";

type PokemonCreatePayload = {
  name: string;
  type: string;
  weight: number;
  height: number;
};

function useCreatePokemonMutation(
  options: MutationOptions<PokemonDetail, unknown, PokemonCreatePayload>
) {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: PokemonCreatePayload) => {
      const response = await fetch(`${baseUrl}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return response.json() as Promise<PokemonDetail>;
    },
    {
      ...options,
      onSuccess: (pokemon, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["pokemon-list"] });
        //navigate(`/pokemons/${pokemon.id}`);
        // navigate("/pokemons/new");
        options.onSuccess?.(pokemon, variables, context);
      },
    }
  );
}

export { type PokemonCreatePayload, useCreatePokemonMutation };
