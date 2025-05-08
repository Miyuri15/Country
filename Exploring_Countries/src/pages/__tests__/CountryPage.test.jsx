import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryPage from "../CountryPage";
import * as api from "../../services/api";
import { vi, describe, it, afterEach, expect } from "vitest";

// Mock API module
vi.mock("../../services/api", () => ({
  getCountryByName: vi.fn(),
  getCountryByCode: vi.fn(),
}));

// Mock useParams from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ name: "Germany" }),
  };
});

const mockCountry = [
  {
    name: { common: "Germany", official: "Federal Republic of Germany" },
    population: 83240525,
    region: "Europe",
    subregion: "Western Europe",
    capital: ["Berlin"],
    tld: [".de"],
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German" },
    flags: { png: "https://flagcdn.com/w320/de.png" },
    borders: ["FRA", "AUT"],
  },
];

describe("CountryPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    render(
      <MemoryRouter initialEntries={["/country/Germany"]}>
        <Routes>
          <Route path="/country/:name" element={<CountryPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders loading spinner initially", () => {
    api.getCountryByName.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithRouter();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders country details on successful fetch", async () => {
    api.getCountryByName.mockResolvedValue(mockCountry);
    renderWithRouter();
    expect(
      await screen.findByRole("heading", { name: /germany/i })
    ).toBeInTheDocument();
  });

  it("tries getCountryByCode if name not found", async () => {
    api.getCountryByName.mockResolvedValue([]);
    api.getCountryByCode.mockResolvedValue(mockCountry);
    renderWithRouter();
    expect(
      await screen.findByRole("heading", { name: /germany/i })
    ).toBeInTheDocument();
    expect(api.getCountryByCode).toHaveBeenCalledWith("Germany");
  });

  it("renders error message when country not found", async () => {
    api.getCountryByName.mockResolvedValue([]);
    api.getCountryByCode.mockResolvedValue([]);
    renderWithRouter();
    expect(await screen.findByText(/Country not found/i)).toBeInTheDocument();
  });

  it("renders error message on API failure", async () => {
    api.getCountryByName.mockRejectedValue(new Error("API Error"));
    renderWithRouter();
    expect(
      await screen.findByText(/Failed to load country data/i)
    ).toBeInTheDocument();
  });
});
