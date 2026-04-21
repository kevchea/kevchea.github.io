import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import meicon from "./assets/meicon.png";
import caticon from "./assets/caticon.png";
import huskyicon from "./assets/huskyicon.png";
import musicicon from "./assets/musicicon.png";
import pcicon from "./assets/pcicon.png";
import clawicon from "./assets/clawicon.png";
import skateicon from "./assets/skateicon.png";
import pokericon from "./assets/pokericon.png";

import round1win2 from "./assets/round1win2.png";
import ruby1 from "./assets/ruby1.jpg";
import pcfirst from "./assets/pcfirst.jpg";

import pinkskateboard from "./assets/pink_skateboard.jpg";
import scizor_cards from "./assets/scizor_cards.jpg";
import poker1 from "./assets/poker1.jpg";

import background from "./assets/idleBlog.mp4";


const CHARS = [meicon,caticon,huskyicon,musicicon,pcicon,clawicon,skateicon,pokericon];

const ROLES = [
  { text: "", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    label: "Sep 30th, 2022",
    icon: "🎮",
    char: clawicon,
    panelTitle: "Round 1",
    panelBody: [
      "Great day with my girlfriend!",
      "$80 Spent, Resell value: $300",
      "Brown Rilakuma: $20, Pink Rilakuma: $20",
      "Dino Bear: $18, BT21 Rabbit: $21",
      "2x Pink Sugar Cubs: $80, 2x Brown Sugar Cubs: $80",
      "2x Tonkatsu: $36, Hello Kitty in Bunny Outfit: $25",
    ],
    blogImage: [round1win2, ruby1],
  },
  {
    label: "Feb 27th, 2024",
    icon: "📷",
    char: pcicon,
    panelTitle: "Built Custom PC - 1st Boot!",
    panelBody: [
      "Next Steps: Add 3 Intakes, 3 Exhaust, and replace original 24 pin with strimer 24 pin",
    ],
    blogImage: pcfirst,
  },
  {
    label: "Sep 18th, 2025",
    icon: "🎵",
    char: pokericon,
    panelTitle: "SIG Co-Op Poker Tournament",
    panelBody: [
      "This was a practice round but I got to the final table in the actual tournament!",
    ],
    blogImage: poker1,
  },
  {
    label: "Sep 27th, 2025",
    icon: "🎵",
    char: clawicon,
    panelTitle: "First card show pick ups",
    panelBody: [
      "If you can't tell, Scizor is my favorite pokemon!",
    ],
    blogImage: scizor_cards,
  },
  {
    label: "Nov 6th, 2025",
    icon: "🎮",
    char: skateicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been cruising for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: pinkskateboard,
  },
  {
    label: "PLACEHOLDER",
    icon: "🎮",
    char: meicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been cruising for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: clawicon,
  },
  {
    label: "PLACEHOLDER",
    icon: "🎮",
    char: meicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been crusing for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: clawicon,
  },
  {
    label: "PLACEHOLDER",
    icon: "🎮",
    char: meicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been crusing for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: clawicon,
  },
  {
    label: "PLACEHOLDER",
    icon: "🎮",
    char: meicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been crusing for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: clawicon,
  },
  {
    label: "PLACEHOLDER",
    icon: "🎮",
    char: meicon,
    panelTitle: "Cherry Blossom koi fish board",
    panelBody: [
      "Been crusing for a while but thought I'd build my first board and do tricks!",
    ],
    blogImage: clawicon,
  },
];

const MAX_VISIBLE = 7;

function parseBlogDate(label) {
  const cleaned = label.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const time = new Date(cleaned).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function Blogs() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); // "left" | "right"
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(sortedItems.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) < 8) return;

    setActive(i => {
      if (e.deltaY < 0) return Math.max(0, i - 1);
      return Math.min(ITEMS.length - 1, i + 1);
    });
  };

  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", onWheel, { passive: true });

  return () => {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("wheel", onWheel);
  };
    }, [active, navigate, focus]);

  const sortedItems = [...ITEMS].sort(
    (a, b) => parseBlogDate(b.label) - parseBlogDate(a.label)
  );

  const start = Math.min(
    active,
    Math.max(0, sortedItems.length - MAX_VISIBLE)
  );

  const end = start + MAX_VISIBLE;
  const visibleItems = sortedItems.slice(start, end);
  const currentItem = sortedItems[active];


  return (
    <div id="menu-screen">
      <video src={background} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute;
          top: 42%;
          left: 0;
          right: 0;
          bottom: auto;

          transform: translateY(-45px);
          z-index: 10;
          pointer-events: none;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 6px;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 35vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }
        .sc-bar-outer:nth-child(4) { transition-delay: 240ms; }
        .sc-bar-outer:nth-child(5) { transition-delay: 300ms; }
        .sc-bar-outer:nth-child(6) { transition-delay: 360ms; }
        

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 35vw;
          height: 64px;
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
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 43%;
          width: 12%;
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
          align-items: left;
          justify-content: center;
          gap: 3px;
          padding-left: 230px;
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

        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }
        .sc-nav-arrow {
          font-size: 12px;
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
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

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 65%;
          height: 46px;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* hints */
        .sc-hint {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
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
        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 7.5vw;
          width: min(39vw, 960px);
          min-height: 80vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 20px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-date {
          margin-top: 18px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: #8ef5ff;
        }

        .resume-detail-body {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: rgba(235, 245, 255, 0.92);
        }

        .resume-detail-body p {
          margin: 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          line-height: 1.1;
        }
        .resume-detail-image-wrap {
          margin-top: 18px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          align-items: start;
        }

        .resume-detail-image-card {
          width: 100%;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(142, 245, 255, 0.22);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
          background: rgba(255,255,255,0.03);
        }

        .resume-detail-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }
      `}</style>

      <div className="sc-right-nav">
        <span className="sc-nav-arrow left">◄</span>
        <span
          className="sc-nav-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </span>
        <span className="sc-nav-arrow right">►</span>
      </div>

      <div className="sc-root" role="navigation">
      {visibleItems.map((item, i) => {
        const realIndex = start + i;

        return (
          <div
            key={item.id}
            className={`sc-bar-outer${active === realIndex ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(realIndex);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={item.char || CHARS[0]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[realIndex % ROLES.length].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <div className="resume-detail-panel" key={currentItem.label}>
      <div className="resume-detail-top">
        <div className="resume-detail-top-index">{currentItem.id}</div>
        <div className="resume-detail-top-title">{currentItem.panelTitle}</div>
        <div className="resume-detail-top-progress">
          {String(active + 1).padStart(2, "0")}/{String(sortedItems.length).padStart(2, "0")}
        </div>
      </div>

      <div className="resume-detail-date">{currentItem.label}</div>

      <div className="resume-detail-body">
        {currentItem.panelBody.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="resume-detail-image-wrap">
        {(Array.isArray(currentItem.blogImage) ? currentItem.blogImage : [currentItem.blogImage])
          .filter(Boolean)
          .map((img, i) => (
            <div className="resume-detail-image-card" key={i}>
              <img className="resume-detail-image" src={img} alt="" />
            </div>
          ))}
      </div>
    </div>
    <div className={`sc-hint${mounted ? " mounted" : ""}`}>
      <div className="sc-hint-row"><span className="sc-hint-key">↑↓</span><span>SELECT</span></div>
      <div className="sc-hint-row"><span className="sc-hint-key">↵</span><span>OPEN</span></div>
      <div className="sc-hint-row"><span className="sc-hint-key">ESC</span><span>BACK</span></div>
    </div>
      
  </div>
  );
}