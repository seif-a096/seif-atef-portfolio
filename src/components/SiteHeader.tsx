import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";

const RESUME_DRIVE_VIEW_URL =
  "https://drive.google.com/file/d/1DAkg4Zfzz--I806ZzJgdeOdf_-I8gmR6/view?usp=sharing";
const RESUME_DRIVE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1DAkg4Zfzz--I806ZzJgdeOdf_-I8gmR6";

type NavLink = {
  label: string;
  id: string;
};

type SiteHeaderProps = {
  isMenuOpen: boolean;
  needsLightLines: boolean;
  headerTextColor: MotionValue<string>;
  headerBorderColor: MotionValue<string>;
  activeSection: string;
  navLinks: NavLink[];
  onToggleMenu: () => void;
  onNavigate: (id: string) => void;
};

const menuVariants: Variants = {
  initial: {
    y: "-100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2,
    },
  },
};

const navLinksVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2 + i * 0.1,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
};

function buildPreviewShot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=600`;
}

const socialProfiles = [
  {
    id: "github",
    label: "GitHub",
    username: "@seif-a096",
    url: "https://github.com/seif-a096",
    Icon: FaGithub,
    previewSrc: buildPreviewShot("https://github.com/seif-a096"),
  },
] as const;

function NavSocialIcon({
  label,
  username,
  url,
  Icon,
  previewSrc,
}: (typeof socialProfiles)[number]) {
  const [hovered, setHovered] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
  }, [previewSrc]);

  return (
    <div
      className="nav-social-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-social-link"
        aria-label={label}
      >
        <Icon />
      </a>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="nav-social-card"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.93 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nav-social-card-chrome">
              <span className="chrome-dot chrome-dot-red" />
              <span className="chrome-dot chrome-dot-amber" />
              <span className="chrome-dot chrome-dot-green" />
              <span className="chrome-url">{url.replace("https://", "")}</span>
            </div>
            <div className="nav-social-card-preview">
              {imageFailed ? (
                <div className="nav-social-card-fallback" aria-hidden="true">
                  <Icon className="nav-social-card-platform-icon" />
                  <span>{label} Preview</span>
                </div>
              ) : (
                <img
                  src={previewSrc}
                  alt={`${label} profile preview`}
                  className="nav-social-card-img"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
            <div className="nav-social-card-footer">
              <Icon className="nav-social-card-platform-icon" />
              <div>
                <div className="nav-social-card-name">{label}</div>
                <div className="nav-social-card-username">{username}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SiteHeader({
  isMenuOpen,
  needsLightLines,
  headerTextColor,
  headerBorderColor,
  activeSection,
  navLinks,
  onToggleMenu,
  onNavigate,
}: SiteHeaderProps) {
  const [isDownloadingResume, setIsDownloadingResume] = React.useState(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = React.useState(false);

  const handleResumeDownload = React.useCallback(async () => {
    if (isMenuOpen || isDownloadingResume) return;

    setIsDownloadingResume(true);
    const previewTab = window.open("about:blank", "_blank");

    try {
      // Keep a short loading state before navigating the new tab.
      await new Promise((resolve) => window.setTimeout(resolve, 900));

      if (previewTab) {
        previewTab.location.href = RESUME_DRIVE_VIEW_URL;
      } else {
        window.open(RESUME_DRIVE_VIEW_URL, "_blank", "noopener,noreferrer");
      }

      setShowDownloadPrompt(true);
    } catch {
      window.open(RESUME_DRIVE_VIEW_URL, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloadingResume(false);
    }
  }, [isDownloadingResume, isMenuOpen]);

  const handleResumeDownloadConfirm = React.useCallback(() => {
    window.open(RESUME_DRIVE_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
    setShowDownloadPrompt(false);
  }, []);

  const handleResumeDownloadDismiss = React.useCallback(() => {
    setShowDownloadPrompt(false);
  }, []);

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="brand-wrap"
          style={{ color: isMenuOpen ? "#e2e0d4" : headerTextColor }}
        >
          <span className="brand-first">Seif</span>
          <span className="brand-last">Atef</span>
        </motion.div>

        <div className="header-actions">
          <motion.button
            type="button"
            className={`resume-btn ${isDownloadingResume ? "loading" : ""}`}
            onClick={handleResumeDownload}
            disabled={isMenuOpen || isDownloadingResume}
            aria-busy={isDownloadingResume}
            style={{
              opacity: isMenuOpen ? 0 : 1,
              pointerEvents: isMenuOpen ? "none" : "auto",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" y2="3" />
            </svg>
            {isDownloadingResume ? (
              <>
                <span className="resume-btn-spinner" aria-hidden="true" />
                <span>Loading...</span>
              </>
            ) : (
              "RESUME"
            )}
          </motion.button>

          <motion.button
            className={`nav-btn ${isMenuOpen ? "open" : ""} ${needsLightLines ? "light-lines" : ""}`}
            type="button"
            aria-label="Toggle navigation"
            onClick={onToggleMenu}
            style={{
              borderColor: isMenuOpen
                ? "rgba(255, 255, 255, 0.4)"
                : headerBorderColor,
            }}
          >
            <span className="nav-btn-lines" aria-hidden="true">
              <motion.span className="nav-line-1"></motion.span>
              <motion.span className="nav-line-2"></motion.span>
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showDownloadPrompt && !isMenuOpen && (
            <motion.div
              className="resume-download-prompt"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="resume-download-prompt-text">
                Resume opened. Download PDF as well?
              </p>
              <div className="resume-download-prompt-actions">
                <button
                  type="button"
                  className="resume-download-prompt-btn primary"
                  onClick={handleResumeDownloadConfirm}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="resume-download-prompt-btn"
                  onClick={handleResumeDownloadDismiss}
                >
                  Later
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="fullscreen-nav"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="nav-content">
              <ul className="nav-links">
                {navLinks.map(({ label, id }, i) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.li
                      key={id}
                      custom={i}
                      variants={navLinksVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={isActive ? "active-link" : ""}
                    >
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(id);
                        }}
                      >
                        <span className="nav-link-text">{label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                className="nav-social-icons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
              >
                {socialProfiles.map((p) => (
                  <NavSocialIcon key={p.id} {...p} />
                ))}
              </motion.div>

              <motion.div
                className="nav-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="laurel-container">
                  <GiLaurelCrown className="laurel-icon" />
                  <svg
                    className="custom-core-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <p className="nav-subtitle">
                  SOFTWARE ENGINEER | AI ENTHUSIAST
                </p>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
