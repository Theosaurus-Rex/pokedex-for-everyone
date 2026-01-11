import { describe, it, expect } from "vitest";
import { server } from "../test/mocks/server";
import { http, HttpResponse } from "msw";
import {
  fetchPokemon,
  fetchPokemonList,
  fetchPokemonByType,
} from "./pokemonService";

describe("fetchPokemon", () => {
  it("fetches and returns pokemon data by name", async () => {
    const pokemon = await fetchPokemon("pikachu");

    expect(pokemon).toBeDefined();
    expect(pokemon.name).toBe("pikachu");
    expect(pokemon.id).toBe(25);
    expect(pokemon.types).toHaveLength(1);
    expect(pokemon.types[0].type.name).toBe("electric");
  });

  it("fetches pokemon by ID", async () => {
    const pokemon = await fetchPokemon(1);

    expect(pokemon.name).toBe("bulbasaur");
    expect(pokemon.id).toBe(1);
  });

  it("throws error for non-existent pokemon", async () => {
    server.use(
      http.get(
        "https://pokeapi.co/api/v2/pokemon/:id",
        () => new HttpResponse(null, { status: 404 }),
      ),
    );

    await expect(fetchPokemon("nonexistent")).rejects.toThrow(
      "Failed to fetch Pokemon",
    );
  });
});

describe("fetchPokemonList", () => {
  it("fetches pokemon list with default pagination", async () => {
    const result = await fetchPokemonList(0, 20);

    expect(result).toBeDefined();
    expect(result.results).toBeInstanceOf(Array);
    expect(result.count).toBeGreaterThan(0);
  });

  it("returns correct pagination info", async () => {
    const result = await fetchPokemonList(0, 2);

    expect(result.results.length).toBeLessThanOrEqual(2);
    expect(result.count).toBe(5); // From mock data
  });
});

describe("fetchPokemonByType", () => {
  it("fetches pokemon filtered by type", async () => {
    const result = await fetchPokemonByType("electric");

    expect(result).toBeInstanceOf(Array);
    expect(result.some((p) => p.name === "pikachu")).toBe(true);
  });

  it("returns empty array for type with no pokemon", async () => {
    const result = await fetchPokemonByType("unknown-type");

    expect(result).toEqual([]);
  });
});
