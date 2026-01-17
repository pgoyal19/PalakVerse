import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Education() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const educationData = [
    {
      title: "B.Tech – Computer Science",
      year: "2023 – 2027",
      place: "Guru Gobind Singh Indraprastha University, Delhi",
      extra: "CGPA: 8.386 (Currently Pursuing)"
    },
    {
      title: "Senior Secondary (XII)",
      year: "2023",
      place: "Gurusharan Convent, Delhi",
      extra: "CBSE Board"
    },
    {
      title: "Secondary (X)",
      year: "2021",
      place: "Gurusharan Convent, Delhi",
      extra: "CBSE Board"
    }
  ];

  const photos = [
    "/photo1.jpeg",
    "/photo2.jpeg",
    "/photo3.jpeg",
    "/photo4.jpeg",
    "/photo5.jpeg",
    "/photo6.jpeg",
    "/photo7.jpeg",
    "/photo8.jpeg",
    "/photo9.jpeg",
    "/photo10.jpeg",
  ];

  /* COLORS */
  const bg = isLight ? "#f7f4ef" : "#0f0f0f";
  const textMain = isLight ? "#3a2a1a" : "#f5f5f5";
  const textSub = isLight ? "#6b4f2d" : "#cfcfcf";
  const cardBg = isLight ? "#ffffff" : "#181818";

  return (
    <section
      id="education"
      style={{
        padding: isMobile ? "3rem 1rem" : "5rem 4rem",
        background: bg,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* PAPER TEXTURE OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.025),
              rgba(0,0,0,0.025) 1px,
              transparent 1px,
              transparent 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0,0,0,0.015),
              rgba(0,0,0,0.015) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          pointerEvents: "none",
          opacity: isLight ? 1 : 0.35
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          position: "relative",
          zIndex: 2,
          alignItems: "flex-start"
        }}
      >
        {/* LEFT – TEXT CONTENT */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? "2.2rem" : "3.6rem",
              fontWeight: 900,
              color: textMain,
              lineHeight: 1.05,
              marginBottom: isMobile ? "1.5rem" : "2.5rem"
            }}
          >
            My Journey
          </motion.h1>
          <h2 style={{ fontSize: isMobile ? "1.5rem" : "2.1rem" }}>Education Journey</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.04 }}
                whileTap={isMobile ? { scale: 0.96, rotate: 2, boxShadow: "0 1px 20px #6366f1" } : {}}
                style={{
                  background: cardBg,
                  padding: isMobile ? "1.2rem 1.4rem" : "1.6rem 1.8rem",
                  borderRadius: isMobile ? "12px" : "16px",
                  boxShadow: isLight
                    ? "0 14px 32px rgba(0,0,0,0.18)"
                    : "0 14px 32px rgba(0,0,0,0.65)"
                }}
              >
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: textMain }}>
                  {edu.title}
                </div>

                <div style={{ fontSize: "0.95rem", color: textSub, margin: "0.4rem 0" }}>
                  {edu.place}
                </div>

                <div style={{ fontSize: "0.85rem", color: textSub, opacity: 0.85 }}>
                  {edu.year} • {edu.extra}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT – PINTEREST / MASONRY PHOTO WALL */}
        <div
          style={{
            columnCount: isMobile ? 2 : 3,
            columnGap: isMobile ? "1rem" : "1.6rem",
            width: "100%"
          }}
        >
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.08,
                z: 40,
                rotateZ: 0,
              }}
              whileTap={isMobile ? { 
                scale: 1.12, 
                rotateZ: 5,
                z: 60,
              } : {}}
              style={{
                breakInside: "avoid",
                marginBottom: "1.8rem",
                background: cardBg,
                padding: "10px",
                borderRadius: "18px",
                boxShadow: isLight
                  ? "0 18px 35px rgba(0,0,0,0.25)"
                  : "0 18px 35px rgba(0,0,0,0.7)",
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
                perspective: "1000px",
                cursor: "pointer",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={src}
                alt={`edu-${i}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "14px",
                  objectFit: "cover"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
