import { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { FavoritesProvider } from "../context/FavoritesContext";

type WrapperProps = {
  children: ReactNode;
};

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
  initialRoute?: string;
};

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { initialRoute = "/", ...renderOptions } = options || {};

  function Wrapper({ children }: WrapperProps) {
    const queryClient = createTestQueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <FavoritesProvider>{children}</FavoritesProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };
