import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountryByName, getCountryByCode } from "../services/api";
import CountryDetails from "../components/CountryDetails";

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);

        let data = await getCountryByName(name);

        if (!data || data.length === 0) {
          data = await getCountryByCode(name);
        }

        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError("Country not found");
        }
      } catch (error) {
        console.error("Error fetching country:", error);
        setError("Failed to load country data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return <CountryDetails country={country} />;
};

export default CountryPage;
