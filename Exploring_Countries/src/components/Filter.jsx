const Filter = ({ onFilter }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="w-full sm:w-48">
      <select
        onChange={handleChange}
        defaultValue=""
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;