import "./App.css";
import { Loader } from "./components/Loader";
import { PokemonGrid } from "./components/PokemonGrid";
import { usePokemonList } from "./hooks/usePokemonList";

function App() {
  const {
    pokemon,
    isLoading,
    error,
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
      {isLoading && <Loader />}
      {error && <p>Something went wrong: {error}</p>}
      <input
        type="search"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!isLoading && !error && <PokemonGrid pokemon={pokemon} />}
      <div className="flex space-x-4">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;
