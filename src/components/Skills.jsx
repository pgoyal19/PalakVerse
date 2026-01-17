import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaBrain,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiC,
  SiMongodb,
  SiMysql,
} from "react-icons/si";
import { ThemeContext } from "../context/ThemeContext";

export default function Skills() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeSkill, setActiveSkill] = useState("Explore Skills");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  /* ---------- 3D MOUSE TILT / GAME BOARD ---------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ---------- SKILLS DATA (ONLY TECH) ---------- */
  const skills = [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <FaPython />, name: "Python" },
    { icon: <SiC />, name: "C" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },

    // AI / ML
    { icon: <FaBrain />, name: "Artificial Intelligence", depth: 70 },
    { icon: <FaBrain />, name: "Machine Learning", depth: 70 },
  ];

  /* ---------- THEME ---------- */
  const bgColor = isLight ? "#f5f5f5" : "#0a0a0a";
  const textColor = isLight ? "#1a1a1a" : "#ffffff";
  const iconColor = isLight ? "#666" : "#bdbdbd";
  const borderColor = isLight
    ? "rgba(0,0,0,0.15)"
    : "rgba(255,255,255,0.2)";

  return (
    <section
      id="skills"
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        padding: isMobile ? "3rem 1rem" : "0",
        background: bgColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
        style={{ perspective: "1500px" }}
      >
        <motion.div
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
            width: isMobile ? 280 : 480,
            height: isMobile ? 280 : 480,
            position: "relative",
            touchAction: isMobile ? "manipulation" : undefined
          }}
          whileTap={isMobile ? { scale: 0.96, rotateZ: 5, boxShadow: "0 4px 32px #6366f1" } : {}}
        >
          {/* GAME-LIKE CUBE GRID BACKDROP */}
          <motion.div
            animate={{ rotateX: [52, 58, 52], rotateZ: [-8, 0, -8] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-10%",
              backgroundImage: `
                linear-gradient(${isLight ? "rgba(15,23,42,0.2)" : "rgba(148,163,184,0.18)"} 1px, transparent 1px),
                linear-gradient(90deg, ${isLight ? "rgba(15,23,42,0.24)" : "rgba(148,163,184,0.25)"} 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
              borderRadius: 32,
              opacity: isMobile ? 0.4 : 0.55,
              transformOrigin: "center",
              transformStyle: "preserve-3d",
              transform: "perspective(1600px) rotateX(60deg)",
              boxShadow: isLight
                ? "0 40px 80px rgba(15,23,42,0.25)"
                : "0 40px 90px rgba(0,0,0,0.85)",
            }}
          >
            {/* shimmering cubes along the grid */}
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                style={{
                  position: "absolute",
                  width: 26,
                  height: 26,
                  left: `${10 + (i % 3) * 30}%`,
                  top: `${15 + Math.floor(i / 3) * 25}%`,
                  background: isLight
                    ? "linear-gradient(135deg, #e5e7eb, #ffffff)"
                    : "linear-gradient(135deg, #111827, #1f2937)",
                  borderRadius: 6,
                  boxShadow: isLight
                    ? "0 8px 18px rgba(15,23,42,0.28)"
                    : "0 10px 24px rgba(0,0,0,0.9)",
                  border: isLight
                    ? "1px solid rgba(148,163,184,0.5)"
                    : "1px solid rgba(148,163,184,0.4)",
                }}
              />
            ))}
          </motion.div>

          {/* CENTER GLASS */}
          <div
            style={{
              position: "absolute",
              inset: isMobile ? 80 : 140,
              borderRadius: "50%",
              background: isLight
                ? "rgba(255,255,255,0.65)"
                : "rgba(0,0,0,0.45)",
              backdropFilter: "blur(14px)",
              border: `1px solid ${borderColor}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateZ(80px)",
            }}
          >
            <h2
              style={{
                letterSpacing: "0.3em",
                fontWeight: 600,
                color: textColor,
              }}
            >
              SKILLS
            </h2>
            <p style={{ fontSize: 13, opacity: 0.7 }}>
              {activeSkill}
            </p>
          </div>

          {/* ROTATING RING */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              transformStyle: "preserve-3d",
            }}
          >
            {skills.map((skill, index) => {
              const angle = (360 / skills.length) * index;
              return (
                <motion.div
                  key={skill.name}
                  onMouseEnter={() => {
                    setActiveSkill(skill.name);
                    setHighlightedIndex(index);
                  }}
                  onMouseLeave={() => {
                    setActiveSkill("Explore Skills");
                    setHighlightedIndex(null);
                  }}
                  onClick={() => setHighlightedIndex(index)}
                  whileHover={{ scale: 1.35, z: 40, rotateZ: 5 }}
                  whileTap={isMobile ? { scale: 1.5, rotateZ: 15, z: 60 } : {}}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `
                      rotate(${angle}deg)
                      translate(${isMobile ? 110 : 200}px)
                      rotate(-${angle}deg)
                      translateZ(${skill.depth || 45}px)
                    `,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: isMobile ? 4 : 6,
                    color:
                      highlightedIndex === index
                        ? "#fbbf24"
                        : iconColor,
                    cursor: "pointer",
                    fontSize: isMobile ? 18 : 26,
                    filter: highlightedIndex === index ? "drop-shadow(0 0 8px #fbbf24)" : "none",
                    transition: "filter 0.3s ease",
                  }}
                >
                  {skill.icon}
                  <span
                    style={{
                      fontSize: isMobile ? 8 : 11,
                      letterSpacing: "0.12em",
                      color: textColor,
                      opacity: 0.85,
                      textAlign: "center",
                      maxWidth: isMobile ? 60 : 90,
                    }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* OUTER RING */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1px dashed ${borderColor}`,
              transform: "translateZ(10px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
