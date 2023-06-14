import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import useResponsiveColumns from "../hooks/useResponsiveColumns";
import { pokemonListMock } from "../mock";
import { usePokemonListQuery } from "../query-hooks";
import PokemonCard from "./PokemonCard";

import styles from "./PokemonList.module.scss";

const LIST_LIMIT = 20;

export default function PokemonList() {
  const nbColumns = useResponsiveColumns();
  const [page, setPage] = React.useState(0);
  const pokemonListQuery = usePokemonListQuery({
    offset: page * LIST_LIMIT,
    limit: LIST_LIMIT,
  });

  if (pokemonListQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (pokemonListQuery.isError) {
    return <div>Error</div>;
  }

  const { data: pokemonPage } = pokemonListQuery;

  return (
    <div>
      <button
        disabled={page === 0}
        onClick={() => setPage((prevPage) => prevPage - 1)}
      >
        Previous
      </button>
      <span>
        {pokemonListQuery.isFetching ? (
          "Loading..."
        ) : (
          <span>
            Page {page + 1} of {Math.ceil(pokemonPage.count / LIST_LIMIT)}
          </span>
        )}
      </span>
      <button
        disabled={pokemonPage.nextOffset === null}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>

      <div
        className={styles.pokemonList}
        style={{
          gridTemplateColumns: `repeat(${nbColumns}, 1fr)`,
        }}
      >
        {/* Overlay when loading */}
        {pokemonListQuery.isFetching && (
          <div className={styles.pokemonListOverlay}>Loading...</div>
        )}
        {pokemonPage.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
