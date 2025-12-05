import { usePokemon } from "../hooks/usePokemon";
import { Loader } from "./Loader";

export function Pokemon({ id }: { id: number | string }) {
  const { pokemon, isLoading, error } = usePokemon(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col">
      <h2>{pokemon?.name}</h2>
      <img
        src={pokemon?.sprites.front_default}
        alt={`${pokemon?.name} front sprite`}
      />
    </div>
  );
}
