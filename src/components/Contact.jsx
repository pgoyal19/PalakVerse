import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const baseUrl = import.meta.env.BASE_URL;

const images = [
  {
    src: `${baseUrl}photo1.jpeg`,
    className: "contact-img-1",
    rotate: -10,
  },
  {
    src: `${baseUrl}photo7.jpeg`,
    className: "contact-img-2",
    rotate: 9,
  },
  {
    src: `${baseUrl}photo3.jpeg`,
    className: "contact-img-3",
    rotate: 8,
  },
  {
    src: `${baseUrl}photo10.jpeg`,
    className: "contact-img-4",
    rotate: -8,
  },
  {
    src: `${baseUrl}photo9.jpeg`,
    className: "contact-img-5",
    rotate: 7,
  },
  {
    src: `${baseUrl}photo2.jpeg`,
    className: "contact-img-6",
    rotate: -6,
  },
];

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  return (
    <>
      <section
        id="contact"
        className={`contact-section ${
          isLight ? "contact-light" : "contact-dark"
        }`}
      >
        {/* ================= BACKGROUND ================= */}

        <div className="contact-background-grid" />

        <div className="contact-orb contact-orb-one" />
        <div className="contact-orb contact-orb-two" />
        <div className="contact-orb contact-orb-three" />

        {/* Decorative dotted circles */}

        <div className="dotted-circle dotted-circle-one" />
        <div className="dotted-circle dotted-circle-two" />

        {/* ================= FLOATING PHOTOS ================= */}

        <div className="contact-images">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`contact-image-wrapper ${image.className}`}
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [
                  image.rotate,
                  image.rotate + 2,
                  image.rotate,
                ],
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
                zIndex: 50,
              }}
              whileTap={{
                scale: 1.05,
              }}
            >
              <img
                src={image.src}
                alt={`Portfolio memory ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>

        {/* ================= CENTER CONTENT ================= */}

        <motion.div
          className="contact-content"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          {/* Small badge */}

          <motion.div
            className="contact-badge"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <span className="badge-icon">✦</span>
            Get In Touch
          </motion.div>

          {/* Heading */}

          <motion.h1
            className="contact-title"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            Let’s <span>Connect</span>
          </motion.h1>

          <div className="title-line">
            <span />
            <span />
            <span />
          </div>

          {/* Description */}

          <motion.p
            className="contact-description"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
          >
            Conversations around code, creativity, ideas, and meaningful
            collaborations.
            <br />
            If something resonates, let’s build it together.
          </motion.p>

          {/* ================= BUTTONS ================= */}

          <motion.div
            className="contact-buttons"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
          >
            <ConnectBtn
              label="LinkedIn"
              icon="in"
              href="https://linkedin.com/in/palak-goyal-924741319"
              isLight={isLight}
            />

            <ConnectBtn
              label="GitHub"
              icon="◉"
              href="https://github.com/pgoyal19"
              isLight={isLight}
            />

            <ConnectBtn
              label="Email"
              icon="✉"
              href="mailto:palakgoyal0119@gmail.com"
              isLight={isLight}
            />

            <ConnectBtn
              label="To Know Me More (Resume)"
              icon="▤"
              href={`${baseUrl}Palak_Goyal_Resume.pdf`}
              isLight={isLight}
              large
            />
          </motion.div>

          {/* Bottom message */}

          <motion.div
            className="contact-bottom-text"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >
            <span>✦</span>

            <p>
              I reply to all meaningful messages.
              <br />
              Let’s create something impactful 💜
            </p>

            <span>✦</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= ALL CSS IN SAME FILE ================= */}

      <style>{`

        /* =====================================================
           CONTACT SECTION
        ===================================================== */

        .contact-section {
          position: relative;
          min-height: 100vh;
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          isolation: isolate;

          padding: 90px 80px 70px 120px;

          box-sizing: border-box;

          transition:
            background 0.5s ease,
            color 0.5s ease;
        }


        /* =====================================================
           LIGHT MODE
        ===================================================== */

        .contact-light {
          color: #17152b;

          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(255, 255, 255, 1) 0%,
              rgba(248, 247, 255, 0.98) 42%,
              rgba(237, 234, 250, 1) 100%
            );
        }


        /* =====================================================
           DARK MODE
        ===================================================== */

        .contact-dark {
          color: #f8f7ff;

          background:
            radial-gradient(
              circle at 50% 35%,
              #25203c 0%,
              #11101c 48%,
              #07070d 100%
            );
        }


        /* =====================================================
           BACKGROUND GRID
        ===================================================== */

        .contact-background-grid {
          position: absolute;
          inset: 0;

          background-size: 42px 42px;

          background-image:
            linear-gradient(
              rgba(104, 76, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(104, 76, 255, 0.035) 1px,
              transparent 1px
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black 10%,
              transparent 80%
            );

          pointer-events: none;

          z-index: -5;
        }


        .contact-dark .contact-background-grid {
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
        }


        /* =====================================================
           PURPLE GLOW ORBS
        ===================================================== */

        .contact-orb {
          position: absolute;

          width: 320px;
          height: 320px;

          border-radius: 50%;

          background: rgba(111, 61, 255, 0.10);

          filter: blur(90px);

          pointer-events: none;

          z-index: -3;

          animation: contactOrbFloat 9s ease-in-out infinite;
        }


        .contact-orb-one {
          top: -120px;
          left: 8%;
        }


        .contact-orb-two {
          right: -120px;
          top: 30%;

          animation-delay: -3s;
        }


        .contact-orb-three {
          left: 30%;
          bottom: -180px;

          animation-delay: -6s;
        }


        @keyframes contactOrbFloat {

          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(25px, -20px) scale(1.1);
          }

        }


        /* =====================================================
           DECORATIVE CIRCLES
        ===================================================== */

        .dotted-circle {
          position: absolute;

          width: 170px;
          height: 170px;

          border: 1px dashed rgba(116, 79, 255, 0.25);

          border-radius: 50%;

          pointer-events: none;

          z-index: -1;

          animation: rotateCircle 25s linear infinite;
        }


        .dotted-circle::before,
        .dotted-circle::after {
          content: "";

          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #7146ff;

          box-shadow:
            0 0 15px rgba(113, 70, 255, 0.7);
        }


        .dotted-circle::before {
          top: 0;
          left: 50%;
        }


        .dotted-circle::after {
          right: 5%;
          bottom: 20%;
        }


        .dotted-circle-one {
          top: 7%;
          left: 20%;
        }


        .dotted-circle-two {
          right: 17%;
          bottom: 8%;

          width: 140px;
          height: 140px;

          animation-direction: reverse;
        }


        @keyframes rotateCircle {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }


        /* =====================================================
           IMAGE CONTAINER
        ===================================================== */

        .contact-images {
          position: absolute;
          inset: 0;

          pointer-events: none;

          z-index: 2;
        }


        /* =====================================================
           IMAGE CARDS
        ===================================================== */

        .contact-image-wrapper {
          position: absolute;

          width: 155px;
          height: 155px;

          padding: 7px;

          background: rgba(255, 255, 255, 0.72);

          border: 1px solid rgba(255, 255, 255, 0.95);

          border-radius: 24px;

          box-shadow:
            0 20px 45px rgba(39, 25, 91, 0.16),
            0 4px 12px rgba(39, 25, 91, 0.08);

          overflow: hidden;

          pointer-events: auto;

          cursor: pointer;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          transition:
            box-shadow 0.4s ease,
            border 0.4s ease;
        }


        .contact-image-wrapper:hover {
          box-shadow:
            0 30px 70px rgba(101, 61, 255, 0.28);

          border-color: rgba(124, 86, 255, 0.55);
        }


        .contact-image-wrapper img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          border-radius: 18px;
        }


        /* =====================================================
           IMAGE POSITIONS
           
           3 IMAGES LEFT
           3 IMAGES RIGHT
        ===================================================== */

        /* LEFT - TOP */
        .contact-img-1 {
          top: 4%;
          left: 7%;
        }


        /* RIGHT - TOP */
        .contact-img-2 {
          top: 7%;
          right: 6%;
        }


        /* LEFT - CENTER */
        .contact-img-3 {
          top: 40%;
          left: 5%;
        }


        /* RIGHT - CENTER */
        .contact-img-4 {
          top: 43%;
          right: 6%;
        }


        /* LEFT - BOTTOM */
        .contact-img-5 {
          bottom: 7%;
          left: 8%;
        }


        /* RIGHT - BOTTOM */
        .contact-img-6 {
          bottom: 6%;
          right: 8%;
        }


        /* =====================================================
           CENTER CONTENT
        ===================================================== */

        .contact-content {
          position: relative;

          z-index: 10;

          width: min(780px, 100%);

          text-align: center;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 20px;
        }


        /* =====================================================
           BADGE
        ===================================================== */

        .contact-badge {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          padding: 10px 20px;

          border-radius: 999px;

          color: #6535e8;

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.8),
              rgba(239, 232, 255, 0.75)
            );

          border: 1px solid rgba(121, 83, 255, 0.18);

          box-shadow:
            0 8px 25px rgba(101, 61, 255, 0.08);

          font-size: 0.9rem;

          font-weight: 600;

          margin-bottom: 24px;

          backdrop-filter: blur(12px);
        }


        .badge-icon {
          font-size: 1.1rem;

          animation: sparkle 2s ease-in-out infinite;
        }


        @keyframes sparkle {

          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }

          50% {
            transform: scale(1.25) rotate(10deg);
          }

        }


        /* =====================================================
           TITLE
        ===================================================== */

        .contact-title {
          margin: 0;

          font-family: "Pacifico", cursive;

          font-size: clamp(
            3.2rem,
            7vw,
            5.7rem
          );

          line-height: 1.05;

          letter-spacing: -2px;

          color: #17152b;
        }


        .contact-dark .contact-title {
          color: #ffffff;
        }


        .contact-title span {
          color: #6840f5;

          text-shadow:
            0 8px 35px rgba(104, 64, 245, 0.18);
        }


        /* =====================================================
           TITLE DECORATION
        ===================================================== */

        .title-line {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 5px;

          margin-top: 8px;
          margin-bottom: 28px;
        }


        .title-line span {
          height: 4px;

          border-radius: 999px;

          background: #6b3df5;
        }


        .title-line span:nth-child(1) {
          width: 18px;
          opacity: 0.35;
        }


        .title-line span:nth-child(2) {
          width: 55px;
        }


        .title-line span:nth-child(3) {
          width: 18px;
          opacity: 0.35;
        }


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .contact-description {
          max-width: 650px;

          margin: 0 auto 38px;

          font-size: clamp(
            0.95rem,
            2vw,
            1.12rem
          );

          line-height: 1.8;

          color: #66657a;

          letter-spacing: 0.1px;
        }


        .contact-dark .contact-description {
          color: #c6c3d5;
        }


        /* =====================================================
           BUTTON CONTAINER
        ===================================================== */

        .contact-buttons {
          display: flex;

          align-items: center;
          justify-content: center;

          flex-wrap: wrap;

          gap: 14px;

          width: 100%;

          max-width: 700px;
        }


        /* =====================================================
           CONTACT BUTTON
        ===================================================== */

        .connect-button {
          position: relative;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 12px;

          min-width: 175px;

          min-height: 62px;

          padding: 10px 22px;

          border-radius: 999px;

          text-decoration: none;

          color: #29263c;

          background:
            rgba(255, 255, 255, 0.68);

          border: 1px solid rgba(112, 73, 245, 0.18);

          box-shadow:
            0 10px 30px rgba(75, 45, 150, 0.08);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);

          font-size: 0.95rem;

          font-weight: 600;

          transition:
            background 0.3s ease,
            box-shadow 0.3s ease,
            border 0.3s ease;
        }


        .contact-dark .connect-button {
          color: #f8f7ff;

          background:
            rgba(255, 255, 255, 0.07);

          border-color:
            rgba(255, 255, 255, 0.15);
        }


        .connect-button:hover {
          background:
            rgba(255, 255, 255, 0.95);

          border-color:
            rgba(105, 61, 245, 0.4);

          box-shadow:
            0 18px 45px rgba(99, 62, 245, 0.2);
        }


        .contact-dark .connect-button:hover {
          background:
            rgba(255, 255, 255, 0.12);
        }


        /* =====================================================
           BUTTON ICON
        ===================================================== */

        .button-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 13px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #7c4dff,
              #5723df
            );

          font-size: 1rem;

          font-weight: 700;

          box-shadow:
            0 7px 18px rgba(93, 44, 230, 0.25);

          transition:
            transform 0.3s ease;
        }


        .connect-button:hover .button-icon {
          transform: rotate(-6deg) scale(1.08);
        }


        .button-arrow {
          font-size: 1.1rem;

          margin-left: 2px;

          transition:
            transform 0.3s ease;
        }


        .connect-button:hover .button-arrow {
          transform: translate(4px, -4px);
        }


        /* =====================================================
           RESUME BUTTON
        ===================================================== */

        .connect-button.resume {
          min-width: 280px;
        }


        /* =====================================================
           BOTTOM MESSAGE
        ===================================================== */

        .contact-bottom-text {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 18px;

          margin-top: 48px;

          color: #89879a;
        }


        .contact-bottom-text p {
          margin: 0;

          font-family: "Pacifico", cursive;

          font-size: 0.95rem;

          line-height: 1.7;
        }


        .contact-bottom-text span {
          color: #7043f5;

          font-size: 1.1rem;

          animation: sparkle 2.5s ease-in-out infinite;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {

          .contact-section {
            padding-left: 105px;
            padding-right: 40px;
          }


          .contact-image-wrapper {
            width: 125px;
            height: 125px;

            border-radius: 20px;
          }


          .contact-img-1 {
            left: 3%;
          }


          .contact-img-2 {
            right: 3%;
          }


          .contact-img-3 {
            left: 2%;
          }


          .contact-img-4 {
            right: 3%;
          }


          .contact-img-5 {
            left: 4%;
          }


          .contact-img-6 {
            right: 4%;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 768px) {

          .contact-section {
            min-height: 100svh;

            padding:
              90px
              18px
              110px;

            align-items: center;
          }


          .contact-content {
            width: 100%;

            padding: 20px 8px;
          }


          /* Mobile photos */

          .contact-image-wrapper {
            width: 78px;
            height: 78px;

            padding: 5px;

            border-radius: 17px;

            opacity: 0.8;
          }


          .contact-image-wrapper img {
            border-radius: 12px;
          }


          /* TOP LEFT */

          .contact-img-1 {
            top: 5%;
            left: 3%;
          }


          /* TOP RIGHT */

          .contact-img-2 {
            top: 6%;
            right: 3%;
          }


          /* MIDDLE LEFT */

          .contact-img-3 {
            top: 45%;
            left: 2%;
          }


          /* MIDDLE RIGHT */

          .contact-img-4 {
            top: 45%;
            right: 2%;
          }


          /* BOTTOM LEFT */

          .contact-img-5 {
            bottom: 13%;
            left: 4%;
          }


          /* BOTTOM RIGHT */

          .contact-img-6 {
            bottom: 13%;
            right: 4%;
          }


          .contact-title {
            font-size:
              clamp(
                2.7rem,
                13vw,
                4rem
              );

            letter-spacing: -1px;
          }


          .contact-description {
            font-size: 0.92rem;

            line-height: 1.7;

            max-width: 370px;

            margin-bottom: 30px;
          }


          .contact-description br {
            display: none;
          }


          .contact-badge {
            font-size: 0.78rem;

            padding: 8px 15px;

            margin-bottom: 18px;
          }


          .title-line {
            margin-bottom: 22px;
          }


          .contact-buttons {
            display: grid;

            grid-template-columns: 1fr 1fr;

            gap: 11px;

            max-width: 400px;
          }


          .connect-button {
            width: 100%;

            min-width: 0;

            min-height: 54px;

            padding: 7px 10px;

            gap: 7px;

            font-size: 0.78rem;
          }


          .button-icon {
            width: 34px;
            height: 34px;

            border-radius: 10px;

            font-size: 0.82rem;
          }


          .button-arrow {
            font-size: 0.9rem;
          }


          .connect-button.resume {
            grid-column: 1 / -1;

            min-width: 0;
          }


          .contact-bottom-text {
            margin-top: 32px;

            gap: 8px;
          }


          .contact-bottom-text p {
            font-size: 0.78rem;
          }


          .contact-bottom-text span {
            font-size: 0.8rem;
          }


          .dotted-circle {
            width: 100px;
            height: 100px;

            opacity: 0.5;
          }


          .dotted-circle-one {
            top: 14%;
            left: 15%;
          }


          .dotted-circle-two {
            right: 12%;
            bottom: 18%;
          }


          .contact-orb {
            width: 220px;
            height: 220px;

            filter: blur(75px);
          }

        }


        /* =====================================================
           SMALL PHONES
        ===================================================== */

        @media (max-width: 430px) {

          .contact-section {
            padding-left: 14px;
            padding-right: 14px;
          }


          .contact-title {
            font-size: 2.65rem;
          }


          .contact-description {
            font-size: 0.87rem;
          }


          .contact-buttons {
            max-width: 330px;

            gap: 9px;
          }


          .connect-button {
            min-height: 50px;

            font-size: 0.72rem;

            padding:
              6px 7px;
          }


          .button-icon {
            width: 30px;
            height: 30px;

            font-size: 0.72rem;
          }


          .contact-image-wrapper {
            width: 65px;
            height: 65px;
          }


          .contact-bottom-text {
            margin-top: 25px;
          }


          .contact-bottom-text p {
            font-size: 0.7rem;
          }

        }


        /* =====================================================
           VERY SMALL PHONES
        ===================================================== */

        @media (max-width: 360px) {

          .contact-title {
            font-size: 2.4rem;
          }


          .contact-badge {
            font-size: 0.7rem;
          }


          .connect-button {
            min-height: 48px;

            font-size: 0.68rem;
          }


          .button-icon {
            width: 27px;
            height: 27px;
          }

        }


        /* =====================================================
           LARGE SCREENS
        ===================================================== */

        @media (min-width: 1500px) {

          .contact-section {
            padding-left: 140px;
          }


          .contact-image-wrapper {
            width: 190px;
            height: 190px;

            border-radius: 28px;
          }


          .contact-content {
            width: 850px;
          }


          .contact-title {
            font-size: 6rem;
          }


          .contact-description {
            font-size: 1.2rem;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .contact-orb,
          .dotted-circle,
          .badge-icon,
          .contact-bottom-text span {
            animation: none !important;
          }

        }

      `}</style>
    </>
  );
}


/* =========================================================
   CONTACT BUTTON
========================================================= */

function ConnectBtn({
  label,
  icon,
  href,
  large = false,
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`connect-button ${large ? "resume" : ""}`}
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <span className="button-icon">
        {icon}
      </span>

      <span>{label}</span>

      <span className="button-arrow">
        ↗
      </span>
    </motion.a>
  );
}