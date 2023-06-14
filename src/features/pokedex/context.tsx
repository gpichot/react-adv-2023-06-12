import React from "react";

import { PokemonDetail } from "../pokemons/types";

type PokemonID = PokemonDetail["id"];

type PokedexContextType = {
  pokemonIds: PokemonID[];
  addPokemon: (id: PokemonID) => void;
  removePokemon: (id: PokemonID) => void;
};

const PokedexContext = React.createContext<PokedexContextType | undefined>(
  undefined
);

function useStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = React.useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

export function PokedexProvider({ children }: { children: React.ReactNode }) {
  const [pokemonIds, setPokemonIds] = useStorageState<PokemonID[]>(
    "pokemonIds",
    []
  );

  const addPokemon = React.useCallback(
    (id: PokemonID) => {
      setPokemonIds((ids) => [...ids, id]);
    },
    [setPokemonIds]
  );

  const removePokemon = React.useCallback(
    (id: PokemonID) => {
      setPokemonIds((ids) => ids.filter((i) => i !== id));
    },
    [setPokemonIds]
  );

  const value = React.useMemo(
    () => ({ pokemonIds, addPokemon, removePokemon }),
    [pokemonIds, addPokemon, removePokemon]
  );

  return (
    <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>
  );
}

export function usePokedexContext() {
  const context = React.useContext(PokedexContext);
  if (context === undefined) {
    throw new Error("usePokedexContext must be used within a PokedexProvider");
  }
  return {
    ...context,
    isCaptured: (id: PokemonID) => context.pokemonIds.includes(id),
    count: context.pokemonIds.length,
  };
}
