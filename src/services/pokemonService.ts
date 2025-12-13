export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: PokemonType[];
};

const pokemonCache: Record<number | string, Pokemon> = {};

export const fetchPokemon = async (id: number | string): Promise<Pokemon> => {
  if (pokemonCache[id]) {
    return pokemonCache[id];
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${response.status}`);
  }

  const pokemon = await response.json();
  pokemonCache[id] = pokemon;
  return pokemon;
};

type PokemonListResults = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export const fetchPokemonList = async (
  offset: number,
  limit: number,
): Promise<PokemonListResults> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  const pokemonList = await response.json();

  return {
    next: pokemonList.next,
    previous: pokemonList.previous,
    results: pokemonList.results,
    count: pokemonList.count,
  };
};
