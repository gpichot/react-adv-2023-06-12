import PokemonCard from "./features/pokemons/components/PokemonCard";
import { pokemonListMock } from "./features/pokemons/mock";

import "./globals.scss";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.pokemonList}>
        {pokemonListMock.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
