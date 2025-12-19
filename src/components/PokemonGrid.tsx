import type { Pokemon } from "../services/pokemonService";
import { PokemonCard } from "./PokemonCard";

type PokemonGridProps = {
  pokemon: Pokemon[];
};

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 w-full max-w-6xl mx-auto my-8">
      {pokemon.map(
        ({ id, name, sprites: { front_default: spriteURL }, types }) => {
          return (
            <PokemonCard
              key={id}
              id={id}
              name={name}
              spriteURL={spriteURL}
              types={types}
            />
          );
        },
      )}
    </div>
  );
}
