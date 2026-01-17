import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBrain,
  FaHandsHelping,
  FaTrophy,
} from "react-icons/fa";

/* ===================== DATA ===================== */

const timeline = [
  {
    period: "Jun 2025 – Aug 2025",
    title: "Machine Learning Research Intern – DRDO (SSPL)",
    subtitle: "Drone Detection using Particle Velocity Sensor",
    bullets: [
      "Worked with real PVS sensor data for drone detection.",
      "Signal preprocessing and ML feature extraction.",
      "Focused on accuracy, confidence & real-time constraints.",
    ],
  },
  {
    period: "Jan 2025 – Feb 2025",
    title: "Software Development Intern – NIC",
    subtitle: "Employee Management System",
    bullets: [
      "Developed React-based EMS from scratch.",
      "Integrated REST APIs and notifications.",
    ],
  },
  {
    period: "Jul 2024 – Aug 2024",
    title: "Software Developer Intern – QuickWay",
    subtitle: "Health Insurance Management System",
    bullets: [
      "Frontend development and debugging.",
      "Requirement analysis and UI improvements.",
    ],
  },
];

const baseUrl = import.meta.env.BASE_URL;
const certificates = [
  {
    title: "DRDO Training Certificate",
    issuer: "SSPL, DRDO",
    period: "2025",
    image: `${baseUrl}drdo-certificate.jpeg`,
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "NIC",
    period: "2024",
    image: `${baseUrl}ic.jpeg`,
  },
  {
    title: "Machine Learning Foundations",
    issuer: "QuickWay",
    period: "2024",
    image: `${baseUrl}QuickWay.jpeg`,
  },
];

const leadership = [
  {
    icon: <FaUsers />,
    title: "Technical Lead",
    desc: "Led frontend & ML integration for academic and research projects.",
  },
  {
    icon: <FaBrain />,
    title: "Research Contributor",
    desc: "Worked on real-time drone detection & AI-based signal processing.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Peer Mentor",
    desc: "Guided juniors in React, APIs, and project architecture.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Community & Volunteering",
    desc: "Actively participated in tech communities & student initiatives.",
  },
  {
    icon: <FaTrophy />,
    title: "Hackathons & Events",
    desc: "Participated in national-level hackathons & innovation events.",
  },
];

/* ===================== COMPONENT ===================== */

