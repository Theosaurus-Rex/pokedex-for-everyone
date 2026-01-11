import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TypeFilter } from "./TypeFilter";

describe("TypeFilter", () => {
  it('renders with "All Types" as default option', () => {
    render(<TypeFilter selectedType="" onTypeChange={vi.fn()} />);

    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getByText("All Types")).toBeInTheDocument();
  });

  it("renders all 18 pokemon types", () => {
    render(<TypeFilter selectedType="" onTypeChange={vi.fn()} />);

    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");

    // 18 types + "All Types" option
    expect(options).toHaveLength(19);
  });

  it("displays selected type", () => {
    render(<TypeFilter selectedType="fire" onTypeChange={vi.fn()} />);

    expect(screen.getByRole("combobox")).toHaveValue("fire");
  });

  it("calls onTypeChange when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TypeFilter selectedType="" onTypeChange={handleChange} />);

    await user.selectOptions(screen.getByRole("combobox"), "electric");

    expect(handleChange).toHaveBeenCalledWith("electric");
  });

  it("includes all expected type options", () => {
    render(<TypeFilter selectedType="" onTypeChange={vi.fn()} />);

    const expectedTypes = [
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

    expectedTypes.forEach((type) => {
      expect(screen.getByRole("option", { name: type })).toBeInTheDocument();
    });
  });
});
