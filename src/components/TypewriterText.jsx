import { useState, useEffect } from "react";

export default function TypewriterText({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <span>{displayed}<span style={{opacity: index < text.length ? 1 : 0}}>|</span></span>;
}

