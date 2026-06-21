import { useRef, useEffect, useState, useContext } from "react";
import LoginPrompt from "./LoginPrompt";
import AuthStatus from "../AuthenticationPages/AuthStatus";
import "./course.css";
import { AuthContext } from "../../context/AuthContext";
const Chevron = ({ open }) => (
  <svg
    className={`inline-block align-middle h-[1.3em] w-[1.3em] transition-transform duration-300 ease-in-out ${open ? " rotate-90" : "rotate-0"}`}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    style={{ marginLeft : '2px', marginRight : '2px'  }}
  >
    <polyline
      points="7,6 12,11 7,16"
      fill="none"
      stroke="#ff4040"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-[#ff4040]"
    />
  </svg>
);

const DropdownSection = ({
  title,
  items,
  open,
  onToggle,
  onToggleCompleted,
  onToggleRevision,
}) => {

  const { isLoggedIn } = useContext(AuthContext);
  const [showPrompt, setShowPrompt] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [shouldRender, setShouldRender] = useState(open);

  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  useEffect(() => {
  
    setShowPrompt(false);
    if (open) {
      setShouldRender(true);
      setTimeout(() => {
        if (contentRef.current) {
          setMaxHeight(contentRef.current.scrollHeight + "px");
        }
      }, 10);
    } else {
      if (contentRef.current) {
        setMaxHeight(contentRef.current.scrollHeight + "px");
      }
      setTimeout(() => {
        setMaxHeight("0px");
      }, 10);
      const timeout = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleCheckboxClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleCompleted(idx);
  };

  const handleRevisionClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleRevision(idx);
  };

  return (
    <div className="bg-[rgba(12, 0, 0, 0.85)] w-92/100 !m-4.5 max-md:w-97/100 max-md:!m-1.25 rouded-[16px] border-[1.5px_solid_rgba(255, 64, 64, 0.25)] opacity-95 shadow-[0_0_12px_rgba(255, 50, 50, 0.2), 0_0_28px_rgba(255, 10, 10, 0.08)] transition-shadow duration-300 ease-[ease]" 
    >
      <LoginPrompt open={showPrompt} onClose={() => setShowPrompt(false)} />
      <div className="max-md:w-full flex items-center !p-5.5 cursor-pointer rounded-2xl border-b-[1px_solid_#ff1a1a44] gap-4.5 hover:shadow-[0_0_10px_#ff1a1a33] hover:bg-[linear-gradient(90deg,#300008_0%,#4d000f_100%)] " onClick={onToggle}>
        <Chevron open={open} />
        <span className="dropdown-title">{title}</span>
        <div className="dropdown-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">{`${completed} / ${total}`}</span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="dropdown-content"
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {shouldRender && (
          <div className="content-inner">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="center-th">Status</th>
                  <th className="subtopic">Subtopic</th>
                  <th className="center-th"> Resources</th>
                  <th className="center-th">Revision</th>
                  <th className="center-th">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="center checkbox-cell">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxClick(idx)}
                        className="checkbox"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="center-icon">
                      {item.resource ? (
                        <a
                          href={isLoggedIn ? item.resource : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ff4040", textDecoration: "underline", cursor: "pointer" }}
                          onClick={(e) => {
                            if (!isLoggedIn) {
                              e.preventDefault(); // stop navigation
                              setShowPrompt(true); // show your warning/prompt
                              return;
                            }
                          }}
                        >
                          Link
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="center">
                      <button
                        className={`bookmark-btn${
                          item.revision ? " active" : ""
                        }`}
                        aria-label="Toggle Revision"
                        onClick={() => handleRevisionClick(idx)}
                        type="button"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill={item.revision ? "#ff4040" : "#bbb"}
                          stroke={item.revision ? "#ff4040" : "#bbb"}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            filter: item.revision
                              ? "drop-shadow(0 0 4px #ff4040aa)"
                              : "none",
                            transition: "fill 0.2s, stroke 0.2s",
                          }}
                        >
                          <path
                            d="M6 3C4.89543 3 4 3.89543 4 5V19C4 19.5523 4.44772 20 5 20C5.27614 20 5.52614 19.8611 5.70711 19.6464L11 13.382L16.2929 19.6464C16.4739 19.8611 16.7239 20 17 20C17.5523 20 18 19.5523 18 19V5C18 3.89543 17.1046 3 16 3H6Z"
                            fill={item.revision ? "#ff4040" : "#bbb"}
                            stroke={item.revision ? "#ff4040" : "#bbb"}
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="center-icon">
                      {item.difficulty ? (
                        <span
                          className={`difficulty-tag difficulty-${item.difficulty.toLowerCase()}`}
                        >
                          {item.difficulty}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSection;
