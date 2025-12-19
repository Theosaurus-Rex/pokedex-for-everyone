import type { PokemonType } from "../services/pokemonService";

const typeColors: Record<string, { bg: string; text: string }> = {
  normal: { bg: "#a8a878", text: "#fff" },
  fire: { bg: "#f08030", text: "#fff" },
  water: { bg: "#6890f0", text: "#fff" },
  electric: { bg: "#f8d030", text: "#2a2a2a" },
  grass: { bg: "#78c850", text: "#fff" },
  ice: { bg: "#98d8d8", text: "#2a2a2a" },
  fighting: { bg: "#c03028", text: "#fff" },
  poison: { bg: "#a040a0", text: "#fff" },
  ground: { bg: "#e0c068", text: "#2a2a2a" },
  flying: { bg: "#a890f0", text: "#fff" },
  psychic: { bg: "#f85888", text: "#fff" },
  bug: { bg: "#a8b820", text: "#fff" },
  rock: { bg: "#b8a038", text: "#fff" },
  ghost: { bg: "#705898", text: "#fff" },
  dragon: { bg: "#7038f8", text: "#fff" },
  dark: { bg: "#705848", text: "#fff" },
  steel: { bg: "#b8b8d0", text: "#2a2a2a" },
  fairy: { bg: "#ee99ac", text: "#2a2a2a" },
};

type PokemonCardProps = {
  id: number;
  name: string;
  spriteURL: string;
  types: PokemonType[];
};

export function PokemonCard({ id, name, spriteURL, types }: PokemonCardProps) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-lg p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <img
        src={spriteURL}
        alt={`${name} front sprite`}
        className="w-24 h-24 mx-auto mb-2"
      />
      <h2 className="capitalize font-bold text-gray-800 my-2">{name}</h2>
      <p className="text-gray-500 text-sm">{`#${id.toString().padStart(3, "0")}`}</p>
      <div className="flex gap-2 justify-center flex-wrap mt-2">
        {types.map((type) => {
          const typeName = type.type.name;
          const colors = typeColors[typeName] ?? { bg: "#888", text: "#fff" };
          return (
            <span
              key={typeName}
              className="px-3 py-1 rounded-md text-xs font-bold uppercase shadow-sm"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {typeName}
            </span>
          );
        })}
      </div>
    </div>
  );
}
