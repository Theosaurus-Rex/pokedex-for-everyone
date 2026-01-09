/**
 * Formats a Pokemon ID to a 3-digit string with leading zeros.
 * @example formatPokemonId(1) returns "001"
 * @example formatPokemonId(25) returns "025"
 */
export function formatPokemonId(id: number): string {
  return id.toString().padStart(3, "0");
}

/**
 * Formats a Pokemon name by replacing hyphens with spaces.
 * @example formatName("special-attack") returns "special attack"
 */
export function formatName(name: string): string {
  return name.replace(/-/g, " ");
}

/**
 * Calculates the percentage of a stat relative to the maximum possible value.
 * Max base stat in Pokemon is 255.
 */
export const MAX_BASE_STAT = 255;

export function calculateStatPercentage(baseStat: number): number {
  return (baseStat / MAX_BASE_STAT) * 100;
}

/**
 * Checks if a Pokemon name matches a search term (case-insensitive).
 */
export function matchesSearchTerm(name: string, searchTerm: string): boolean {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}
