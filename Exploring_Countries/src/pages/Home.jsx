import { useState, useEffect } from "react";
import { getAllCountries, getCountriesByRegion } from "../services/api";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import Filter from "../components/Filter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilter = async (region) => {
    setLoading(true);
    try {
      if (!region) {
        const data = await getAllCountries();
        setFilteredCountries(data);
      } else {
        const data = await getCountriesByRegion(region);
        setFilteredCountries(data);
      }
    } catch (error) {
      console.error("Error filtering countries:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
        <div className="w-full sm:w-1/2 md:w-2/5">
          <Search onSearch={handleSearch} />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/5">
          <Filter onFilter={handleFilter} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredCountries.length === 0 ? (
        <div className="text-center py-20 w-full">
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
            No countries found. Try a different search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
          {" "}
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="flex">
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
