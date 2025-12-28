import { useState, useEffect } from "react";

const STORAGE_KEY = "pokemon-favorites";

export function useFavorites() {
  // Lazy initialize the favourites state
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  });

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId: number) => {
    setFavorites((prev) =>
      prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId],
    );
  };

  const isFavorite = (pokemonId: number): boolean => {
    return favorites.includes(pokemonId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
