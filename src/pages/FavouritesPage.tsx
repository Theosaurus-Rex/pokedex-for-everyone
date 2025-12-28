import { useQueries } from "@tanstack/react-query";
import { fetchPokemon } from "../services/pokemonService";
import { Loader } from "../components/Loader";
import { PokemonGrid } from "../components/PokemonGrid";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useFavorites();

  // Fetch all favourited Pokemon in parallel
  const pokemonQueries = useQueries({
    queries: favorites.map((id) => ({
      queryKey: ["pokemon", id],
      queryFn: () => fetchPokemon(id),
    })),
  });

  const isLoading = pokemonQueries.some((query) => query.isLoading);
  const pokemonList = pokemonQueries
    .filter((query) => query.data)
    .map((query) => query.data!);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <header className="bg-red-600 text-white p-4 text-center rounded-lg border-2 border-gray-800 w-full max-w-6xl mb-6">
        <h1 className="font-orbitron text-4xl font-bold uppercase">
          Favorites
        </h1>
      </header>

      {isLoading && <Loader />}

      {!isLoading && favorites.length === 0 && (
        <p className="text-gray-500 text-lg">No favorites yet!</p>
      )}

      {!isLoading && pokemonList.length > 0 && (
        <PokemonGrid pokemon={pokemonList} />
      )}
    </div>
  );
}

export default FavoritesPage;
