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
  `${baseUrl}photo4.jpeg`,
];

const photoPositions = [
  {
    desktop: {
      top: "17%",
      left: "56%",
    },
    mobile: {
      top: "10%",
      left: "65%",
    },
    rotate: -7,
  },
  {
    desktop: {
      top: "34%",
      left: "72%",
    },
    mobile: {
      top: "25%",
      left: "68%",
    },
    rotate: 8,
  },
  {
    desktop: {
      top: "52%",
      left: "57%",
    },
    mobile: {
      top: "43%",
      left: "60%",
    },
    rotate: -5,
  },
  {
    desktop: {
      top: "68%",
      left: "73%",
    },
    mobile: {
      top: "58%",
      left: "70%",
    },
    rotate: 6,
  },
];

export default function Hero() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imageParallaxX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-18, 18]
  );

  const imageParallaxY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-14, 14]
  );

  const textParallaxX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-5, 5]
  );

  const textParallaxY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-4, 4]
  );

  const glowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-100, 100]
  );

  const glowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-70, 70]
  );

  const handleMouseMove = (e) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };


  const getFloatAnimation = (index) => ({
    y: [0, -8, 0],
    rotate: [
      photoPositions[index].rotate,
      photoPositions[index].rotate + 2,
      photoPositions[index].rotate,
    ],
  });

  return (
    <section
      id="hero"
      className={`hero-section ${
        isLight ? "hero-light" : "hero-dark"
      }`}
      onMouseMove={handleMouseMove}
    >


      <div className="hero-grid" />

      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />


      <div className="hero-scroll-scene">
        <ScrollScene />
      </div>


      <motion.div
        className="hero-orbit hero-orbit-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="hero-orbit hero-orbit-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      <div className="hero-inner">


        <motion.div
          className="hero-content"
          style={{
            x: isMobile ? 0 : textParallaxX,
            y: isMobile ? 0 : textParallaxY,
          }}
        >
          {/* Availability badge */}

          <motion.div
            className="hero-badge"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            <span className="badge-dot" />
            Available for opportunities
          </motion.div>

          {/* Heading */}

          <motion.h1
            className="hero-title"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            Hi, I'm
            <br />

            <span className="hero-name">
              <TypewriterText
                text="Palak Goyal"
                speed={100}
              />
            </span>
          </motion.h1>

          {/* Accent line */}

          <motion.div
            className="hero-accent-line"
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: 72,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 1,
            }}
          />

          {/* Subtitle */}

          <motion.p
            className="hero-subtitle"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.1,
            }}
          >
            Aspiring Software Engineer
            <span>•</span>
            AI & ML Enthusiast
            <span>•</span>
            <br className="desktop-break" />
            Creative Developer
          </motion.p>

          {/* Description */}

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.35,
            }}
          >
            I design immersive web experiences, build
            intelligent systems, and love blending
            creativity with technology.
          </motion.p>

          {/* Buttons */}

          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.6,
            }}
          >
            <a
              href="#projects"
              className="hero-button primary"
            >
              View My Work
              <span>↗</span>
            </a>

            <a
              href="#contact"
              className="hero-button secondary"
            >
              Let's Connect
              <span>↗</span>
            </a>
          </motion.div>
        </motion.div>


        <div className="hero-visual">

          {/* Main glowing sphere */}

          <motion.div
            className="hero-sphere"
            animate={{
              scale: [1, 1.025, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Sphere inner glow */}

          <div className="sphere-glow" />

          {/* Floating photos */}

          {heroPhotos.map((photo, index) => {
            const position = photoPositions[index];

            return (
              <motion.div
                key={index}
                className={`hero-photo hero-photo-${index + 1}`}
                style={{
                  top: isMobile
                    ? position.mobile.top
                    : position.desktop.top,

                  left: isMobile
                    ? position.mobile.left
                    : position.desktop.left,

                  x: isMobile ? 0 : imageParallaxX,
                  y: isMobile ? 0 : imageParallaxY,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.08,
                        rotate: 0,
                        zIndex: 20,
                      }
                    : {}
                }
              >
                <motion.img
                  src={photo}
                  alt={`Portfolio ${index + 1}`}
                  animate={getFloatAnimation(index)}
                  transition={{
                    duration: 5 + index * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}

        </div>

      </div>



      {!isMobile && (
        <motion.div
          className="cursor-glow"
          style={{
            x: glowX,
            y: glowY,
          }}
        />
      )}

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <motion.div
        className="hero-scroll-indicator"
        animate={{
          y: [0, 7, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}

/* =========================================================
   CSS
========================================================= */

const style = document.createElement("style");

style.innerHTML = `

/* =========================================================
   HERO BASE
========================================================= */

.hero-section {
  position: relative;

  width: 100%;

  /*
    IMPORTANT:
    Keeps Hero as one complete viewport section.
  */
  height: 100vh;
  height: 100svh;

  min-height: 620px;

  overflow: hidden;

  isolation: isolate;

  flex-shrink: 0;

  box-sizing: border-box;

  font-family: inherit;
}


/* =========================================================
   LIGHT / DARK
========================================================= */

.hero-light {
  background:
    radial-gradient(
      circle at 65% 45%,
      rgba(115, 75, 255, 0.10),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #faf9ff 0%,
      #f4f2ff 50%,
      #ffffff 100%
    );

  color: #17152b;
}


.hero-dark {
  background:
    radial-gradient(
      circle at 65% 45%,
      rgba(105, 60, 255, 0.12),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #09090d 0%,
      #11101a 50%,
      #0b0a10 100%
    );

  color: #ffffff;
}


/* =========================================================
   GRID
========================================================= */

.hero-grid {
  position: absolute;

  inset: 0;

  background-size: 42px 42px;

  background-image:
    linear-gradient(
      rgba(130, 90, 255, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(130, 90, 255, 0.035) 1px,
      transparent 1px
    );

  mask-image:
    radial-gradient(
      ellipse at center,
      black 15%,
      transparent 85%
    );

  pointer-events: none;

  z-index: -10;
}


/* =========================================================
   GLOWS
========================================================= */

.hero-glow {
  position: absolute;

  width: 420px;
  height: 420px;

  border-radius: 50%;

  filter: blur(110px);

  pointer-events: none;

  z-index: -5;

  background:
    rgba(99, 50, 255, 0.12);
}


.hero-glow-one {
  top: -180px;
  left: 5%;
}


.hero-glow-two {
  right: -180px;
  bottom: -180px;
}


/* =========================================================
   SCROLL SCENE FIX
========================================================= */

/*
   This is important.

   ScrollScene must not increase the Hero's
   document height or push/overlap the next section.
*/

.hero-scroll-scene {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  pointer-events: none;

  z-index: 0;
}


/* =========================================================
   HERO INNER
========================================================= */

.hero-inner {
  position: relative;

  width: 100%;
  height: 100%;

  max-width: 1500px;

  margin: 0 auto;

  display: flex;

  align-items: center;

  box-sizing: border-box;

  padding:
    70px
    7%
    80px
    10%;
}


/* =========================================================
   TEXT
========================================================= */

.hero-content {
  position: relative;

  z-index: 10;

  width: 50%;

  max-width: 620px;

  margin-top: 20px;
}


/* =========================================================
   BADGE
========================================================= */

.hero-badge {
  display: inline-flex;

  align-items: center;

  gap: 9px;

  padding:
    7px 14px;

  margin-bottom: 20px;

  border-radius: 999px;

  font-size: 0.75rem;

  font-weight: 600;

  color: #a78bfa;

  background:
    rgba(109, 63, 255, 0.08);

  border:
    1px solid rgba(124, 77, 255, 0.28);

  backdrop-filter: blur(10px);
}


.badge-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #7c4dff;

  box-shadow:
    0 0 12px #7c4dff;
}


/* =========================================================
   TITLE
========================================================= */

.hero-title {
  margin: 0;

  font-size: clamp(
    3.5rem,
    5.8vw,
    6rem
  );

  font-weight: 800;

  line-height: 0.98;

  letter-spacing: -3px;
}


.hero-name {
  display: inline-block;

  color: #7040ff;

  text-shadow:
    0 0 30px rgba(112, 64, 255, 0.25);
}


/* =========================================================
   ACCENT
========================================================= */

.hero-accent-line {
  height: 3px;

  margin-top: 22px;

  border-radius: 999px;

  background:
    linear-gradient(
      90deg,
      #7c4dff,
      #9b6cff
    );

  box-shadow:
    0 0 15px rgba(124, 77, 255, 0.5);
}


/* =========================================================
   SUBTITLE
========================================================= */

.hero-subtitle {
  margin:
    20px 0 0;

  font-size:
    clamp(
      0.95rem,
      1.4vw,
      1.15rem
    );

  line-height: 1.8;

  font-weight: 600;

  color: #bdb9c9;
}


.hero-light .hero-subtitle {
  color: #57536a;
}


.hero-subtitle span {
  margin: 0 8px;

  color: #8055ff;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.hero-description {
  max-width: 520px;

  margin:
    14px 0 0;

  font-size:
    clamp(
      0.88rem,
      1.1vw,
      1rem
    );

  line-height: 1.7;

  color: #8f8b9b;
}


.hero-light .hero-description {
  color: #6a6677;
}


/* =========================================================
   BUTTONS
========================================================= */

.hero-buttons {
  display: flex;

  gap: 12px;

  margin-top: 27px;
}


.hero-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  min-height: 42px;

  padding:
    0 20px;

  border-radius: 999px;

  text-decoration: none;

  font-size: 0.85rem;

  font-weight: 600;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}


.hero-button span {
  transition:
    transform 0.3s ease;
}


.hero-button:hover span {
  transform:
    translate(3px, -3px);
}


.hero-button.primary {
  color: white;

  background:
    linear-gradient(
      135deg,
      #7c3cff,
      #6130e8
    );

  box-shadow:
    0 10px 25px
    rgba(102, 55, 255, 0.28);
}


.hero-button.primary:hover {
  transform: translateY(-3px);

  box-shadow:
    0 15px 35px
    rgba(102, 55, 255, 0.4);
}


.hero-button.secondary {
  color: #ddd9e8;

  border:
    1px solid rgba(255,255,255,0.15);

  background:
    rgba(255,255,255,0.04);
}


.hero-light .hero-button.secondary {
  color: #4d485b;

  border-color:
    rgba(60,50,90,0.18);

  background:
    rgba(255,255,255,0.65);
}


/* =========================================================
   VISUAL AREA
========================================================= */

.hero-visual {
  position: absolute;

  width: 52%;

  height: 82%;

  right: 2%;

  top: 9%;

  z-index: 4;
}

.hero-sphere {
  position: absolute;

  width: min(
    360px,
    30vw
  );

  height: min(
    360px,
    30vw
  );

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%);

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 35% 30%,
      #eeeeee,
      #c8c5d2 55%,
      #9d99a9 100%
    );

  box-shadow:
    0 0 80px
    rgba(130,100,255,0.12);

  z-index: 1;
}


.hero-dark .hero-sphere {
  background:
    radial-gradient(
      circle at 35% 30%,
      #e9e8ef,
      #c2bfcb 55%,
      #8e8999 100%
    );
}


.hero-sphere::after {
  content: "";

  position: absolute;

  inset: 0;

  border-radius: 50%;

  opacity: 0.18;

  background-image:
    radial-gradient(
      #514c5c 1px,
      transparent 1px
    );

  background-size: 8px 8px;

  mask-image:
    radial-gradient(
      circle,
      black 20%,
      transparent 75%
    );
}


.hero-orbit {
  position: absolute;

  border:
    1px solid
    rgba(125, 82, 255, 0.20);

  border-radius: 50%;

  pointer-events: none;

  z-index: 0;
}


.hero-orbit-one {
  width: 440px;
  height: 440px;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%);
}


.hero-orbit-two {
  width: 520px;
  height: 520px;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%)
    rotate(55deg);
}


.hero-photo {
  position: absolute;

  width: 125px;
  height: 125px;

  padding: 5px;

  border-radius: 18px;

  background:
    rgba(255,255,255,0.08);

  border:
    1px solid
    rgba(255,255,255,0.18);

  box-shadow:
    0 18px 45px
    rgba(0,0,0,0.35);

  backdrop-filter: blur(10px);

  transform-origin: center;

  transition:
    box-shadow 0.3s ease;

  box-sizing: border-box;
}


.hero-light .hero-photo {
  background:
    rgba(255,255,255,0.75);

  border-color:
    rgba(255,255,255,0.9);

  box-shadow:
    0 18px 40px
    rgba(50,35,100,0.16);
}


.hero-photo img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  border-radius: 13px;
}


.hero-photo-1 {
  z-index: 5;
}


.hero-photo-2 {
  z-index: 6;
}


.hero-photo-3 {
  z-index: 7;
}


.hero-photo-4 {
  z-index: 5;
}


.cursor-glow {
  position: absolute;

  width: 220px;
  height: 220px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(110,70,255,0.14),
      transparent 70%
    );

  filter: blur(30px);

  pointer-events: none;

  left: 45%;
  top: 35%;

  z-index: 2;
}


.hero-scroll-indicator {
  position: absolute;

  bottom: 24px;

  left: 50%;

  transform:
    translateX(-50%);

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 8px;

  z-index: 20;

  pointer-events: none;
}


.hero-scroll-indicator span {
  font-size: 0.58rem;

  letter-spacing: 2px;

  color: #777181;
}


.scroll-line {
  width: 1px;

  height: 24px;

  background:
    linear-gradient(
      to bottom,
      #7c4dff,
      transparent
    );
}

@media (max-width: 1100px) {

  .hero-inner {
    padding-left: 8%;
  }

  .hero-content {
    width: 52%;
  }

  .hero-title {
    font-size: 4.2rem;
  }

  .hero-visual {
    right: -5%;
    width: 55%;
  }

  .hero-photo {
    width: 105px;
    height: 105px;
  }

}

@media (max-width: 767px) {

  .hero-section {
    min-height: 100svh;

    height: 100svh;

    /*
      Prevent mobile browser address-bar
      from breaking the layout.
    */
    max-height: 100svh;
  }


  .hero-inner {
    height: 100%;

    min-height: 100%;

    display: block;

    padding:
      90px
      22px
      70px;
  }


  .hero-content {
    width: 100%;

    max-width: 100%;

    margin: 0;

    text-align: left;

    z-index: 20;
  }


  .hero-badge {
    font-size: 0.68rem;

    padding:
      6px 11px;

    margin-bottom: 17px;
  }


  .hero-title {
    font-size:
      clamp(
        3rem,
        14vw,
        4rem
      );

    line-height: 0.98;

    letter-spacing:
      -1.5px;
  }


  .hero-accent-line {
    margin-top: 17px;

    height: 3px;
  }


  .hero-subtitle {
    margin-top: 17px;

    font-size: 0.88rem;

    line-height: 1.7;
  }


  .hero-subtitle span {
    margin:
      0 4px;
  }


  .desktop-break {
    display: none;
  }


  .hero-description {
    max-width: 330px;

    font-size: 0.82rem;

    line-height: 1.65;

    margin-top: 12px;
  }


  .hero-buttons {
    margin-top: 20px;

    gap: 9px;
  }


  .hero-button {
    min-height: 40px;

    padding:
      0 15px;

    font-size: 0.72rem;
  }

  .hero-visual {
    position: absolute;

    width: 100%;

    height: 42%;

    left: 0;

    right: auto;

    top: auto;

    bottom: 2%;

    z-index: 3;
  }


  .hero-sphere {
    width: 190px;
    height: 190px;

    left: 52%;
    top: 50%;
  }


  .hero-orbit-one {
    width: 235px;
    height: 235px;
  }


  .hero-orbit-two {
    width: 285px;
    height: 285px;
  }


  .hero-photo {
    width: 78px;
    height: 78px;

    padding: 4px;

    border-radius: 14px;
  }


  .hero-photo img {
    border-radius: 10px;
  }


  .hero-photo-1 {
    top: 5% !important;
    left: 24% !important;
  }


  .hero-photo-2 {
    top: 25% !important;
    left: 66% !important;
  }


  .hero-photo-3 {
    top: 48% !important;
    left: 18% !important;
  }


  .hero-photo-4 {
    top: 62% !important;
    left: 62% !important;
  }


  .hero-scroll-indicator {
    display: none;
  }


  .hero-glow {
    width: 230px;
    height: 230px;

    filter: blur(80px);
  }


  .hero-scroll-scene {
    display: none;
  }

}

@media (max-width: 430px) {

  .hero-inner {
    padding:
      80px
      18px
      60px;
  }


  .hero-title {
    font-size: 2.9rem;
  }


  .hero-subtitle {
    font-size: 0.8rem;
  }


  .hero-description {
    font-size: 0.76rem;

    max-width: 300px;
  }


  .hero-button {
    min-height: 38px;

    padding:
      0 12px;

    font-size: 0.68rem;
  }


  .hero-visual {
    bottom: 1%;
  }


  .hero-sphere {
    width: 165px;
    height: 165px;
  }


  .hero-photo {
    width: 68px;
    height: 68px;
  }

}

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.01ms !important;
  }

}

`;

document.head.appendChild(style);