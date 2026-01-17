import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const context = useContext(ThemeContext);

  // Safety check
  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 20px",
        borderRadius: "25px",
        cursor: "pointer",
        background:
          theme === "light"
            ? "linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)"
            : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        color: theme === "light" ? "#1a1a1a" : "#ffffff",
        fontWeight: 600,
        fontSize: "14px",
        boxShadow:
          theme === "light"
            ? "0 4px 16px rgba(0, 0, 0, 0.15)"
            : "0 4px 16px rgba(0, 0, 0, 0.6)",
        zIndex: 1000,
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border:
          theme === "light"
            ? "1px solid rgba(0,0,0,0.1)"
            : "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
    </motion.button>
  );
}
