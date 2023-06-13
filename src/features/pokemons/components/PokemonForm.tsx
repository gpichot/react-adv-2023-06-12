import React from "react";

import InputControl from "@/features/core/components/InputControl";

type PokemonCreatePayload = {
  name: string;
  type: string;
  weight: number;
  height: number;
};

interface PokemonFormProps {
  onSubmit?: (pokemon: PokemonCreatePayload) => void;
}

export default function PokemonForm(props: PokemonFormProps) {
  const { onSubmit } = props;
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name,
      type,
      weight,
      height,
    };
    console.log(payload);
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputControl
        label="Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <InputControl
        label="Type"
        name="type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />
      <InputControl
        label="Weight"
        name="weight"
        type="number"
        value={weight}
        onChange={(event) => setWeight(event.target.valueAsNumber)}
      />
      <InputControl
        label="Height"
        name="height"
        type="number"
        value={height}
        onChange={(event) => setHeight(event.target.valueAsNumber)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
