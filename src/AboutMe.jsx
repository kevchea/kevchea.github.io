import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import desktop_bgVideo from "./assets/aboutme.mp4";
import mobile_bgVideo from "./assets/mobile_aboutme.mp4";
import mainme from "./assets/profilepic.jpg";
import phoneMods from "./assets/phoneMods.jpg";

import maincat from "./assets/cat1.jpg";
import cat2 from "./assets/cat2.jpg";

import maindog from "./assets/yuki1.jpg";
import dog2 from "./assets/yuki2.jpg";
import dog3 from "./assets/yuki3.jpg";


import cam1 from "./assets/profilepic.jpg";
import cam2 from "./assets/cat1.jpg";
import cam3 from "./assets/yuki1.jpg";
import cam0 from "./assets/static.gif";

import char1 from "./assets/meicon.png";
import char2 from "./assets/caticon.png";
import char3 from "./assets/huskyicon.png";


const CHARS = [char1, char2, char3];
const CAMERA_PREVIEWS = [cam1, cam2, cam3, cam0];
const ABOUTME_IMAGES = [mainme, phoneMods];
const CAT_IMAGES = [maincat, cat2];
const DOG_IMAGES = [maindog, dog2, dog3];
const REVEAL_IMAGE_SETS = [
  ABOUTME_IMAGES,
  CAT_IMAGES,
  DOG_IMAGES,
];



const REVEAL_CONTENT = [
  {
    upper: [
      "I've always loved tinkering, so much to the point I started my own business doing repairs",
      " and modifications to devices since junior high. I'm a hands on person.",
      "but I still like developing hence why I'm in Computer Engineering.",
    ],
    lower: [
      "I'm also a pretty competitive person which motivates me to want to do many different",
      "things. My other hobbies include: Soccer, Skateboarding, and competitive eSports.",
    ],
  },
  {
    upper: [
      "This is Meow Meows! While my parents were on vacation in Canada, we decided to give this",
      "lil guy a temp home as he was being bullied by the neighborhood strays. Since we had a husky,",
      "my parents didn't want another pet but I was able to take care of Yuki and teach this guy how to",
      "do his business in the toilet! My parents initially weren't happy quickly changed their minds :p"
    ],
    lower: [
      "We didn't plan to actually be able to keep him so his name was meows meows and it",
      "and it stuck when my parents came back and liked the name LOL",
    ],
  },
  {
    upper: [
      "This is Yuki! I got him when he was 4 months old!",
      "He's such a silly boy and literally did not stay this small for long at all",
      "He loved playing tug of war and fetch",
    ],
    lower: "sadly, he is no longer with us, he ran away into a creek and we never found him </3",
  },
];

const ROLES = [
  { text: "", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },

];

const ITEMS = [
  {
    id: "1",
    label: "About me"
  },
  {
    id: "2",
    label: "My lazy cat"
  },
  {
    id: "3",
    label: "My Mischievious Husky"
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [staticOn, setStatic] = useState(false);
  const [revealImageIndex, setRevealImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 768
      const isPortrait = window.innerHeight > window.innerWidth
      setIsMobile(isNarrow || isPortrait)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const background = isMobile ? mobile_bgVideo : desktop_bgVideo;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setRevealImageIndex(0);
  }, [active]);

useEffect(() => {
  const onKey = (e) => {
    if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
    if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
    if (e.key === "Enter") setRevealed(true), setPaused(true);
    if (e.key === "ArrowRight") setRevealed(true), setPaused(true);
    if (e.key === "ArrowLeft") {
      if (revealed) setRevealed(false);
      else navigate(-1);
    }
    if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
  };

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) < 8) return;

    setActive(i => {
      if (e.deltaY < 0) return Math.max(0, i - 1);
      return Math.min(ITEMS.length - 1, i + 1);
    });
  };

