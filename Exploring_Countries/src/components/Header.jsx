import { Link } from 'react-router-dom';
import { Moon, Sun } from 'react-feather';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4 sticky top-0 z-50">
<div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
   <Link
          to="/"
          className="flex items-center gap-2 text-gray-800 dark:text-white no-underline"
        >
          <h1 className="text-2xl font-bold tracking-tight">
            Countries Explorer
          </h1>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;