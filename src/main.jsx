import { useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import IntroSplash from "./components/IntroSplash";

function MainWithSplash() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <ThemeProvider>
      {showSplash ? <IntroSplash onDone={() => setShowSplash(false)} /> : <App />}
    </ThemeProvider>
  );
}

// Initialize React app with error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;">Error: Root element not found</div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <MainWithSplash />
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to render React app:", error);
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial; flex-direction: column; gap: 20px; padding: 20px; text-align: center;">
        <h1>Error Loading Application</h1>
        <p>${error.message || "An unexpected error occurred"}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; cursor: pointer; font-size: 16px;">Refresh Page</button>
      </div>
    `;
  }
}
