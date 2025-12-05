import "./App.css";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <>
      <h1 className="font-orbitron text-4xl font-bold">Pokédex</h1>
      <Pokemon id={32} />
    </>
  );
}

export default App;
