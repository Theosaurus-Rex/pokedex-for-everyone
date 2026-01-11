import { describe, it, expect } from "vitest";
import {
  formatPokemonId,
  formatName,
  calculateStatPercentage,
  matchesSearchTerm,
  MAX_BASE_STAT,
} from "./pokemon";

describe("formatPokemonId", () => {
  it("pads single digit IDs with two leading zeros", () => {
    expect(formatPokemonId(1)).toBe("001");
    expect(formatPokemonId(9)).toBe("009");
  });

  it("pads double digit IDs with one leading zero", () => {
    expect(formatPokemonId(10)).toBe("010");
    expect(formatPokemonId(25)).toBe("025");
    expect(formatPokemonId(99)).toBe("099");
  });

  it("does not pad triple digit IDs", () => {
    expect(formatPokemonId(100)).toBe("100");
    expect(formatPokemonId(151)).toBe("151");
    expect(formatPokemonId(999)).toBe("999");
  });

  it("handles IDs larger than 999", () => {
    expect(formatPokemonId(1000)).toBe("1000");
  });
});

describe("formatName", () => {
  it("replaces hyphens with spaces", () => {
    expect(formatName("special-attack")).toBe("special attack");
    expect(formatName("mr-mime")).toBe("mr mime");
  });

  it("handles multiple hyphens", () => {
    expect(formatName("tapu-koko-totem")).toBe("tapu koko totem");
  });

  it("returns unchanged string when no hyphens", () => {
    expect(formatName("pikachu")).toBe("pikachu");
  });

  it("handles empty string", () => {
    expect(formatName("")).toBe("");
  });
});

describe("calculateStatPercentage", () => {
  it("calculates 0% for stat value of 0", () => {
    expect(calculateStatPercentage(0)).toBe(0);
  });

  it("calculates 100% for max stat value", () => {
    expect(calculateStatPercentage(MAX_BASE_STAT)).toBe(100);
  });

  it("calculates correct percentage for typical stat values", () => {
    expect(calculateStatPercentage(127.5)).toBeCloseTo(50);
    expect(calculateStatPercentage(55)).toBeCloseTo(21.57, 1);
  });
});

describe("matchesSearchTerm", () => {
  it("returns true for exact match", () => {
    expect(matchesSearchTerm("pikachu", "pikachu")).toBe(true);
  });

  it("returns true for partial match", () => {
    expect(matchesSearchTerm("pikachu", "pika")).toBe(true);
    expect(matchesSearchTerm("pikachu", "chu")).toBe(true);
  });

  it("is case insensitive", () => {
    expect(matchesSearchTerm("Pikachu", "pikachu")).toBe(true);
    expect(matchesSearchTerm("pikachu", "PIKA")).toBe(true);
    expect(matchesSearchTerm("BULBASAUR", "bulba")).toBe(true);
  });

  it("returns false for non-matching terms", () => {
    expect(matchesSearchTerm("pikachu", "bulba")).toBe(false);
    expect(matchesSearchTerm("pikachu", "xyz")).toBe(false);
  });

  it("handles empty search term", () => {
    expect(matchesSearchTerm("pikachu", "")).toBe(true);
  });
});
