import type { Pokemon } from "../services/pokemonService";
import { PokemonCard } from "./PokemonCard";

type PokemonGridProps = {
  pokemon: Pokemon[];
};

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="flex flex-col">
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
