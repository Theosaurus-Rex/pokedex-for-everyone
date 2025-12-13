import { useEffect, useState } from "react";
import {
  fetchPokemon,
  fetchPokemonList,
  type Pokemon,
} from "../services/pokemonService";

export function usePokemonList() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Pokemon Data state
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  const goToNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    async function loadPokemon() {
      setIsLoading(true);
      setError(null);

      try {
        const listData = await fetchPokemonList(offset, itemsPerPage);
        setTotalCount(listData.count);

        const pokemonPromises = listData.results.map((p) => {
          return fetchPokemon(p.name);
        });

        const pokemonDetails = await Promise.all(pokemonPromises);

        setPokemon(pokemonDetails);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemon();
  }, [offset]);

  return {
    pokemon,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
}
