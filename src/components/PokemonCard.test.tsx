import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test/test-utils";
import { PokemonCard } from "./PokemonCard";

describe("PokemonCard", () => {
  const defaultProps = {
    id: 25,
    name: "pikachu",
    spriteURL: "https://example.com/pikachu.png",
    types: [{ slot: 1, type: { name: "electric", url: "" } }],
  };

  beforeEach(() => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    vi.mocked(localStorage.setItem).mockClear();
  });

  it("renders pokemon name", () => {
    render(<PokemonCard {...defaultProps} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("renders formatted pokemon ID", () => {
    render(<PokemonCard {...defaultProps} />);

    expect(screen.getByText("#025")).toBeInTheDocument();
  });

  it("renders pokemon sprite", () => {
    render(<PokemonCard {...defaultProps} />);

    const img = screen.getByRole("img", { name: /pikachu front sprite/i });
    expect(img).toHaveAttribute("src", defaultProps.spriteURL);
  });

  it("renders type badges", () => {
    render(<PokemonCard {...defaultProps} />);

    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("renders multiple type badges", () => {
    const props = {
      ...defaultProps,
      id: 1,
      name: "bulbasaur",
      types: [
        { slot: 1, type: { name: "grass", url: "" } },
        { slot: 2, type: { name: "poison", url: "" } },
      ],
    };

    render(<PokemonCard {...props} />);

    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("links to pokemon detail page", () => {
    render(<PokemonCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/25");
  });

  it("toggles favorite when heart button is clicked", async () => {
    const user = userEvent.setup();
    render(<PokemonCard {...defaultProps} />);

    const heartButton = screen.getByRole("button");
    await user.click(heartButton);

    // After clicking, localStorage should be updated
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("renders with single digit ID padded correctly", () => {
    const props = {
      ...defaultProps,
      id: 1,
      name: "bulbasaur",
    };

    render(<PokemonCard {...props} />);

    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("renders with three digit ID correctly", () => {
    const props = {
      ...defaultProps,
      id: 150,
      name: "mewtwo",
    };

    render(<PokemonCard {...props} />);

    expect(screen.getByText("#150")).toBeInTheDocument();
  });
});
