export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
};

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
