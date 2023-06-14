import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import InputControl from "@/features/core/components/InputControl";

import {
  PokemonCreatePayload,
  useCreatePokemonMutation,
} from "../mutation-hooks";
import { baseUrl } from "../query-hooks";
import { PokemonDetail } from "../types";

interface PokemonFormProps {
  onSubmit?: (pokemon: PokemonCreatePayload) => void;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function PokemonForm(props: PokemonFormProps) {
  const { onSubmit } = props;
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const createPokemonMutation = useCreatePokemonMutation({
    onSuccess: (pokemon) => {
      //navigate(`/pokemons/${pokemon.id}`);
      // navigate("/pokemons/new");
      formRef.current?.reset();
    },
    onError: () => {
      // pass
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name,
      type,
      weight,
      height,
    };
    onSubmit?.(payload);
    createPokemonMutation.mutate(payload);
  };

  const handleReset = () => {
    setName("");
    setType("");
    setWeight(0);
    setHeight(0);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
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
      <button type="submit" disabled={createPokemonMutation.isLoading}>
        Create
      </button>
    </form>
  );
}
