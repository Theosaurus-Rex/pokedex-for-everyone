import { useParams, useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import { Loader } from "../components/Loader";
import { TypeBadge } from "../components/TypeBadge";

function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, isLoading, error } = usePokemon(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p>Pokemon not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 text-white border-2 border-gray-800 rounded-lg px-6 py-3 font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white border-2 border-gray-800 rounded-lg p-8 w-full max-w-3xl">
        {/* Header section */}
        <div className="flex items-center gap-8 border-b-2 border-gray-200 pb-6 mb-6">
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} sprite`}
            className="w-40 h-40"
          />
          <div>
            <h1 className="text-4xl font-bold capitalize text-gray-800 mb-2">
              {pokemon.name}
            </h1>
            <p className="text-xl text-gray-500 mb-4">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name} typeName={type.type.name} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">Base Stats</h2>
          {pokemon.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="grid grid-cols-[120px_1fr_50px] items-center gap-4 mb-3"
            >
              <span className="capitalize font-bold text-gray-800">
                {stat.stat.name.replace("-", " ")}
              </span>
              <div className="bg-gray-200 rounded-full h-5 border-2 border-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-green-500 to-orange-500"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
              <span className="text-right font-bold text-gray-800">
                {stat.base_stat}
              </span>
            </div>
          ))}
        </div>

        {/* Abilities section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">Abilities</h2>
          <ul className="list-none">
            {pokemon.abilities.map((ability) => (
              <li
                key={ability.ability.name}
                className="capitalize py-2 text-gray-800"
              >
                {ability.ability.name.replace("-", " ")}
                {ability.is_hidden && (
                  <span className="ml-2 text-sm text-gray-500">(Hidden)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
