import React from "react";

import PokemonCard from "./features/pokemons/components/PokemonCard";
import { pokemonListMock } from "./features/pokemons/mock";

import "./globals.scss";
import styles from "./App.module.scss";

type InputControlProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function App() {
  const appProps = {
    style: {
      backgroundColor: "red",
    },
    id: "foo",
  };
  return (
    <div className={styles.app} {...appProps}>
      <div className={styles.pokemonList}>
        {pokemonListMock.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
