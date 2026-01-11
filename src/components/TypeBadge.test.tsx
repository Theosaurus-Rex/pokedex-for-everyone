import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TypeBadge } from "./TypeBadge";

describe("TypeBadge", () => {
  it("renders the type name", () => {
    render(<TypeBadge typeName="fire" />);

    expect(screen.getByText("fire")).toBeInTheDocument();
  });

  it("applies correct color class for known types", () => {
    const { container } = render(<TypeBadge typeName="electric" />);

    expect(container.firstChild).toHaveClass("bg-type-electric");
  });

  it("applies fallback color class for unknown types", () => {
    const { container } = render(<TypeBadge typeName="unknown" />);

    expect(container.firstChild).toHaveClass("bg-gray-400");
  });

  it("displays type name in uppercase", () => {
    const { container } = render(<TypeBadge typeName="water" />);

    expect(container.firstChild).toHaveClass("uppercase");
  });

  it("renders all standard pokemon types with correct classes", () => {
    const types = [
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

    types.forEach((type) => {
      const { container } = render(<TypeBadge typeName={type} />);
      expect(container.firstChild).toHaveClass(`bg-type-${type}`);
    });
  });
});