export default function Experience() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedCert, setSelectedCert] = useState(null);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  /* ---------- CERT AUTO SLIDER ---------- */
  const nextCert = () => {
    setDirection(1);
    setCurrentCertIndex((p) => (p + 1) % certificates.length);
  };

  useEffect(() => {
    const interval = setInterval(nextCert, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- 3D TILT ---------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
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

  return (
    <section
      style={{
        padding: isMobile ? "3rem 1rem" : "6rem 1.5rem",
        background: isLight
          ? "radial-gradient(circle at 20% 20%, #ffffff, #f0f0f0)"
          : "radial-gradient(circle at 20% 20%, #1a1a1a, #050505)",
        color: isLight ? "#111" : "#eee",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Glow */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(120,120,255,0.35), transparent)",
          filter: "blur(90px)",
          top: "-100px",
          right: "-120px",
          zIndex: 0,
        }}
      />

      {/* ================= JOURNEY + LADDER STORY ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(180px, 240px) minmax(0,1fr)",
          gap: isMobile ? "2rem" : "3rem",
          alignItems: "flex-start",
          marginBottom: isMobile ? "2.5rem" : "4rem",
        }}
      >
        {/* Ladder & kid graphic */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            height: "100%",
            minHeight: isMobile ? 240 : 320,
            overflow: "visible",
          }}
        >
          {/* side label */}
          <div
            style={{
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              opacity: 0.7,
              marginBottom: "0.6rem",
            }}
          >
            journey in motion
          </div>

          {/* ladder */}
          <div
            style={{
              position: "absolute",
              left: "22%",
              top: "15%",
              bottom: "6%",
              width: 48,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {[0, 1].map((col) => (
              <div
                key={col}
                style={{
                  width: 6,
                  borderRadius: 999,
                  background: isLight ? "#1e293b" : "#e5e7eb",
                  boxShadow: isLight
                    ? "0 10px 24px rgba(15,23,42,0.5)"
                    : "0 10px 24px rgba(0,0,0,0.9)",
                }}
              />
            ))}

            {/* rungs */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${12 + idx * 12}%`,
                  height: 6,
                  borderRadius: 999,
                  background: isLight ? "#475569" : "#cbd5f5",
                }}
              />
            ))}
          </div>

          {/* kid climbing (from first step to top, then reset) */}
          <motion.div
            initial={{ y: "85%" }}
            animate={{ y: ["85%", "8%"] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop", // climbs up then instantly resets to bottom
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: "22%",
              width: 48,
              height: 80,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* body */}
            <div
              style={{
                width: 24,
                height: 34,
                borderRadius: 12,
                background: isLight ? "#6366f1" : "#38bdf8",
                boxShadow: "0 8px 18px rgba(15,23,42,0.6)",
                position: "relative",
              }}
            >
              {/* head */}
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#fed7aa",
                  boxShadow: "0 6px 14px rgba(15,23,42,0.65)",
                }}
              />

              {/* arm reaching a rung */}
              <div
                style={{
                  position: "absolute",
                  top: "38%",
                  right: "-30%",
                  width: 16,
                  height: 5,
                  borderRadius: 999,
                  background: isLight ? "#e5e7eb" : "#e2e8f0",
                }}
              />
            </div>
          </motion.div>

          {/* subtle caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              position: "absolute",
              right: "1%",
              bottom: "10%",
              maxWidth: 130,
              fontSize: 15,
              lineHeight: 1.5,
              color: isLight ? "#1e293b" : "#e5e7eb",
            }}
          >
            Each role is a new step up the ladder — learning, impact and growth.
          </motion.div>
        </motion.div>

        {/* Journey timeline cards */}
        <div>
          <h2 style={{ fontSize: isMobile ? "2rem" : "2.1rem" }}>Technical Journey</h2>

          {timeline.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
              whileTap={isMobile ? { scale: 0.97, rotate: 2, boxShadow: "0 2px 36px #6366f1" } : {}}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring" }}
              style={{
                marginBottom: isMobile ? "2rem" : "3rem",
                padding: isMobile ? "1.5rem" : "2rem",
                borderRadius: isMobile ? "16px" : "20px",
                transformStyle: "preserve-3d",
                backdropFilter: "blur(12px)",
                background: isLight
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(20,20,20,0.75)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <small>{exp.period}</small>
              <h3>{exp.title}</h3>
              <i>{exp.subtitle}</i>
              <ul>
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= LEADERSHIP ================= */}
      <h2 style={{ marginTop: isMobile ? "3rem" : "6rem", fontSize: isMobile ? "1.8rem" : "2.3rem" }}>
        Leadership & Activities
      </h2>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
        style={{
          perspective: "1500px",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px,1fr))",
            gap: isMobile ? "1.5rem" : "2rem",
            maxWidth: "900px",
          }}
        >
          {leadership.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.08, z: 60, rotateX: 5, rotateY: -5 }}
              whileTap={isMobile ? { scale: 1.12, rotateZ: 3, z: 80 } : {}}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                padding: isMobile ? "1.5rem" : "2rem",
                borderRadius: isMobile ? "16px" : "22px",
                background: isLight
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(0,0,0,0.5)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 25px 45px rgba(0,0,0,0.25)",
                textAlign: "center",
                transformStyle: "preserve-3d",
                cursor: "pointer",
              }}
            >
              <motion.div
                style={{ transform: "translateZ(40px)", fontSize: 32 }}
              >
                {item.icon}
              </motion.div>
              <h4>{item.title}</h4>
              <p style={{ fontSize: 14, opacity: 0.75 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ================= CERTIFICATES ================= */}
      <h2 style={{ marginTop: isMobile ? "3rem" : "6rem", fontSize: isMobile ? "1.8rem" : "2.3rem" }}>
        My Certifications
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "3rem",
        }}
      >
        <motion.div
          key={currentCertIndex}
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          whileHover={{ scale: 1.06, rotateX: 6, rotateY: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            minWidth: isMobile ? "100%" : 300,
            maxWidth: isMobile ? "100%" : "auto",
            padding: isMobile ? "1.5rem" : "2.5rem",
            borderRadius: isMobile ? 16 : 24,
            background: isLight ? "#fff" : "#191919",
            boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
            transformStyle: "preserve-3d",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => setSelectedCert(certificates[currentCertIndex])}
        >
          <img
            src={certificates[currentCertIndex].image}
            alt=""
            style={{
              width: "100%",
              height: 140,
              objectFit: "cover",
              borderRadius: 14,
              marginBottom: 20,
              transform: "translateZ(30px)",
            }}
          />
          <h4>{certificates[currentCertIndex].title}</h4>
          <span>{certificates[currentCertIndex].issuer}</span>
          <br />
          <small>{certificates[currentCertIndex].period}</small>
        </motion.div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            onClick={() => setSelectedCert(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(circle, rgba(0,0,0,0.9), #000)",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <motion.img
              src={selectedCert.image}
              initial={{ scale: 0.85, rotateX: -10 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8 }}
              style={{ maxWidth: "90%", borderRadius: 14 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
