import { useState, useEffect } from "react";

const ITEMS = [
  { id: "about",   label: "ABOUT",      page: "about",   fontSize: 80, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 10  },
  { id: "resume",  label: "RESUME",        page: "resume",  fontSize: 66, offsetX: 20, offsetY: 8,  skew: -11, skewY: -10 },
  { id: "projects",  label: "PROJECTS",   page: "projects",  fontSize: 68, offsetX: 8, offsetY: 6,  skew: 0, skewY: -4  },
  { id: "blogs", label: "BLOGS",       page: "blogs", fontSize: 74, offsetX: 16, offsetY: 8,  skew: -3,  skewY: 5   },
  { id: "github",label: "GITHUB LINK", link: "https://github.com/kevchea/kevchea2.github.io", fontSize: 56, offsetX: 10, offsetY: 6,  skew: -4,  skewY: 7   },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function Index({ onNavigate, isMobile = false }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page);
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

  }, [active]);

  return (
    <>
      <style>{`
        .overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; pointer-events:none; }
        .stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(245,122,139,0.22); z-index:10; pointer-events:none; }

        .menu {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: all;
          gap: "2px";
          transform: translateX(${isMobile ? "120px" : "240px"});
        }

        .row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,100,180,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .row.active .glow { opacity: 1; }

        .skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(235, 80, 120, 0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .shadow-tri.pop {
          animation: shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }

        .label-wrap {
          position: relative;
          z-index: 3;
        }

        .label-base {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
        }

        .label-dark {
          color: #3ce2ff;
          transition: color 0.12s ease;
        }
        .row.active .label-dark { color: #6b0010; }
        .row:hover:not(.active) .label-dark { color: #00d9ff; }

        .label-bright {
          color: #ff2a2a;
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .row.active .label-bright { opacity: 1; }

        .hint {
          position: absolute;
          bottom: ${isMobile ? "14px" : "24px"};
          right: ${isMobile ? "12px" : "28px"};
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .hint.mounted { opacity: 1; }
        .hint-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: ${isMobile ? "10px" : "13px"};
          letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .title-tag {
          position: absolute;
          top: ${isMobile ? "200px" : "0px"};
          left: ${isMobile ? "24px" : "180px"};
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: ${isMobile ? "52px" : "108px"};
          line-height: .94;
          letter-spacing: 2px;
          color: rgba(10, 10, 14, 0.64);
          transform: rotate(${isMobile ? "10deg" : "18deg"});
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .title-tag span:first-child {
          color: rgba(0, 0, 0, 0.86);
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      .sc-right-nav {
        position: absolute;
        top: ${isMobile ? "92vh" : "80vh"};
        left: ${isMobile ? "30vw" : "65vw"};
        display: flex;
        align-items: center;
        gap: ${isMobile ? "2px" : "6px"};
        pointer-events: auto;
        z-index: 14;
        transform: translateX(${isMobile ? "-50%" : "-40px"}) rotate(${isMobile ? "0deg" : "-20deg"});
        transform-origin: left bottom;
        animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
      }

      .sc-right-nav .sc-nav-btn {
        font-family: 'Bebas Neue', sans-serif;
        font-size: ${isMobile ? "20px" : "40px"};
        letter-spacing: ${isMobile ? "1px" : "3px"};
        line-height: 1;
        user-select: none;
        color: #fff;
        -webkit-text-stroke: ${isMobile ? "1px" : "2px"} #000;
        paint-order: stroke fill;
        background: none;
        border: none;
        padding: 0 6px;
      }

      .sc-right-nav .sc-nav-arrow {
        font-family: 'Bebas Neue', sans-serif;
        font-size: ${isMobile ? "14px" : "22px"};
        color: #c4001a;
        display: inline-block;
        user-select: none;
      }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

      `}</style>

      <div className="overlay">
        <div className="title-tag">
          <span>Welcome to</span>
          <span>my Site!!</span>
        </div>
        <div className="stripe" />
        <div className="stripe2" />

        <nav className="menu">
          {ITEMS.map((item, i) => {
            const scale = isMobile ? 0.62 : 1;
            const fontSize = Math.round(item.fontSize * scale);
            const offsetX = Math.round(item.offsetX * scale);
            const offsetY = Math.round(item.offsetY * scale);
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * fontSize * 0.6 + (isMobile ? 42 : 80);
            const estH = fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href="#"
                className={`row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: offsetX,
                  marginTop: offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === "github") {
                    window.open(item.link, "_blank", "noopener,noreferrer");
                    return;
                  }
                  onNavigate?.(item.page);
                }}                
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="glow" />
                <div
                  className="skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="label-wrap" style={{ opacity }}>
                    <span className="label-base label-dark" style={{ fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="label-base label-bright"
                      style={{
                        fontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>
      {mounted && (
      <div className="sc-right-nav">
        <span className="sc-nav-arrow left">◄</span>
        <span
          className="sc-nav-btn"
          onClick={() => {
            window.location.assign("/classic/index.html");
          }}
        >
          Switch to Classic View
        </span>
        <span className="sc-nav-arrow right">►</span>
      </div>
          )}
        <div className={`hint ${mounted ? "mounted" : ""}`}>
          <div className="hint-row"><span className="hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="hint-row"><span className="hint-key">↵</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}
