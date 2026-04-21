import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "University / Coursework"},
  { id: "ii", badge: "II", title: "EXPERIENCE", subtitle: "Internships / Roles"},
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Featured Work"},
  { id: "iv", badge: "IV", title: "Skills", subtitle: "Proficiency"},
];

const EDUCATION_ROWS = [
  { index: "01", title: "General Education", status: "Complete" },
  { index: "02", title: "Computer Engineering Core", status: "In Progress" },
  { index: "03", title: "Elective Track", status: "Complete" },
  { index: "04", title: "Senior Design", status: "In Progress" },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Susquehanna International Group", status: "Systems Engineer" },
  { index: "02", title: "The Vanguard Group", status: "DevOps Engineer" },
  { index: "03", title: "Berkley Technology Services", status: "Automation Engineer" },
];

const EXPERIENCE_DETAILS = [
  ["•	Supported and optimized enterprise-scale infrastructure by managing core platform services, ensuring high availability and reliability across trading, business, and testing systems", "•	Supported and optimized enterprise-scale infrastructure by managing core platform services, ensuring high availability and reliability across trading, business, and testing systems", "•	Collaborated with cross-functional teams, including developers and lines of business to configure, troubleshoot, monitor, and enhance performance of servers"],
  ["•	Conducted research and completed foundational work for implementing OKTA SSO into API gateway, setting up the framework for an enhanced security transition from basic authorization", "•	Developed and documented new REST APIs and enhancements, incorporating Grafana dashboards and AWS CloudWatch logging for endpoint monitoring as well as Backstage updates to improve user experience", "•	Managed and maintained DataLake infrastructure for ServiceNow, ensuring data accuracy and efficient storage for large-scale ingestion of incident and service data"],
  ["•	Built automation scripts in JavaScript to enhance workflows and data management in the ServiceNow platform", "•	Performed system enhancements and developments within the ServiceNow platform with user experience in mind", "•	Engaged with key stakeholders, effectively presenting system enhancement and developments", "•	Performed quality assurance testing and validation ensuring accuracy while adhering to version control practices"],
];

const PROJECT_ROWS = [
  { index: "01", title: "Concrete Boat Design Prototype", status: "Lead CAD Designer" },
  { index: "02", title: "(P)retty (S)imple (SH)ell", status: "Developer" },
  { index: "03", title: "Huffman Coding Compression and Decompression", status: "Developer" },
];

const PROJECT_DETAILS = [
  ["Collaborated with 4 other colleagues to propose boat designs and concrete mixes while distributing project roles. I developed a model boat and boat mold on SolidWorks as a prototype to be 3D printed and filled with our concrete mix to be tested"],
  ["This is a command line interface similar to bash that is able to perform simple UNIX operations. Functionalities include but not limited to which, exit, single command with option input and output redirection, multiple pipelined commands with optional input and output redirection. Enhanced the basic shell further to support job control features using process groups, signals, and signal handlers. Implemented functionality for managing background and foreground jobs, suspending and resuming processes, sending signals, and tracking job statuses with built-in commands like jobs, fg, bg, and kill."],
  ["Implemented a data compression algorithm using Huffman coding to optimize the storage and transmission of text data. Utilized binary trees and heap data structures to efficiently encode and decode based on symbol frequency, resulting in enhanced data processing efficiency."],
];

const SKILLS_ROWS = [
  { index: "01", title: "Programming Languages", status: "" },
  { index: "02", title: "Tools", status: "" },
  { index: "03", title: "Languages", status: "" },
];

const SKILLS_DETAILS = [
  ["Java, JavaScript, Python, C, MATLAB, Bash, VHDL, HTML, SQL, Powershell"],
  ["ServiceNow, SolidWorks, Visual Studio Code, Coder, GitHub, BitBucket, Bamboo, AWS, Ansible, Grafana, Perforce, Swarm, Kibana, VMWare"],
  ["English (Native), Khmer (Conversant), Chinese-Teochew (Basic)"],
];


export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
  
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setHoveredRow(null);
  }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
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
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: ${isMobile ? "160vw" : "min(47vw, 720px)"};
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: ${isMobile ? "scale(0.4)" : "scale(0.9)"};
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        
        .resume-card-wrap.active .resume-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: ${isMobile ? "20vh" : "9.5vh"};
          right: ${isMobile ? "-25vw" : "4.5vw"};
          width: ${isMobile ? "150vw" : "min(39vw, 620px)"};
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          transform: ${isMobile ? "scale(0.6)" : "scale(1)"};
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
          grid-template-columns: 70px 1fr auto;
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
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          position: relative;
          pointer-events: auto;
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
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
          top: ${isMobile ? "85vh" : "80vh"};
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: auto;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: ${isMobile ? "70px" : "100px"};
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
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


      `}</style>

      <div className="resume-overlay">
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span
            className="sc-nav-btn"
            onClick={() => {navigate(-1);}
          }
          >
            Back
          </span>
          <span className="sc-nav-arrow right">►</span>
        </div>
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-label"></div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index"></div>
              <div className="resume-detail-top-title">Drexel University</div>
              <div className="resume-detail-top-progress">2026</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">Initially, I percieved "jack of all trades, master of few" as a weakness of mine but overtime, I've come to realize that it's a strength which allows me to further explore interesting things and appreciate them beyond surface level</div>
                <div className="resume-detail-bullet"></div>
                <div className="resume-detail-bullet"></div>
              </div>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index"></div>
              <div className="resume-detail-top-title">Experience</div>
              <div className="resume-detail-top-progress"></div>
            </div>

            <div className="resume-detail-list">
              {EXPERIENCE_ROWS.map((row, i) => (
                <div
                  className="resume-detail-row"
                  key={row.index}
                  onMouseEnter={() => setHoveredRow(i)}
                >
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                {(hoveredRow !== null
                  ? EXPERIENCE_DETAILS[hoveredRow]
                  : ["Hover over a role to see details"]
                ).map((text, i) => (
                  <div className="resume-detail-bullet" key={i}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
        </div>
        )}

        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index"></div>
              <div className="resume-detail-top-title">Projects</div>
              <div className="resume-detail-top-progress"></div>
            </div>

            <div className="resume-detail-list">
              {PROJECT_ROWS.map((row, i) => (
                <div
                  className="resume-detail-row"
                  key={row.index}
                  onMouseEnter={() => setHoveredRow(i)}
                >
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                {(hoveredRow !== null
                  ? PROJECT_DETAILS[hoveredRow]
                  : ["Hover over a project to see details"]
                ).map((text, i) => (
                  <div className="resume-detail-bullet" key={i}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
        </div>
        )}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index"></div>
              <div className="resume-detail-top-title">Skills</div>
              <div className="resume-detail-top-progress"></div>
            </div>

            <div className="resume-detail-list">
              {SKILLS_ROWS.map((row, i) => (
                <div
                  className="resume-detail-row"
                  key={row.index}
                  onMouseEnter={() => setHoveredRow(i)}
                >
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">Details</div>
              <div className="resume-detail-bullets">
                {(hoveredRow !== null
                  ? SKILLS_DETAILS[hoveredRow]
                  : ["Hover over a skill to see details"]
                ).map((text, i) => (
                  <div className="resume-detail-bullet" key={i}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}
