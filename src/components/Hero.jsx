import { motion, useMotionValue, useTransform } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import ScrollScene from "./ScrollScene";
import TypewriterText from "./TypewriterText";
import { ThemeContext } from "../context/ThemeContext";

const baseUrl = import.meta.env.BASE_URL;
const heroPhotos = [
  `${baseUrl}photo1.jpeg`,
  `${baseUrl}photo2.jpeg`,
  `${baseUrl}photo3.jpeg`,
  `${baseUrl}photo4.jpeg`
];

const randomFloat = () => ({
  x: [0, Math.random() * 30 - 15, 0],
  y: [0, Math.random() * 30 - 15, 0],
  rotate: [0, Math.random() * 8 - 4, 0],
  scale: [1, 1.03, 1],
});

export default function Hero() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const textParallaxX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);
  const glowX = useTransform(mouseX, [-0.5, 0.5], [-150, 150]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [-100, 100]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        perspective: "1200px",
        background: isLight
          ? "linear-gradient(135deg, #f5f5f5, #ffffff)"
          : "linear-gradient(135deg, #0b0b0b, #1a1a1a)",
      }}
    >
      <ScrollScene />

      {/* Floating Photos with Enhanced 3D */}
      {heroPhotos.map((photo, index) => (
        <motion.img
          key={index}
          src={photo}
          alt="floating"
          animate={randomFloat()}
          transition={{
            duration: 7 + index * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={!isMobile ? {
            scale: 1.15,
            rotateZ: 5,
            z: 100,
            boxShadow: "0 40px 80px rgba(99,102,241,0.4)",
          } : {}}
          whileTap={isMobile ? {
            scale: 1.2,
            rotateZ: 10,
            z: 120,
          } : {}}
          style={{
            position: "absolute",
            width: isMobile ? 80 : 120,
            height: isMobile ? 80 : 120,
            objectFit: "cover",
            borderRadius: isMobile ? "12px" : "18px",
            top: `${18 + index * 14}%`,
            left: `${50 + (index % 2) * 14}%`,
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            border: isLight ? "2px solid #fff" : "2px solid #222",
            zIndex: 3,
            transformStyle: "preserve-3d",
            translateZ: `${40 + index * 25}px`,
            x: isMobile ? 0 : parallaxX,
            y: isMobile ? 0 : parallaxY,
            display: isMobile && index > 1 ? "none" : "block",
            cursor: "pointer",
          }}
        />
      ))}

      {/* Cursor-follow glow */}
      {!isMobile && (
        <>
          <motion.div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%)",
              mixBlendMode: "screen",
              filter: "blur(60px)",
              pointerEvents: "none",
              x: glowX,
              y: glowY,
              zIndex: 4,
            }}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: "rgba(168,85,247,0.15)",
              mixBlendMode: "screen",
              filter: "blur(100px)",
              pointerEvents: "none",
              top: "15%",
              left: "-80px",
              zIndex: 2,
            }}
            animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </>
      )}

      {/* Text Content */}
      <motion.div
        style={{
          position: "absolute",
          top: isMobile ? "25%" : "32%",
          left: isMobile ? "5%" : "8%",
          right: isMobile ? "5%" : "auto",
          maxWidth: isMobile ? "90%" : "520px",
          zIndex: 10,
          x: isMobile ? 0 : textParallaxX,
          y: isMobile ? 0 : textParallaxY,
          touchAction: isMobile ? "manipulation" : undefined
        }}
        whileTap={isMobile ? { scale: 0.96, rotateX: 7, boxShadow: "0 4px 30px #6366f1" } : {}}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1 }}
          whileHover={!isMobile ? {
            scale: 1.02,
            textShadow: isLight 
              ? "0 4px 20px rgba(99,102,241,0.3)" 
              : "0 4px 20px rgba(99,102,241,0.5)",
          } : {}}
          style={{
            fontSize: isMobile ? "2.2rem" : "3.8rem",
            fontWeight: 800,
            color: isLight ? "#1a1a1a" : "#ffffff",
            lineHeight: 1.2,
            textShadow: isLight ? "none" : "0 2px 10px rgba(0,0,0,0.4)",
            transformStyle: "preserve-3d",
          }}
        >
          Hi, I'm{" "}
          <motion.span 
            style={{ color: "#6366f1", display: "inline-block" }}
            animate={!isMobile ? {
              textShadow: [
                "0 0 0px rgba(99,102,241,0.5)",
                "0 0 20px rgba(99,102,241,0.8)",
                "0 0 0px rgba(99,102,241,0.5)",
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TypewriterText text="Palak Goyal" speed={120} />
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: isMobile ? "12px" : "18px",
            fontSize: isMobile ? "1rem" : "1.3rem",
            color: isLight ? "#4a4a4a" : "#cfcfcf",
            lineHeight: 1.6,
            textShadow: isLight ? "none" : "0 1px 6px rgba(0,0,0,0.3)",
          }}
        >
          <TypewriterText
            text="Aspiring Software Engineer | AI & ML Enthusiast | Creative Developer"
            speed={40}
          />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          style={{
            marginTop: isMobile ? "16px" : "22px",
            fontSize: isMobile ? "0.85rem" : "1rem",
            color: isLight ? "#666" : "#aaa",
            textShadow: isLight ? "none" : "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          I design immersive web experiences, build intelligent systems,
          and love blending creativity with technology.
        </motion.p>

        {/* Scroll Indicator */}
        {!isMobile && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              marginTop: "2rem",
              width: "30px",
              height: "30px",
              border: "2px solid #6366f1",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
