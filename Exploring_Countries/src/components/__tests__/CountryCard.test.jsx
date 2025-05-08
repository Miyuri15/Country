import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "../CountryCard";

const mockCountry = {
  name: { common: "Germany" },
  population: 83240525,
  region: "Europe",
  capital: ["Berlin"],
  flags: { png: "https://flagcdn.com/w320/de.png" },
};

const renderComponent = () =>
  render(
    <BrowserRouter>
      <CountryCard country={mockCountry} />
    </BrowserRouter>
  );

describe("CountryCard Component", () => {
  test("renders country name", () => {
    renderComponent();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  test("renders population with commas", () => {
    renderComponent();
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName.toLowerCase() === "p" &&
          element.textContent?.includes("Population:") &&
          element.textContent?.includes("83,240,525")
      )
    ).toBeInTheDocument();
  });

  test("renders region", () => {
    renderComponent();
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName.toLowerCase() === "p" &&
          element.textContent?.includes("Region:") &&
          element.textContent?.includes("Europe")
      )
    ).toBeInTheDocument();
  });

  test("renders capital", () => {
    renderComponent();
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName.toLowerCase() === "p" &&
          element.textContent?.includes("Capital:") &&
          element.textContent?.includes("Berlin")
      )
    ).toBeInTheDocument();
  });

  test("renders flag image with correct alt text", () => {
    renderComponent();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockCountry.flags.png);
    expect(img).toHaveAttribute("alt", "Germany");
  });

  test("contains a link to the country detail page", () => {
    renderComponent();
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/country/Germany");
  });
});
