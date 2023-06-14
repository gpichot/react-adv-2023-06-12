import React from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";

import { usePokedexContext } from "./features/pokedex";
import PokemonDetailPage from "./features/pokemons/components/PokemonDetailPage";
import PokemonForm from "./features/pokemons/components/PokemonForm";
import PokemonList from "./features/pokemons/components/PokemonList";

import "./globals.scss";
import styles from "./App.module.scss";

function Root() {
  const pokedex = usePokedexContext();
  return (
    <div className={styles.app}>
      <h1>Pokedex App</h1>
      {pokedex.count > 0 ? (
        <p>You have captured {pokedex.count} pokemons so far! Good job 🤩</p>
      ) : (
        <p>You haven&apos;t captured any pokemon yet 😢</p>
      )}
      <div style={{ display: "flex", flexFlow: "row nowrap", gap: 8 }}>
        <Link to="/">Home</Link>
        <Link to="/pokemons/new">New Pokemon</Link>
      </div>
      <Outlet />
    </div>
  );
}

function UserAccountPage() {
  const { username } = useParams<{
    username: string;
  }>();

  return <h1>Hello {username}</h1>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <>404 not found</>,
    children: [
      {
        path: "/",
        element: <PokemonList />,
      },
      {
        path: "/pokemons/:pokemonId",
        element: <PokemonDetailPage />,
      },
      {
        path: "/user/:username",
        element: <UserAccountPage />,
      },
      {
        path: "/pokemons/new",
        element: <PokemonForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
