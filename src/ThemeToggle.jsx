import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const initialTheme = localStorage.getItem("theme");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 cursor-pointer right-4 px-2 py-1 bg-gray-200 dark:bg-stone-900 text-black dark:text-white rounded-lg shadow-md"
    >
      {darkMode ? "🌙 " : "☀️"}
    </button>
  );
};

export default ThemeToggle;
