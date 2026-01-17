import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaBrain,
  FaCode,
  FaCogs,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaShieldAlt,
  FaLaptopCode,
  FaDatabase,
  FaProjectDiagram,
  FaGlobe,
} from "react-icons/fa";

/* ICON SET */
const icons = [
  { Icon: FaBrain, label: "Learn" },
  { Icon: FaCode, label: "Build" },
  { Icon: FaCogs, label: "Engineer" },
  { Icon: FaUsers, label: "Collaborate" },
  { Icon: FaRocket, label: "Grow" },
  { Icon: FaLightbulb, label: "Innovate" },
  { Icon: FaChartLine, label: "Improve" },
  { Icon: FaShieldAlt, label: "Secure" },
  { Icon: FaLaptopCode, label: "Develop" },
  { Icon: FaDatabase, label: "Analyze" },
  { Icon: FaProjectDiagram, label: "Design" },
  { Icon: FaGlobe, label: "Scale" },
];

export default function About() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* 3D TILT (DESKTOP ONLY) */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const orbitRadius = isMobile ? 150 : 250;

  return (
    <section
      id="about"
      style={{
        padding: isMobile ? "3rem 1rem" : "4rem 1rem",
        background: isLight ? "#ffffff" : "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: isMobile ? "2.1rem" : "2.8rem",
          fontWeight: 900,
          marginBottom: "1.8rem",
          color: isLight ? "#111827" : "#f9fafb",
          textAlign: "center",
        }}
      >
        Career Objective
      </motion.h2>

      {/* ORBIT CONTAINER */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
        style={{
          position: "relative",
          width: isMobile ? 320 : 560,
          height: isMobile ? 320 : 560,
          transformStyle: "preserve-3d",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
      >
        {/* CENTER CONTENT */}
        <div
          style={{
            position: "absolute",
            inset: isMobile ? "18%" : "22%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: isLight ? "#374151" : "#d1d5db",
            zIndex: 2,
          }}
        >
          <div>
            <p
              style={{
                fontSize: isMobile ? "0.9rem" : "1.05rem",
                lineHeight: 1.7,
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              To secure a challenging position in the field of computer science
              where I can apply my knowledge and skills in{" "}
              <strong style={{ color: isLight ? "#111827" : "#f9fafb" }}>
                software development, data analysis
              </strong>{" "}
              and emerging technologies.
            </p>

            <p
              style={{
                fontSize: isMobile ? "0.85rem" : "0.95rem",
                lineHeight: 1.6,
                opacity: 0.85,
              }}
            >
              I aim to contribute to innovative projects while continually
              enhancing my technical abilities to achieve organizational and
              personal growth.
            </p>
          </div>
        </div>

        {/* ICON ORBIT */}
        {icons.map(({ Icon, label }, i) => {
          const angle = (360 / icons.length) * i;

          return (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ position: "absolute", inset: 0 }}
            >
              <motion.div
                whileHover={!isMobile ? { scale: 1.25 } : {}}
                whileTap={isMobile ? { scale: 1.35 } : {}}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Icon
                  size={isMobile ? 20 : 26}
                  color={isLight ? "#111827" : "#f9fafb"}
                  style={{ marginBottom: "6px" }}
                />
                <span
                  style={{
                    fontSize: isMobile ? "0.6rem" : "0.7rem",
                    opacity: 0.8,
                    color: isLight ? "#374151" : "#d1d5db",
                  }}
                >
                  {label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
