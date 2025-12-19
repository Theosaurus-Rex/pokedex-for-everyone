import type { Pokemon } from "../services/pokemonService";

type LoadingState = {
  status: "loading";
};

type ErrorState = {
  status: "error";
  error: string;
};

type SuccessState = {
  status: "success";
  pokemon: Pokemon[];
  totalCount: number;
};

export type PokemonListState = LoadingState | ErrorState | SuccessState;
