const typeColorClass: Record<string, string> = {
  normal: "bg-type-normal",
  fire: "bg-type-fire",
  water: "bg-type-water",
  electric: "bg-type-electric",
  grass: "bg-type-grass",
  ice: "bg-type-ice",
  fighting: "bg-type-fighting",
  poison: "bg-type-poison",
  ground: "bg-type-ground",
  flying: "bg-type-flying",
  psychic: "bg-type-psychic",
  bug: "bg-type-bug",
  rock: "bg-type-rock",
  ghost: "bg-type-ghost",
  dragon: "bg-type-dragon",
  dark: "bg-type-dark",
  steel: "bg-type-steel",
  fairy: "bg-type-fairy",
};

type TypeBadgeProps = {
  typeName: string;
};

export function TypeBadge({ typeName }: TypeBadgeProps) {
  const colorClass = typeColorClass[typeName] ?? "bg-gray-400";

  return (
    <span
      className={`${colorClass} px-3 py-1 rounded-md text-xs font-bold uppercase text-white shadow-sm`}
    >
      {typeName}
    </span>
  );
}
