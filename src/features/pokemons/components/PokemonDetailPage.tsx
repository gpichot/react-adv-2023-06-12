import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { pokemonListMock } from "../mock";
import { usePokemonDetailQuery } from "../query-hooks";
import { PokemonDetail } from "../types";
import PokemonTypePillList from "./PokemonTypePillList";

export default function PokemonDetailPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemonDetailQuery = usePokemonDetailQuery(pokemonId);

  if (pokemonDetailQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (pokemonDetailQuery.isError) {
    return <div>Error</div>;
  }

  const { data: pokemon } = pokemonDetailQuery;

  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <h1>
        {pokemon.name}{" "}
        {pokemonDetailQuery.isFetching && "Rechargement en cours"}
      </h1>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: 200, height: 200 }}
      />
      <PokemonTypePillList types={pokemon.types} />

      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <div>
        {Object.entries(pokemon.stats).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
    </div>
  );
}
