import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const images = [
  { src: "/photo1.jpeg", top: "8%", left: "6%", rotate: -12 },
  { src: "/photo7.jpeg", top: "18%", left: "72%", rotate: 10 },
  { src: "/photo3.jpeg", top: "58%", left: "8%", rotate: 8 },
  { src: "/photo10.jpeg", top: "62%", left: "70%", rotate: -10 },
  { src: "/photo9.jpeg", top: "40%", left: "88%", rotate: 6 },
  { src: "/photo2.jpeg", top: "78%", left: "40%", rotate: -8 },
];

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headingColor = isLight ? "#111827" : "#f9fafb";
  const subTextColor = isLight ? "#4b5563" : "#d1d5db";

  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        background: isLight
          ? "radial-gradient(circle at top, #ffffff, #f2f2f2)"
          : "radial-gradient(circle at top, #1a1a1a, #050505)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* GRID BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)"} 1px, transparent 1px),
                            linear-gradient(90deg, ${isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)"} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          opacity: 0.3,
        }}
      />

      {/* FLOATING IMAGES */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img.src}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -12, 0],
            rotate: [img.rotate, img.rotate + 2, img.rotate],
          }}
          transition={{
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.15,
            rotate: 0,
            zIndex: 10,
            boxShadow: isLight
              ? "0 50px 90px rgba(99,102,241,0.4)"
              : "0 50px 90px rgba(99,102,241,0.6)",
          }}
          whileTap={isMobile ? {
            scale: 1.25,
            rotateZ: 10,
            z: 100,
          } : {}}
          style={{
            position: "absolute",
            width: isMobile ? "95px" : "185px",
            height: isMobile ? "95px" : "185px",
            objectFit: "cover",
            borderRadius: "22px",
            top: isMobile ? `${parseFloat(img.top) * 0.6}%` : img.top,
            left: isMobile ? `${parseFloat(img.left) * 0.7}%` : img.left,
            boxShadow: isLight
              ? "0 25px 55px rgba(0,0,0,0.25)"
              : "0 25px 55px rgba(0,0,0,0.6)",
            border: isLight
              ? "2px solid rgba(255,255,255,0.8)"
              : "2px solid rgba(255,255,255,0.15)",
            display: isMobile && i > 3 ? "none" : "block",
          }}
        />
      ))}

      {/* CENTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 5,
          textAlign: "center",
          maxWidth: "560px",
          padding: isMobile ? "1.5rem" : "2rem",
          color: subTextColor,
          touchAction: isMobile ? "manipulation" : undefined
        }}
        whileTap={isMobile ? { scale: 0.96, rotate: 2, boxShadow: "0 2px 30px #6366f1" } : {}}
      >
        <div
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: isMobile ? "2.9rem" : "3.5rem",
            opacity: 0.85,
            marginBottom: "0.5rem",
            color: headingColor,
          }}
        >
          Let’s Connect
        </div>

        <p
          style={{
            lineHeight: 1.7,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            marginBottom: "2.4rem",
            color: subTextColor,
          }}
        >
          Conversations around code, creativity, ideas, and meaningful
          collaborations. If something resonates, let’s build it together.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.9rem",
          }}
        >
          <ConnectBtn
            label="LinkedIn"
            href="https://linkedin.com/in/palak-goyal/"
            isLight={isLight}
          />
          <ConnectBtn
            label="GitHub"
            href="https://github.com/pgoyal19"
            isLight={isLight}
          />
          <ConnectBtn
            label="Email"
            href="mailto:palakgoyal0119@gmail.com"
            isLight={isLight}
          />
          <ConnectBtn
            label="To Know Me More (Resume)"
            href="/Palak_Goyal_Resume.pdf"
            isLight={isLight}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ================= BUTTON ================= */

function ConnectBtn({ label, href, isLight }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, y: -6, rotateZ: 2, boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}
      whileTap={{ scale: 0.92, rotateZ: -3 }}
      style={{
        padding: "12px 24px",
        borderRadius: "999px",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: 500,
        color: isLight ? "#4f46e5" : "#f9fafb",
        background: isLight
          ? "rgba(79,70,229,0.12)"
          : "rgba(255,255,255,0.06)",
        border: isLight
          ? "1px solid rgba(79,70,229,0.35)"
          : "1px solid rgba(255,255,255,0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {label} ↗
    </motion.a>
  );
}
