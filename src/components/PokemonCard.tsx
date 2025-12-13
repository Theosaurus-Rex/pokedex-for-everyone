import type { PokemonType } from "../services/pokemonService";

type PokemonCardProps = {
  id: number;
  name: string;
  spriteURL: string;
  types: PokemonType[];
};

export function PokemonCard({ id, name, spriteURL, types }: PokemonCardProps) {
  return (
    <div className="flex flex-col">
      <img src={spriteURL} alt={`${name} front sprite`} />
      <h2>{name}</h2>
      <p>{`#${id.toString().padStart(3, "0")}`}</p>
      {types.map((type) => {
        const typeName = type.type.name;
        return <p key={typeName}>{typeName}</p>;
      })}
    </div>
  );
}
