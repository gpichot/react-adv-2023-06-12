import React from "react";

import { PokemonDetail } from "@/features/pokemons/types";

export default function useFetchResource<ResponseType>(url: string) {
  const [data, setData] = React.useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
}
/*
const data = useFetchResource<PokemonDetail>(
  "https://pokeapi.fly.dev/gpichot/pokemons/pikachu"
);
void data;

*/
