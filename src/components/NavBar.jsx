import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const sections = [
  { id: "hero", label: "Home", icon: "⌂" },
  { id: "about", label: "About", icon: "●" },
  { id: "skills", label: "Skills", icon: "✦" },
  { id: "education", label: "Education", icon: "▣" },
  { id: "experience", label: "Experience", icon: "◷" },
  { id: "projects", label: "Projects", icon: "◇" },
  { id: "contact", label: "Contact", icon: "✉" },
];

export default function NavBar() {
  const [active, setActive] = useState("hero");

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || "light";

  const isLight = theme === "light";

  /* =====================================================
     ACTIVE SECTION DETECTION
  ===================================================== */

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let currentSection = "hero";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  const handleClick = (e, id) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      const isMobile = window.innerWidth <= 768;

      const offset = isMobile ? 20 : 0;

      const elementPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <motion.nav
        className={`navbar ${isLight ? "light" : "dark"}`}
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        {/* =================================================
            DESKTOP TOP BRAND / DECORATION
        ================================================= */}

        <div className="navbar-top">
          <div className="navbar-dot" />
        </div>

        {/* =================================================
            NAVIGATION ITEMS
        ================================================= */}

        <div className="navbar-items">
          {sections.map((section, index) => {
            const isActive = active === section.id;

            return (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) =>
                  handleClick(e, section.id)
                }
                className={`nav-item ${
                  isActive ? "active" : ""
                }`}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.4 + index * 0.05,
                  duration: 0.4,
                }}
                whileHover={{
                  scale: 1.04,
                  x: 4,
                }}
                whileTap={{
                  scale: 0.94,
                }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="active-nav-background"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="active-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon */}
                <span className="nav-icon">
                  {section.icon}
                </span>

                {/* Label */}
                <span className="nav-label">
                  {section.label}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* =================================================
            DESKTOP BOTTOM DECORATION
        ================================================= */}

        <div className="navbar-bottom">
          <span />
          <span />
          <span />
        </div>
      </motion.nav>

      {/* =====================================================
          ALL CSS IN SAME FILE
      ===================================================== */}

      <style>{`

        /* =====================================================
           ROOT NAVBAR
        ===================================================== */

        .navbar {
          position: fixed;

          left: 14px;
          top: 14px;
          bottom: 14px;

          width: 82px;

          display: flex;
          flex-direction: column;
          align-items: center;

          z-index: 9999;

          border: 1px solid;

          border-radius: 24px;

          overflow: hidden;

          box-sizing: border-box;

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          transition:
            background 0.35s ease,
            border 0.35s ease,
            box-shadow 0.35s ease;

          isolation: isolate;
        }


        /* =====================================================
           LIGHT NAVBAR
        ===================================================== */

        .navbar.light {
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.94),
              rgba(249, 248, 255, 0.88)
            );

          border-color:
            rgba(110, 75, 230, 0.12);

          box-shadow:
            0 12px 40px rgba(44, 30, 90, 0.10),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        }


        /* =====================================================
           DARK NAVBAR
        ===================================================== */

        .navbar.dark {
          background:
            linear-gradient(
              180deg,
              rgba(24, 22, 34, 0.95),
              rgba(12, 11, 18, 0.92)
            );

          border-color:
            rgba(255, 255, 255, 0.10);

          box-shadow:
            0 15px 45px rgba(0, 0, 0, 0.55),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        }


        /* =====================================================
           TOP DECORATION
        ===================================================== */

        .navbar-top {
          width: 100%;

          height: 58px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }


        .navbar-dot {
          width: 11px;
          height: 11px;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              #8b5cf6,
              #5b21b6
            );

          box-shadow:
            0 0 0 6px rgba(124, 77, 255, 0.08),
            0 0 22px rgba(124, 77, 255, 0.35);
        }


        /* =====================================================
           NAV ITEMS CONTAINER
        ===================================================== */

        .navbar-items {
          width: 100%;

          flex: 1;

          display: flex;
          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 6px;

          padding: 8px 5px;

          box-sizing: border-box;
        }


        /* =====================================================
           NAV ITEM
        ===================================================== */

        .nav-item {
          position: relative;

          width: 100%;

          min-height: 54px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 4px;

          padding: 7px 4px;

          border-radius: 16px;

          box-sizing: border-box;

          text-decoration: none;

          overflow: hidden;

          transition:
            color 0.25s ease,
            background 0.25s ease;
        }


        /* =====================================================
           ACTIVE BACKGROUND
        ===================================================== */

        .active-nav-background {
          position: absolute;

          inset: 2px;

          border-radius: 14px;

          z-index: -1;

          background:
            linear-gradient(
              135deg,
              rgba(124, 77, 255, 0.14),
              rgba(124, 77, 255, 0.05)
            );

          border:
            1px solid rgba(124, 77, 255, 0.12);
        }


        .navbar.dark .active-nav-background {
          background:
            linear-gradient(
              135deg,
              rgba(139, 92, 246, 0.22),
              rgba(139, 92, 246, 0.07)
            );

          border-color:
            rgba(139, 92, 246, 0.18);
        }


        /* =====================================================
           ICON
        ===================================================== */

        .nav-icon {
          position: relative;

          z-index: 2;

          width: 30px;
          height: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;

          font-size: 16px;

          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }


        .navbar.light .nav-icon {
          color: #8a8795;

          background:
            rgba(0, 0, 0, 0.035);
        }


        .navbar.dark .nav-icon {
          color: #777382;

          background:
            rgba(255, 255, 255, 0.045);
        }


        .nav-item:hover .nav-icon {
          transform: translateY(-2px);

          color: #7043f5;
        }


        .nav-item.active .nav-icon {
          color: white;

          background:
            linear-gradient(
              135deg,
              #7c4dff,
              #5b21b6
            );

          box-shadow:
            0 5px 15px rgba(99, 54, 220, 0.30);
        }


        /* =====================================================
           LABEL
        ===================================================== */

        .nav-label {
          position: relative;

          z-index: 2;

          font-size: 10px;

          line-height: 1;

          font-weight: 500;

          letter-spacing: 0.1px;

          white-space: nowrap;

          transition:
            color 0.25s ease,
            font-weight 0.25s ease;
        }


        .navbar.light .nav-label {
          color: #898692;
        }


        .navbar.dark .nav-label {
          color: #777382;
        }


        .nav-item:hover .nav-label {
          color: #7043f5;
        }


        .nav-item.active .nav-label {
          color: #2a2538;

          font-weight: 700;
        }


        .navbar.dark .nav-item.active .nav-label {
          color: #ffffff;
        }


        /* =====================================================
           ACTIVE INDICATOR
        ===================================================== */

        .active-indicator {
          position: absolute;

          left: 2px;

          top: 50%;

          transform: translateY(-50%);

          width: 3px;
          height: 28px;

          border-radius: 0 6px 6px 0;

          background:
            linear-gradient(
              180deg,
              #8b5cf6,
              #5b21b6
            );

          box-shadow:
            0 0 12px rgba(124, 77, 255, 0.45);
        }


        /* =====================================================
           BOTTOM DECORATION
        ===================================================== */

        .navbar-bottom {
          height: 42px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 4px;

          flex-shrink: 0;
        }


        .navbar-bottom span {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #8b5cf6;

          opacity: 0.55;
        }


        .navbar-bottom span:nth-child(2) {
          width: 6px;
          height: 6px;

          opacity: 1;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) and (min-width: 769px) {

          .navbar {
            width: 70px;

            left: 10px;
            top: 10px;
            bottom: 10px;

            border-radius: 20px;
          }


          .navbar-top {
            height: 48px;
          }


          .nav-item {
            min-height: 48px;
          }


          .nav-icon {
            width: 27px;
            height: 27px;

            font-size: 14px;
          }


          .nav-label {
            font-size: 9px;
          }

        }


        /* =====================================================
           MOBILE BOTTOM NAVBAR
        ===================================================== */

        @media (max-width: 768px) {

          .navbar {

            position: fixed;

            left: 8px;
            right: 8px;

            top: auto;

            bottom:
              max(
                8px,
                env(safe-area-inset-bottom)
              );

            width: auto;

            height: 70px;

            min-height: 70px;

            padding:
              6px
              5px;

            display: flex;

            flex-direction: row;

            align-items: center;

            justify-content: center;

            border-radius: 22px;

            overflow: hidden;

            box-sizing: border-box;

            /* IMPORTANT:
               No horizontal scrolling */
            overflow-x: hidden;
            overflow-y: hidden;

            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
          }


          /* =================================================
             MOBILE TOP/BOTTOM DECORATIONS HIDDEN
          ================================================= */

          .navbar-top,
          .navbar-bottom {
            display: none;
          }


          /* =================================================
             MOBILE ITEMS
          ================================================= */

          .navbar-items {

            width: 100%;
            height: 100%;

            flex: 1;

            display: flex;

            flex-direction: row;

            align-items: center;

            justify-content: space-between;

            gap: 2px;

            padding: 0;

            min-width: 0;
          }


          /* =================================================
             MOBILE NAV ITEM
          ================================================= */

          .nav-item {

            flex: 1 1 0;

            width: 0;

            min-width: 0;

            height: 58px;
            min-height: 58px;

            margin: 0;

            padding: 4px 2px;

            border-radius: 16px;

            gap: 3px;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;
          }


          /* =================================================
             MOBILE ICON
          ================================================= */

          .nav-icon {

            width: 27px;
            height: 27px;

            border-radius: 9px;

            font-size: 14px;

            flex-shrink: 0;
          }


          /* =================================================
             MOBILE LABEL
          ================================================= */

          .nav-label {

            display: block;

            width: 100%;

            overflow: hidden;

            text-overflow: ellipsis;

            text-align: center;

            font-size: 8.5px;

            line-height: 1;

            letter-spacing: -0.1px;
          }


          /* =================================================
             MOBILE ACTIVE INDICATOR
          ================================================= */

          .active-indicator {

            left: 50%;

            top: auto;

            bottom: 2px;

            transform: translateX(-50%);

            width: 22px;
            height: 3px;

            border-radius: 999px;
          }


          /* =================================================
             MOBILE ACTIVE BACKGROUND
          ================================================= */

          .active-nav-background {

            inset: 2px;

            border-radius: 14px;
          }


          /* =================================================
             REMOVE HOVER MOVEMENT
          ================================================= */

          .nav-item:hover {

            transform: none !important;
          }


          .nav-item:active {

            transform: scale(0.94);
          }

        }


        /* =====================================================
           SMALL PHONES
        ===================================================== */

        @media (max-width: 480px) {

          .navbar {

            left: 6px;
            right: 6px;

            bottom:
              max(
                6px,
                env(safe-area-inset-bottom)
              );

            height: 66px;

            min-height: 66px;

            padding: 5px 4px;

            border-radius: 20px;
          }


          .nav-item {

            height: 56px;
            min-height: 56px;

            padding: 3px 1px;

            border-radius: 14px;
          }


          .nav-icon {

            width: 25px;
            height: 25px;

            border-radius: 8px;

            font-size: 13px;
          }


          .nav-label {

            font-size: 8px;

            letter-spacing: -0.2px;
          }


          .active-indicator {

            width: 19px;

            height: 3px;
          }

        }


        /* =====================================================
           VERY SMALL PHONES
        ===================================================== */

        @media (max-width: 360px) {

          .navbar {

            left: 4px;
            right: 4px;

            height: 62px;

            min-height: 62px;

            padding: 4px 3px;

            border-radius: 18px;
          }


          .nav-item {

            height: 53px;
            min-height: 53px;

            border-radius: 13px;
          }


          .nav-icon {

            width: 23px;
            height: 23px;

            font-size: 12px;
          }


          .nav-label {

            font-size: 7px;
          }


          .active-indicator {

            width: 17px;
          }

        }


        /* =====================================================
           ACCESSIBILITY
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .navbar,
          .nav-item,
          .nav-icon,
          .nav-label {

            transition: none !important;
          }

        }

      `}</style>
    </>
  );
}