import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, fetchPokemonList } from "../services/pokemonService";

export function usePokemonList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 20;

  const offset = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list", currentPage, searchTerm],
    queryFn: async () => {
      const listData = await fetchPokemonList(offset, itemsPerPage);

      const pokemonPromises = listData.results.map((p) => {
        return fetchPokemon(p.name);
      });

      const pokemonDetails = await Promise.all(pokemonPromises);

      return { pokemon: pokemonDetails, totalCount: listData.count };
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / itemsPerPage) : 0;

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

  return {
    pokemon: data?.pokemon ?? [],
    isLoading,
    error: error?.message ?? null,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    searchTerm,
    setSearchTerm,
  };
}
