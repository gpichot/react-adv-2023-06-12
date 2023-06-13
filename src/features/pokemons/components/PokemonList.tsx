import React from "react";

import useResponsiveColumns from "../hooks/useResponsiveColumns";
import { pokemonListMock } from "../mock";
import PokemonCard from "./PokemonCard";

import styles from "./PokemonList.module.scss";

export default function PokemonList() {
  const nbColumns = useResponsiveColumns();
  return (
    <div
      className={styles.pokemonList}
      style={{
        gridTemplateColumns: `repeat(${nbColumns}, 1fr)`,
      }}
    >
      {pokemonListMock.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
