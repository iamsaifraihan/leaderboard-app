import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const contextValue = {
    theme,
    toggleTheme,
  };

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

console.log("ThemeProvider", ThemeProvider);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
