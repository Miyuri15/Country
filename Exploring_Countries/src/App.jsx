import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import { useEffect, useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for user's preferred color scheme
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    // Apply dark mode class to root element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:name" element={<CountryPage />} />
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    404 - Page Not Found
                  </h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    The page you're looking for doesn't exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
          <div className="px-4 text-center text-gray-600 dark:text-gray-300">
            {" "}
            {/* Removed container and mx-auto */}
            <p>
              © {new Date().getFullYear()} Countries Explorer. All data provided
              by REST Countries API.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
