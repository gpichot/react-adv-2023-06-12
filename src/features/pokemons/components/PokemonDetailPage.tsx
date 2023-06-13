import { useParams } from "react-router-dom";

import { pokemonListMock } from "../mock";
import PokemonTypePillList from "./PokemonTypePillList";

export default function PokemonDetailPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemon = pokemonListMock.find(
    (pokemon) => pokemon.id === Number(pokemonId)
  );

  if (!pokemon) {
    return <h1>Pokemon not found</h1>;
  }

  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <h1>{pokemon.name}</h1>

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
