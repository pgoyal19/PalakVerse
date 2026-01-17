import { useEffect, useState, useContext } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function IntroSplash({ onDone }) {
  const [progress, setProgress] = useState(0);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || "light";
  const isLight = theme === "light";

  /* ---------------- LOADING SIMULATION ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return prev + (prev < 60 ? 2 : prev < 85 ? 1 : 0.6);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onDone]);

  /* ---------------- THEME COLORS ---------------- */
  const bgColor = isLight ? "#f5f5f5" : "#0a0a0a";
  const bgImage = isLight
    ? "radial-gradient(circle at 90% 20%, rgba(200,200,200,0.2), transparent 60%), radial-gradient(circle at 10% 80%, rgba(220,220,220,0.3), transparent 70%)"
    : "radial-gradient(circle at 90% 20%, rgba(60,60,60,0.2), transparent 60%), radial-gradient(circle at 10% 80%, rgba(40,40,40,0.4), transparent 70%)";

  const mainText = isLight ? "#1a1a1a" : "#ffffff";
  const secondaryText = isLight ? "#555" : "#bbb";

  /* ---------------- MOUSE 3D LOGIC ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: bgColor,
        backgroundImage: bgImage,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s ease",
      }}
    >
      {/* ---------- HI TAG ---------- */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          marginBottom: "40px",
          padding: "6px 18px",
          borderRadius: "30px",
          background: isLight ? "#ddd" : "#333",
          color: isLight ? "#111" : "#eee",
          fontWeight: 600,
          fontFamily: "Poppins, Inter, sans-serif",
        }}
      >
        Hi! This is my
      </motion.div>

      {/* ---------- 3D PORTFOLIO ---------- */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
        style={{
          perspective: "1400px",
          padding: "40px",
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            display: "flex",
            fontSize: "78px",
            fontWeight: 800,
            letterSpacing: "0.25em",
            fontFamily: "Poppins, Inter, sans-serif",
          }}
        >
          {"PORTFOLIO".split("").map((letter, idx) => (
            <span
              key={idx}
              style={{
                transform: `translateZ(${idx * 10}px)`,
                color:
                  letter === "O" || letter === "L"
                    ? secondaryText
                    : mainText,
                textShadow: isLight
                  ? "0 15px 30px rgba(0,0,0,0.25)"
                  : "0 15px 40px rgba(255,255,255,0.25)",
              }}
            >
              {letter}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ---------- TAGLINE ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: "18px",
          fontSize: "14px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: secondaryText,
          fontWeight: 500,
        }}
      >
        Creative • Code • Craft
      </motion.div>

      {/* ---------- LOADING BAR ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        style={{
          marginTop: "60px",
          width: "380px",
          maxWidth: "90vw",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "8px",
            background: isLight
              ? "rgba(0,0,0,0.1)"
              : "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            style={{
              height: "100%",
              background: isLight ? "#333" : "#fff",
              borderRadius: "10px",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "14px",
            textAlign: "center",
            fontWeight: 600,
            color: secondaryText,
          }}
        >
          {Math.round(progress)}%
        </div>
      </motion.div>
    </motion.div>
  );
}
