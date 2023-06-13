import { useState } from "react";
import { Link } from "react-router-dom";

import { PokemonDetail } from "../types";
import PokemonTypePillList from "./PokemonTypePillList";

import styles from "./PokemonCard.module.scss";

export interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.pokemonCard}
      style={{
        backgroundColor: isHovered ? "#E0E0FF" : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={pokemon.image} alt={pokemon.name} height={120} width={120} />
      <span>{pokemon.name}</span>
      <PokemonTypePillList types={pokemon.types} className={styles.typesList} />
      <Link to={`/pokemons/${pokemon.id}`}>View Details</Link>
    </div>
  );
}
