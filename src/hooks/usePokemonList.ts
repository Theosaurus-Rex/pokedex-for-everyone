import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllPokemonNames,
  fetchPokemon,
  fetchPokemonList,
} from "../services/pokemonService";
import type { PokemonListState } from "../types/pokemon";

export function usePokemonList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 20;

  const offset = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list", currentPage, searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        const names = await fetchAllPokemonNames();
        const filteredNames = names?.filter((name) =>
          name.name.toLowerCase().includes(searchTerm),
        );

        const currentPageNames = filteredNames?.slice(
          offset,
          offset + itemsPerPage,
        );

        const pokemonPromises = currentPageNames?.map((p) => {
          return fetchPokemon(p.name);
        });

        const pokemonDetails = await Promise.all(pokemonPromises ?? []);

        return {
          pokemon: pokemonDetails,
          totalCount: filteredNames?.length ?? 0,
        };
      } else {
        const listData = await fetchPokemonList(offset, itemsPerPage);

        const pokemonPromises = listData.results.map((p) => {
          return fetchPokemon(p.name);
        });

        const pokemonDetails = await Promise.all(pokemonPromises);

        return { pokemon: pokemonDetails, totalCount: listData.count };
      }
    },
  });

  const state: PokemonListState = (() => {
    if (isLoading) {
      return { status: "loading" };
    }

    if (error) {
      return {
        status: "error",
        error: error.message,
      };
    }

    return {
      status: "success",
      pokemon: data?.pokemon ?? [],
      totalCount: data?.totalCount ?? 0,
    };
  })();

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    state,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    searchTerm,
    setSearchTerm: handleSearch,
  };
}
