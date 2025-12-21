import { Loader } from "../components/Loader";
import { PokemonGrid } from "../components/PokemonGrid";
import { usePokemonList } from "../hooks/usePokemonList";

function HomePage() {
  const {
    state,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    searchTerm,
    setSearchTerm,
  } = usePokemonList();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <header className="bg-red-600 text-white p-4 text-center rounded-lg border-2 border-gray-800 w-full max-w-6xl mb-6">
        <h1 className="font-orbitron text-4xl font-bold uppercase">Pokédex</h1>
      </header>

      <input
        type="search"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-xl px-4 py-3 text-base border-2 border-gray-800 rounded-lg bg-white mb-6 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all"
      />

      {state.status === "loading" && <Loader />}

      {state.status === "error" && (
        <p className="text-red-600 text-lg">
          Something went wrong: {state.error}
        </p>
      )}

      {state.status === "success" && (
        <>
          <PokemonGrid pokemon={state.pokemon} />
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="bg-red-600 text-white border-2 border-gray-800 rounded-lg px-6 py-3 font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Previous
            </button>
            <p className="text-gray-800 font-bold">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-red-600 text-white border-2 border-gray-800 rounded-lg px-6 py-3 font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
