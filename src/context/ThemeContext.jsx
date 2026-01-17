import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to "light"
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
      }
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
    }
    return "light";
  });

  useEffect(() => {
    try {
      // Save theme to localStorage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("theme", theme);
      }
      // Apply theme class to document root
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (error) {
      console.warn("Failed to save theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
