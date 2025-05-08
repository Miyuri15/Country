import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <div className="w-full h-full flex flex-col rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white truncate">
          {country.name.common}
        </h3>
        <div className="text-gray-600 dark:text-gray-300 space-y-1 mb-6">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
        </div>
        <Link
          to={`/country/${country.name.common}`}
          className="mt-auto inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
