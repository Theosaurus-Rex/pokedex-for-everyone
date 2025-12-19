import "./App.css";
import { Loader } from "./components/Loader";
import { PokemonGrid } from "./components/PokemonGrid";
import { usePokemonList } from "./hooks/usePokemonList";

function App() {
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
    <>
      <h1 className="font-orbitron text-4xl font-bold">Pokédex</h1>

      <input
        type="search"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {state.status === "loading" && <Loader />}

      {state.status === "error" && <p>Something went wrong: {state.error}</p>}

      {state.status === "success" && (
        <>
          <PokemonGrid pokemon={state.pokemon} />
          <div className="flex space-x-4">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
