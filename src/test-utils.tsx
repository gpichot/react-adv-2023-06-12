import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";

import { PokedexProvider } from "./features/pokedex";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <PokedexProvider>{children}</PokedexProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };
