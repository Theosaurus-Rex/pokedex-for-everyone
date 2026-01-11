import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";
import type { ReactNode } from "react";

describe("FavoritesContext", () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    vi.mocked(localStorage.setItem).mockClear();
    vi.mocked(localStorage.clear).mockClear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <FavoritesProvider>{children}</FavoritesProvider>
  );

  describe("useFavorites", () => {
    it("throws error when used outside provider", () => {
      expect(() => {
        renderHook(() => useFavorites());
      }).toThrow("useFavorites must be used within a FavoritesProvider");
    });

    it("initializes with empty favorites", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.favorites).toEqual([]);
    });

    it("initializes with stored favorites from localStorage", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([25, 1]));

      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.favorites).toEqual([25, 1]);
    });

    it("toggleFavorite adds pokemon to favorites", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(25);
      });

      expect(result.current.favorites).toContain(25);
    });

    it("toggleFavorite removes pokemon from favorites", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([25]));

      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(25);
      });

      expect(result.current.favorites).not.toContain(25);
    });

    it("isFavorite returns true for favorited pokemon", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([25]));

      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite(25)).toBe(true);
      expect(result.current.isFavorite(1)).toBe(false);
    });

    it("persists favorites to localStorage", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(25);
      });

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "pokemon-favorites",
        JSON.stringify([25]),
      );
    });

    it("can add multiple favorites", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.toggleFavorite(25);
      });
      act(() => {
        result.current.toggleFavorite(1);
      });

      expect(result.current.favorites).toContain(25);
      expect(result.current.favorites).toContain(1);
      expect(result.current.favorites).toHaveLength(2);
    });
  });
});
