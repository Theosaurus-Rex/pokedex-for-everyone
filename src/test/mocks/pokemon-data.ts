import type { Pokemon } from "../../types/pokemon";

export const mockPikachu: Pokemon = {
  id: 25,
  name: "pikachu",
  sprites: { front_default: "https://example.com/pikachu.png" },
  types: [{ slot: 1, type: { name: "electric", url: "" } }],
  stats: [
    { base_stat: 35, stat: { name: "hp" } },
    { base_stat: 55, stat: { name: "attack" } },
    { base_stat: 40, stat: { name: "defense" } },
    { base_stat: 50, stat: { name: "special-attack" } },
    { base_stat: 50, stat: { name: "special-defense" } },
    { base_stat: 90, stat: { name: "speed" } },
  ],
  abilities: [
    { ability: { name: "static" }, is_hidden: false },
    { ability: { name: "lightning-rod" }, is_hidden: true },
  ],
};

export const mockBulbasaur: Pokemon = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "https://example.com/bulbasaur.png" },
  types: [
    { slot: 1, type: { name: "grass", url: "" } },
    { slot: 2, type: { name: "poison", url: "" } },
  ],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
  abilities: [
    { ability: { name: "overgrow" }, is_hidden: false },
    { ability: { name: "chlorophyll" }, is_hidden: true },
  ],
};

export const mockPokemonList = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
];
