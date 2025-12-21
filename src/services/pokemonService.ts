import type { Pokemon } from "../types/pokemon";

const pokemonCache: Record<number | string, Pokemon> = {};
let allPokemonNamesCache: Array<{ name: string; url: string }> | null = null;

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

export const fetchAllPokemonNames = async () => {
  if (allPokemonNamesCache) {
    return allPokemonNamesCache;
  }

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500");
  const data = await response.json();
  allPokemonNamesCache = data.results;
  return allPokemonNamesCache;
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

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }

  const pokemonList = await response.json();

  return {
    next: pokemonList.next,
    previous: pokemonList.previous,
    results: pokemonList.results,
    count: pokemonList.count,
  };
};
