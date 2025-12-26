type TypeFilterProps = {
  selectedType: string;
  onTypeChange: (type: string) => void;
};

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="w-full max-w-xl px-4 py-3 text-base border-2 border-gray-800 rounded-lg bg-white mb-6 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all"
    >
      <option value="">All Types</option>
      {pokemonTypes.map((type) => {
        return (
          <option key={type} value={type} className="capitalize">
            {type}
          </option>
        );
      })}
    </select>
  );
}
