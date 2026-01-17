import React, { useState } from "react";
import ReactDOM from "react-dom/client";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainWithSplash />
  </React.StrictMode>
);
