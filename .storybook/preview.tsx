import { PokedexProvider } from "@/features/pokedex/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Preview } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <PokedexProvider>
            <Story />
          </PokedexProvider>
        </QueryClientProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
