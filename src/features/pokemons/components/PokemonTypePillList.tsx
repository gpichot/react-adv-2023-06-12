import classnames from "classnames";

import { PokemonType } from "../types";

import styles from "./PokemonTypePillList.module.scss";

export interface PokemonTypePillListProps
  extends React.ComponentPropsWithoutRef<"div"> {
  types: PokemonType[];
}

const pokemonTypeColors: Record<PokemonType, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const pokemonTypeEmoji: Record<PokemonType, string> = {
  normal: "🟦",
  fire: "🔥",
  water: "💧",
  electric: "⚡",
  grass: "🍃",
  ice: "❄️",
  fighting: "👊",
  poison: "☠️",
  ground: "🌍",
  flying: "🦅",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  fairy: "🧚",
};

export default function PokemonTypePillList(props: PokemonTypePillListProps) {
  const { types, ...divProps } = props;

  return (
    <div {...divProps} className={classnames(styles.list, divProps.className)}>
      {types.map((type) => (
        <span
          key={type}
          style={{
            backgroundColor: `${pokemonTypeColors[type]}88`,
            borderColor: pokemonTypeColors[type],
            borderRadius: 8,
            padding: "4px 8px",
            color: "black",
          }}
        >
          {pokemonTypeEmoji[type]}
          &nbsp;
          {type}
        </span>
      ))}
    </div>
  );
}
