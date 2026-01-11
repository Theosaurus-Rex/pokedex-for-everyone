import { http, HttpResponse } from "msw";
import { mockPikachu, mockBulbasaur, mockPokemonList } from "./pokemon-data";

export const handlers = [
  // Get individual Pokemon
  http.get("https://pokeapi.co/api/v2/pokemon/:idOrName", ({ params }) => {
    const { idOrName } = params;
    if (idOrName === "25" || idOrName === "pikachu") {
      return HttpResponse.json(mockPikachu);
    }
    if (idOrName === "1" || idOrName === "bulbasaur") {
      return HttpResponse.json(mockBulbasaur);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Get Pokemon list (paginated)
  http.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") || "20");
    const offset = Number(url.searchParams.get("offset") || "0");

    const results = mockPokemonList.slice(offset, offset + limit);

    return HttpResponse.json({
      count: mockPokemonList.length,
      next:
        offset + limit < mockPokemonList.length
          ? `https://pokeapi.co/api/v2/pokemon?offset=${offset + limit}&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `https://pokeapi.co/api/v2/pokemon?offset=${Math.max(0, offset - limit)}&limit=${limit}`
          : null,
      results,
    });
  }),

  // Get Pokemon by type
  http.get("https://pokeapi.co/api/v2/type/:type", ({ params }) => {
    const { type } = params;
    if (type === "electric") {
      return HttpResponse.json({
        pokemon: [
          {
            pokemon: {
              name: "pikachu",
              url: "https://pokeapi.co/api/v2/pokemon/25/",
            },
            slot: 1,
          },
        ],
      });
    }
    if (type === "grass") {
      return HttpResponse.json({
        pokemon: [
          {
            pokemon: {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
            slot: 1,
          },
        ],
      });
    }
    return HttpResponse.json({ pokemon: [] });
  }),
];
