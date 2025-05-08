import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

const CountryDetails = ({ country }) => {
  if (!country) return null;

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol || "—"})`)
        .join(", ")
    : "N/A";

  return (
    <div className="w-screen px-0 py-8">
      <Link
        to="/"
        className="inline-flex items-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full">
        <div className="flex flex-col lg:flex-row gap-12 w-full">
          <div className="lg:w-1/2 flex items-center w-full">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full max-h-[400px] object-contain rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              {country.name.common}
            </h1>

            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex-1 min-w-[200px] space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Native Name:</span>{" "}
                  {country.name.official}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {country.subregion || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital?.[0] || "N/A"}
                </p>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {country.tld?.[0] || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Currencies:</span>{" "}
                  {currencies}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-2 w-full">
                  {country.borders.map((border) => (
                    <Link
                      key={border}
                      to={`/country/${border}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 rounded-md text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300"
                    >
                      {border}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
