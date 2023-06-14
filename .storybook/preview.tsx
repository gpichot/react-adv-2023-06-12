import { PokedexProvider } from "@/features/pokedex/context";
import type { Preview } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <PokedexProvider>
          <Story />
        </PokedexProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
