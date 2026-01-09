import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllPokemonNames,
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemonList,
} from "../services/pokemonService";
import type { PokemonListState } from "../types/pokemon";
import { matchesSearchTerm } from "../utils/pokemon";

type PokemonNameEntry = { name: string; url: string };

async function fetchPokemonDetailsForPage(
  pokemonNames: PokemonNameEntry[],
  offset: number,
  limit: number,
) {
  const pageNames = pokemonNames.slice(offset, offset + limit);
  const pokemonPromises = pageNames.map((p) => fetchPokemon(p.name));
  return Promise.all(pokemonPromises);
}

export function usePokemonList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const itemsPerPage = 20;

  const offset = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list", currentPage, searchTerm, selectedType],
    queryFn: async () => {
      // Case 1: Both search and type filter
      if (searchTerm && selectedType) {
        const typeResults = await fetchPokemonByType(selectedType);
        const filteredByName = typeResults.filter((p) =>
          matchesSearchTerm(p.name, searchTerm),
        );
        const pokemonDetails = await fetchPokemonDetailsForPage(
          filteredByName,
          offset,
          itemsPerPage,
        );

        return {
          pokemon: pokemonDetails,
          totalCount: filteredByName.length,
        };
      }

      // Case 2: Search only (no type filter)
      if (searchTerm) {
        const names = await fetchAllPokemonNames();
        const filteredNames =
          names?.filter((p) => matchesSearchTerm(p.name, searchTerm)) ?? [];
        const pokemonDetails = await fetchPokemonDetailsForPage(
          filteredNames,
          offset,
          itemsPerPage,
        );

        return {
          pokemon: pokemonDetails,
          totalCount: filteredNames.length,
        };
      }

      // Case 3: Type filter only (no search)
      if (selectedType) {
        const typeResults = await fetchPokemonByType(selectedType);
        const pokemonDetails = await fetchPokemonDetailsForPage(
          typeResults,
          offset,
          itemsPerPage,
        );

        return {
          pokemon: pokemonDetails,
          totalCount: typeResults.length,
        };
      }

      // Case 4: No filters - normal pagination
      const listData = await fetchPokemonList(offset, itemsPerPage);
      const pokemonDetails = await fetchPokemonDetailsForPage(
        listData.results,
        0,
        itemsPerPage,
      );

      return {
        pokemon: pokemonDetails,
        totalCount: listData.count,
      };
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

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
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
    selectedType,
    setSelectedType: handleTypeChange,
  };
}
