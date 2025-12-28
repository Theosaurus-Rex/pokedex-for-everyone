import { Link } from "react-router-dom";
import type { PokemonType } from "../types/pokemon";
import { TypeBadge } from "./TypeBadge";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

type PokemonCardProps = {
  id: number;
  name: string;
  spriteURL: string;
  types: PokemonType[];
};

export function PokemonCard({ id, name, spriteURL, types }: PokemonCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <Link to={`/pokemon/${id}`}>
      <div className="relative bg-white border-2 border-gray-800 rounded-lg p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(id);
          }}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <Heart
            size={24}
            className={
              isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
        <img
          src={spriteURL}
          alt={`${name} front sprite`}
          className="w-24 h-24 mx-auto mb-2"
        />
        <h2 className="capitalize font-bold text-gray-800 my-2">{name}</h2>
        <p className="text-gray-500 text-sm">{`#${id.toString().padStart(3, "0")}`}</p>
        <div className="flex gap-2 justify-center flex-wrap mt-2">
          {types.map((type) => (
            <TypeBadge key={type.type.name} typeName={type.type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