let touchStartY = 0;
    let touchEndY = 0;
    const MIN_SWIPE = 40;

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchEndY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      if (!isMobile) return;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) < MIN_SWIPE) return;
      setActive((i) => {
        if (diff > 0) return Math.min(ITEMS.length - 1, i + 1); // swipe up
        return Math.max(0, i - 1); // swipe down
      });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigate, revealed, isMobile]);

  useEffect(() => {
    if (!paused || !revealed) return;

    const handleAnywhereClick = () => {
      setPaused(false);
      setRevealed(false);
    };

    window.addEventListener("click", handleAnywhereClick);

    return () => {
      window.removeEventListener("click", handleAnywhereClick);
    };
  }, [paused, revealed]);

  useEffect(() => {
    setStatic(true);

    const t = setTimeout(() => {
      setStatic(false);
    }, 100);

    return () => clearTimeout(t);
  }, [active]);

  return (
    <div id="menu-screen">
      <video src={background} autoPlay muted playsInline />
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
        { (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span
            className="sc-nav-btn"
            onClick={() => {
            if (revealed) {
              setRevealed(false);
              setPaused(false);
            } else {
              navigate(-1);
              }
            }
          }
          >
            Back
          </span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">
            {Array.isArray(REVEAL_CONTENT[active].lower)
              ? REVEAL_CONTENT[active].lower.map((line) => (
                  <div key={line}>{line}</div>
                ))
              : <div>{REVEAL_CONTENT[active].lower}</div>
            }
          </div>
        </div>
      )}
      {revealed && !isMobile && (
        <div
          key={`portrait-${active}`}
          className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}
          onClick={(e) => {
            e.stopPropagation();

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const currentSet = REVEAL_IMAGE_SETS[active];

            if (x < rect.width / 2) {
              setRevealImageIndex((prev) => (prev - 1 + currentSet.length) % currentSet.length);
            } else {
              setRevealImageIndex((prev) => (prev + 1) % currentSet.length);
            }
          }}
        >
          <img
            className="sc-main-portrait"
            src={REVEAL_IMAGE_SETS[active][revealImageIndex]}
          />
        <span className="sc-portrait-arrow left">◄</span>
        <span className="sc-portrait-arrow right">►</span>
        </div>
      )}

      {revealed && isMobile && (
        <div
          className="sc-camera-screen"
          onClick={(e) => {
            e.stopPropagation();

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const currentSet = REVEAL_IMAGE_SETS[active];

            if (x < rect.width / 2) {
              setRevealImageIndex((prev) => (prev - 1 + currentSet.length) % currentSet.length);
            } else {
              setRevealImageIndex((prev) => (prev + 1) % currentSet.length);
            }
          }}
          
        >
          <img
            className="camera-img"
            src={REVEAL_IMAGE_SETS[active][revealImageIndex]}
            alt=""
          />
          <span className="sc-portrait-arrow left">◄</span>
          <span className="sc-portrait-arrow right">►</span>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: ${isMobile ? "2px" : "6px"};
          padding-left: 0;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: ${isMobile ? "" : "translateX(-120px) rotate(-20deg) scaleX(0.72)"};

          }
          60% {
            opacity: 0.96;
            transform: ${isMobile ? "" : "translateX(18px) rotate(-20deg) scaleX(1.03)"};
          }
          100% {
            opacity: 0.92;
            transform: ${isMobile ? "" : "translateX(0) rotate(-20deg) scaleX(1);"};
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
  top: ${isMobile ? "0" : "0"};
  right: ${isMobile ? "-18vw" : "-3vw"};
          z-index: 13;
          pointer-events: auto;
  width: ${isMobile ? "60vw" : "43vw"};
  height: ${isMobile ? "100vh" : "100vh"};
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .sc-portrait-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #c4001a;
          z-index: 20;
          pointer-events: none;
          opacity: 0.9;
        }

        /* left side */
        .sc-portrait-arrow.left {
          left: ${isMobile ? "0" : "12px"};
          animation: sc-arrow-left 0.8s ease-in-out infinite;
        }

        /* right side */
        .sc-portrait-arrow.right {
          right: ${isMobile ? "0px" : "60px"};
          animation: sc-arrow-right 0.8s ease-in-out infinite;
        }

        .sc-reveal-panel {
          position: absolute;
          top: ${isMobile ? "25vh" : "44vh"};
          left: ${isMobile ? "0vw" : "-6vw"};
          width: ${isMobile ? "100vw" : "88vw"};
          height: ${isMobile ? "38vh" : "60vh"};
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path:  "polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: ${isMobile ? "" : "translateX(-40px) rotate(-20deg)"};
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: ${isMobile ? "" : "translateX(-40px) rotate(-20deg)"};
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: ${isMobile ? "45%" : "40%"};
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
          padding-right: 15px;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
  font-size: ${isMobile ? "12px" : "20px"};
          letter-spacing: 0.5px;
          line-height: 1.15;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 100%;
          height: ${isMobile ? "35%" : "30%"};
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
  font-size: ${isMobile ? "13px" : "22px"};
          letter-spacing: 0.4px;
          text-transform: lowercase;
          padding: 0 22px;
          text-align: center;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
          pointer-events: auto;

        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: ${isMobile ? "80vw" : "45vw"};
          height: ${isMobile ? "64px" : "64px"};
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
            pointer-events: auto;

        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            pointer-events: none;

        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        
        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: ${isMobile ? "80vw" : "45vw"};
          height: ${isMobile ? "64px" : "64px"};
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: ${isMobile ? "polygon(22% 0, 100% 0, calc(100% - 4px) 100%, 35% 100%)" : "polygon(22% 0, 100% 0, calc(100% - 4px) 100%, calc(22% + 138px) 100%)"};
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: ${isMobile ? "65px" : "78px"};
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: ${isMobile ? "10px" : "110px"};
          height: 100%;
          width: auto;
          max-width: ${isMobile ? "100px" : "160px"};
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* hints */
        .sc-hint {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-hint.mounted { opacity: 1; }
        .sc-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(0, 0, 0, 0.6);
        }
        .sc-hint-key {
          border: 1px solid rgba(0, 0, 0, 0.6);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
        .sc-camera-screen {
          position: absolute;
          top: ${isMobile ? "67%" : "620px"};
          right: ${isMobile ? "12.5%" : "260px"};
          width: ${isMobile ? "33%" : "460px"};
          height: ${isMobile ? "18%" : "320px"};
          overflow: hidden;
          transform: rotate(27deg) skewX(-4deg);
          border-radius: 8px;
            clip-path: polygon(2% 2%, 98% 14%, 100% 100%, 0% 100%);
            clip-path: ${isMobile ? "polygon(2% 2%, 98% 14%, 100% 100%, 0% 100%);" : "polygon(2% 2%, 100% 24%, 100% 100%, 0% 100%)"};
          pointer-events: auto;
          cursor: pointer;
          z-index: 14;
        }
        .camera-img {
          width: 120%;
          height: 120%;
          transform: translate(-10%, -10%);
        }
      `}
      </style>

      {mounted && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
        {ITEMS.map((item, i) => (
          <button
            key={item.id}
            onMouseEnter={() => {
              if (paused && revealed) return;
              setActive(i);
            }}
            onClick={(e) => {
              e.stopPropagation();

              if (paused) return;

              setActive(i);
              setRevealed(true);
              setPaused(true);
            }}
            style={{
              width: isMobile ? "78vw" : "45vw",
              height: isMobile ? "80px" : "78px",
              background: "transparent",
              border: "none",
              cursor: paused ? "default" : "pointer",
            }}
          />
        ))}
      </div>
    )}

    <div className="sc-root" role="navigation">
      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
        >
          <div className="sc-bar-red" />
          <div className="sc-bar">
            <img className="sc-char" src={CHARS[i]} alt="" />
            <div className="sc-bar-fill" />
            <div className="sc-bar-shade" />
            <div className="sc-bar-content">
              <div className="sc-role">{ROLES[i].text}</div>
              <div className="sc-main">
                <div className="sc-main-top">
                  <div className="sc-label">{item.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {mounted && !revealed && (
      <div className="sc-camera-screen">
        <img
          src={staticOn ? CAMERA_PREVIEWS[3] : CHARS[active]}
          className="camera-img"
        />
      </div>
    )}
    {!isMobile && (
      <div className={`sc-hint${mounted ? " mounted" : ""}`}>
        <div className="sc-hint-row"><span className="sc-hint-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-hint-row"><span className="sc-hint-key">↵</span><span>REVEAL</span></div>
        <div className="sc-hint-row"><span className="sc-hint-key">ESC</span><span>BACK</span></div>
      </div>
    )}
    </div>
  );
}
