import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const projects = [
  {
    title: "Drone Detection System",
    desc: "Real-time ML-based aerial classification",
    tech: "Python • TensorFlow • OpenCV",
  },
  {
    title: "Emotion-to-Music Generator",
    desc: "AI-generated music from human emotions",
    tech: "Python • ML • Audio Processing",
  },
  {
    title: "Weather Bite",
    desc: "Smart diet planning using weather data",
    tech: "React • API Integration • Data Analysis",
  },
  {
    title: "KhelSetu",
    desc: "An ML-powered app to identify and uplift talented village sportspersons with limited access to opportunities",
    tech: "Machine Learning • React • Node.js • Data Analysis",
  },
];

export default function Projects() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textColor = isLight ? "#111" : "#fff";
  const subTextColor = isLight ? "#555" : "#ccc";

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "3rem 1rem" : "6rem 1.5rem",
        background: isLight
          ? "radial-gradient(circle at 20% 20%, #ffffff, #f0f0f0)"
          : "radial-gradient(circle at 20% 20%, #1a1a1a, #050505)",
        color: textColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND GLOWS */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent)",
          filter: "blur(140px)",
          top: "-120px",
          right: "-100px",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent)",
          filter: "blur(120px)",
          bottom: "-100px",
          left: "-80px",
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h2
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: 900,
            marginBottom: "1rem",
            color: subTextColor,
            textAlign: "center",
          }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          style={{
            textAlign: "center",
            color: subTextColor,
            marginBottom: isMobile ? "2rem" : "3rem",
            fontSize: isMobile ? "0.95rem" : "1.1rem",
          }}
        >
          Innovative solutions blending technology, AI, and social impact
        </motion.p>

        {/* PROJECT CARDS */}
        <motion.div
          style={{
            display: "flex",
            gap: isMobile ? "1rem" : "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            perspective: 1200,
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                rotateY: -8,
                rotateX: 6,
                scale: 1.08,
                y: -12,
                boxShadow: isLight
                  ? "0 30px 60px rgba(99,102,241,0.3)"
                  : "0 30px 60px rgba(99,102,241,0.5)",
              }}
              style={{
                minWidth: isMobile ? "100%" : "300px",
                maxWidth: "350px",
                flex: "1 1 300px",
                padding: isMobile ? "1.5rem" : "2.5rem",
                background: isLight
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(40,40,40,0.9)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                boxShadow: isLight
                  ? "0 20px 40px rgba(0,0,0,0.15)"
                  : "0 25px 50px rgba(0,0,0,0.7)",
                border: isLight
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
            >
              <motion.h3
                style={{
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: textColor,
                }}
              >
                {p.title}
              </motion.h3>

              <motion.p
                style={{
                  color: subTextColor,
                  lineHeight: 1.6,
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                {p.desc}
              </motion.p>

              <motion.div
                style={{
                  marginTop: "1rem",
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  color: isLight ? "#6366f1" : "#a78bfa",
                  fontWeight: 500,
                }}
              >
                {p.tech}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
