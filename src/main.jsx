import { useState } from "react";
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

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<MainWithSplash />);
}
