import { useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import { Loader } from "../components/Loader";

function PokemonDetail() {
  const { id } = useParams<{ id: string }>();

  const { pokemon, isLoading, error } = usePokemon(id);
  return (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      {error && <p>An error occurred: {error}</p>}
      {pokemon && (
        <>
          <img src={pokemon.sprites.front_default} /> <p>{pokemon.name}</p>
        </>
      )}
    </div>
  );
}

export default PokemonDetail;
