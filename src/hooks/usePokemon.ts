import { useEffect, useState } from "react";
import { fetchPokemon, type Pokemon } from "../services/pokemonService";

export function usePokemon(id: number | string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled: boolean = false;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPokemon(id);
        if (!cancelled) {
          setPokemon(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    // Cleanup also runs when id changes, which lets us know if we need to cancel the previous run
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { pokemon, isLoading: loading, error };
}
