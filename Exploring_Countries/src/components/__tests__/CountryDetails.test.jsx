import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryDetails from "../CountryDetails";

const mockCountry = {
  name: {
    common: "Germany",
    official: "Federal Republic of Germany",
  },
  population: 83240525,
  region: "Europe",
  subregion: "Western Europe",
  capital: ["Berlin"],
  tld: [".de"],
  currencies: {
    EUR: { name: "Euro", symbol: "€" },
  },
  languages: {
    deu: "German",
  },
  flags: {
    png: "https://flagcdn.com/w320/de.png",
  },
  borders: ["FRA", "AUT", "CHE"],
};

const renderComponent = (country = mockCountry) =>
  render(
    <BrowserRouter>
      <CountryDetails country={country} />
    </BrowserRouter>
  );

describe("CountryDetails Component", () => {
  test("renders country name and flag", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /Germany/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockCountry.flags.png
    );
  });

  test("renders all basic details", () => {
    renderComponent();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === "Native Name: Federal Republic of Germany"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Population: 83,240,525"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Region: Europe"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Sub Region: Western Europe"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Capital: Berlin"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Top Level Domain: .de"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Currencies: Euro (€)"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Languages: German"
      )
    ).toBeInTheDocument();
  });

  test("renders border countries as chips with links", () => {
    renderComponent();
    mockCountry.borders.forEach((border) => {
      const chip = screen.getByText(border);
      expect(chip).toBeInTheDocument();
      expect(chip.closest("a")).toHaveAttribute("href", `/country/${border}`);
    });
  });

  test('renders "Back" button with correct link', () => {
    renderComponent();
    const backBtn = screen.getByRole("link", { name: /back/i }); // <— key fix here
    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveAttribute("href", "/");
  });

  test("handles missing optional fields gracefully", () => {
    const minimalCountry = {
      ...mockCountry,
      capital: undefined,
      subregion: undefined,
      tld: undefined,
      currencies: undefined,
      languages: undefined,
      borders: [],
    };
    renderComponent(minimalCountry);

    expect(
      screen.getByText((_, el) => el?.textContent === "Capital: N/A")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === "Sub Region: N/A")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === "Top Level Domain: N/A")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === "Currencies: N/A")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === "Languages: N/A")
    ).toBeInTheDocument();

    expect(screen.queryByText(/Border Countries:/)).not.toBeInTheDocument();
  });

  test("does not render if country is null", () => {
    const { container } = renderComponent(null);
    expect(container.firstChild).toBeNull();
  });
});
