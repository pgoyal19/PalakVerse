import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [7, -7]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-7, 7]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

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

  const size = isMobile ? 330 : 600;
  const orbitRadius = isMobile ? 125 : 230;

  return (
    <>
      <section
        id="about"
        className={`about-section ${isLight ? "about-light" : "about-dark"}`}
      >
        <div className="about-background" />

        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-eyebrow">
            <span>✦</span> ABOUT ME
          </span>

          <h2>
            Career <span>Objective</span>
          </h2>

          <div className="about-line">
            <span />
            <span />
            <span />
          </div>

          <p>
            Building ideas, solving problems, and continuously growing
            through technology.
          </p>
        </motion.div>

        <div className="about-stage">
          <motion.div
            className="orbit-wrapper"
            style={{
              width: size,
              height: size,
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
          >
            <div className="orbit-glow" />

            <motion.div
              className="orbit-ring ring-one"
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="orbit-ring ring-two"
              animate={{ rotate: -360 }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="orbit-ring ring-three"
              animate={{ rotate: 360 }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="about-center-card"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >
              <div className="center-icon">
                <FaLaptopCode />
              </div>

              <h3>My Career Goal</h3>

              <p>
                To secure a challenging position in the field of computer
                science where I can apply my knowledge and skills in{" "}
                <strong>software development, data analysis</strong> and
                emerging technologies.
              </p>

              <p className="center-secondary">
                I aim to contribute to innovative projects while continually
                enhancing my technical abilities to achieve organizational
                and personal growth.
              </p>
            </motion.div>

            {icons.map(({ Icon, label }, index) => {
              const angle = (360 / icons.length) * index;

              return (
                <motion.div
                  key={label}
                  className="orbit-item-container"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.08,
                  }}
                >
                  <motion.div
                    className="orbit-item"
                    style={{
                      transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`,
                    }}
                    whileHover={!isMobile ? { scale: 1.25 } : undefined}
                    whileTap={isMobile ? { scale: 1.2 } : undefined}
                  >
                    <div className="orbit-icon">
                      <Icon />
                    </div>

                    <span>{label}</span>
                  </motion.div>
                </motion.div>
              );
            })}

            <div className="orbit-dot dot-one" />
            <div className="orbit-dot dot-two" />
            <div className="orbit-dot dot-three" />
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="stat-card">
            <FaCode />
            <div>
              <strong>Development</strong>
              <span>Building digital experiences</span>
            </div>
          </div>

          <div className="stat-card">
            <FaBrain />
            <div>
              <strong>AI & ML</strong>
              <span>Exploring intelligent systems</span>
            </div>
          </div>

          <div className="stat-card">
            <FaRocket />
            <div>
              <strong>Growth</strong>
              <span>Always learning & improving</span>
            </div>
          </div>
        </motion.div>
      </section>

      <style>{`
        .about-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 110px 40px 90px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          isolation: isolate;
        }

        .about-light {
          background:
            radial-gradient(
              circle at 50% 35%,
              #ffffff 0%,
              #f8f7ff 45%,
              #efedfa 100%
            );
          color: #17152b;
        }

        .about-dark {
          background:
            radial-gradient(
              circle at 50% 30%,
              #171329 0%,
              #0b0a12 48%,
              #050505 100%
            );
          color: #f8f7ff;
        }

        .about-background {
          position: absolute;
          inset: 0;
          z-index: -5;
          opacity: 0.6;
          background-image:
            linear-gradient(
              rgba(112, 72, 255, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(112, 72, 255, 0.045) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          mask-image: radial-gradient(
            ellipse at center,
            black 15%,
            transparent 78%
          );
        }

        .about-dark .about-background {
          opacity: 0.35;
        }

        .about-header {
          position: relative;
          z-index: 5;
          width: min(720px, 100%);
          text-align: center;
          margin-bottom: 10px;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid rgba(112, 72, 255, 0.22);
          border-radius: 999px;
          background: rgba(112, 72, 255, 0.07);
          color: #7043f5;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.4px;
          backdrop-filter: blur(12px);
        }

        .about-eyebrow span {
          animation: aboutSparkle 2s ease-in-out infinite;
        }

        .about-header h2 {
          margin: 18px 0 8px;
          font-size: clamp(2.5rem, 5vw, 4.3rem);
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .about-header h2 span {
          color: #7043f5;
          text-shadow: 0 8px 30px rgba(112, 67, 245, 0.2);
        }

        .about-line {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          margin: 15px 0 18px;
        }

        .about-line span {
          height: 4px;
          border-radius: 999px;
          background: #7043f5;
        }

        .about-line span:nth-child(1),
        .about-line span:nth-child(3) {
          width: 16px;
          opacity: 0.35;
        }

        .about-line span:nth-child(2) {
          width: 55px;
        }

        .about-header p {
          margin: 0 auto;
          max-width: 600px;
          color: #777487;
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .about-dark .about-header p {
          color: #aaa6b9;
        }

        .about-stage {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 5px;
        }

        .orbit-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          perspective: 1200px;
        }

        .orbit-glow {
          position: absolute;
          width: 52%;
          height: 52%;
          border-radius: 50%;
          background: rgba(112, 67, 245, 0.12);
          filter: blur(70px);
          pointer-events: none;
        }

        .about-dark .orbit-glow {
          background: rgba(112, 67, 245, 0.18);
        }

        .orbit-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          border: 1px solid rgba(112, 67, 245, 0.18);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .ring-one {
          width: 68%;
          height: 68%;
        }

        .ring-two {
          width: 82%;
          height: 42%;
          transform: translate(-50%, -50%) rotate(28deg);
        }

        .ring-three {
          width: 92%;
          height: 55%;
          transform: translate(-50%, -50%) rotate(-25deg);
          opacity: 0.55;
        }

        .about-center-card {
          position: relative;
          z-index: 10;
          width: 270px;
          min-height: 270px;
          padding: 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow:
            0 25px 70px rgba(45, 30, 100, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .about-dark .about-center-card {
          background: rgba(18, 16, 28, 0.72);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .center-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 13px;
          border-radius: 15px;
          color: white;
          background: linear-gradient(135deg, #7c4dff, #5421dc);
          box-shadow: 0 10px 25px rgba(100, 60, 240, 0.3);
          font-size: 1.15rem;
        }

        .about-center-card h3 {
          margin: 0 0 12px;
          font-size: 1.05rem;
          font-weight: 800;
        }

        .about-center-card p {
          margin: 0;
          color: #666375;
          font-size: 0.8rem;
          line-height: 1.65;
        }

        .about-dark .about-center-card p {
          color: #c3bfce;
        }

        .about-center-card strong {
          color: #7043f5;
        }

        .center-secondary {
          margin-top: 12px !important;
          font-size: 0.74rem !important;
          opacity: 0.8;
        }

        .orbit-item-container {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
        }

        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 65px;
          height: 65px;
          margin-left: -32.5px;
          margin-top: -32.5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 18px;
          color: #706d7d;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(112, 72, 255, 0.12);
          box-shadow: 0 12px 30px rgba(45, 30, 100, 0.1);
          backdrop-filter: blur(12px);
          pointer-events: auto;
          cursor: pointer;
        }

        .about-dark .orbit-item {
          color: #d4d0dc;
          background: rgba(24, 22, 34, 0.72);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .orbit-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #7043f5;
          background: rgba(112, 67, 245, 0.1);
        }

        .orbit-item span {
          font-size: 0.58rem;
          font-weight: 700;
          opacity: 0.75;
        }

        .orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7043f5;
          box-shadow: 0 0 15px rgba(112, 67, 245, 0.8);
        }

        .dot-one {
          top: 14%;
          left: 20%;
        }

        .dot-two {
          right: 16%;
          top: 27%;
        }

        .dot-three {
          left: 18%;
          bottom: 19%;
        }

        .about-stats {
          width: min(900px, 100%);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: -20px;
          position: relative;
          z-index: 20;
        }

        .stat-card {
          min-height: 72px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 16px;
          box-sizing: border-box;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.52);
          border: 1px solid rgba(112, 72, 255, 0.12);
          backdrop-filter: blur(15px);
          box-shadow: 0 12px 30px rgba(45, 30, 100, 0.07);
        }

        .about-dark .stat-card {
          background: rgba(255, 255, 255, 0.045);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .stat-card > svg {
          flex-shrink: 0;
          color: #7043f5;
          font-size: 1.15rem;
        }

        .stat-card div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .stat-card strong {
          font-size: 0.78rem;
        }

        .stat-card span {
          color: #858191;
          font-size: 0.68rem;
        }

        .about-dark .stat-card span {
          color: #aaa6b5;
        }

        @keyframes aboutSparkle {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }

          50% {
            transform: scale(1.25) rotate(12deg);
          }
        }

        @media (max-width: 1100px) {
          .about-section {
            padding-left: 30px;
            padding-right: 30px;
          }

          .about-stats {
            width: min(760px, 100%);
          }

          .orbit-item {
            width: 58px;
            height: 58px;
            margin-left: -29px;
            margin-top: -29px;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            min-height: auto;
            padding: 80px 16px 70px;
          }

          .about-header {
            margin-bottom: 10px;
          }

          .about-header h2 {
            font-size: 2.35rem;
            letter-spacing: -1px;
          }

          .about-header p {
            font-size: 0.85rem;
            max-width: 350px;
          }

          .about-stage {
            margin-top: 0;
          }

          .orbit-wrapper {
            width: 330px !important;
            height: 330px !important;
          }

          .orbit-ring {
            opacity: 0.65;
          }

          .ring-two,
          .ring-three {
            opacity: 0.4;
          }

          .about-center-card {
            width: 205px;
            min-height: 205px;
            padding: 21px 18px;
            border-radius: 25px;
          }

          .center-icon {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            font-size: 0.95rem;
            margin-bottom: 9px;
          }

          .about-center-card h3 {
            font-size: 0.9rem;
            margin-bottom: 8px;
          }

          .about-center-card p {
            font-size: 0.68rem;
            line-height: 1.5;
          }

          .center-secondary {
            font-size: 0.63rem !important;
            margin-top: 7px !important;
          }

          .orbit-item {
            width: 46px;
            height: 46px;
            margin-left: -23px;
            margin-top: -23px;
            border-radius: 13px;
            gap: 2px;
          }

          .orbit-icon {
            width: 21px;
            height: 21px;
            border-radius: 7px;
            font-size: 0.75rem;
          }

          .orbit-item span {
            font-size: 0.47rem;
          }

          .orbit-dot {
            width: 4px;
            height: 4px;
          }

          .about-stats {
            grid-template-columns: 1fr;
            gap: 9px;
            width: min(390px, 100%);
            margin-top: 15px;
          }

          .stat-card {
            min-height: 62px;
            padding: 11px 14px;
          }

          .stat-card strong {
            font-size: 0.75rem;
          }

          .stat-card span {
            font-size: 0.64rem;
          }
        }

        @media (max-width: 430px) {
          .about-section {
            padding: 70px 12px 60px;
          }

          .about-header h2 {
            font-size: 2rem;
          }

          .about-eyebrow {
            font-size: 0.62rem;
            padding: 7px 13px;
          }

          .about-header p {
            font-size: 0.78rem;
          }

          .orbit-wrapper {
            width: 300px !important;
            height: 300px !important;
          }

          .about-center-card {
            width: 185px;
            min-height: 185px;
            padding: 18px 15px;
          }

          .about-center-card h3 {
            font-size: 0.82rem;
          }

          .about-center-card p {
            font-size: 0.61rem;
          }

          .center-secondary {
            font-size: 0.56rem !important;
          }

          .orbit-item {
            width: 41px;
            height: 41px;
            margin-left: -20.5px;
            margin-top: -20.5px;
          }

          .orbit-icon {
            width: 18px;
            height: 18px;
            font-size: 0.65rem;
          }

          .orbit-item span {
            font-size: 0.42rem;
          }
        }

        @media (max-width: 360px) {
          .about-section {
            padding-left: 9px;
            padding-right: 9px;
          }

          .about-header h2 {
            font-size: 1.8rem;
          }

          .orbit-wrapper {
            width: 280px !important;
            height: 280px !important;
          }

          .about-center-card {
            width: 170px;
            min-height: 170px;
            padding: 15px 12px;
          }

          .about-center-card p {
            font-size: 0.57rem;
          }

          .center-secondary {
            display: none;
          }

          .orbit-item {
            width: 38px;
            height: 38px;
            margin-left: -19px;
            margin-top: -19px;
          }

          .orbit-item span {
            display: none;
          }

          .orbit-icon {
            width: 20px;
            height: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-eyebrow span {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}