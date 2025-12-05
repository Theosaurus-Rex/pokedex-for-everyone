type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<object>;
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
