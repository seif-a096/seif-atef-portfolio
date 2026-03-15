import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";
import type { Project } from "./ProjectsData";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className={styles.projectFolderWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={styles.projectRoot}
        >
          {/* FOLDER BACK & TAB */}
          <div className={styles.folderBack}>
            <div className={styles.folderTab}>
              <div className={styles.folderTabLabel}>
                Proj // {project.id.slice(0, 5)}
              </div>
            </div>
          </div>

          {/* DETAILS PAPER (Small/Folder View) - hidden when expanded so layout animation works */}
          <motion.div
            layoutId={`card-${project.id}`}
            onClick={() => setIsExpanded(true)}
            animate={{
              y: isHovered ? -220 : 0, // fully out on hover
              scale: isHovered ? 1.02 : 1,
              rotateZ: isHovered ? (Math.random() > 0.5 ? 1 : -1) : 0,
              opacity: isExpanded ? 0 : 1, // Hide original when expanded
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={styles.paper}
          >
            <div
              className={`${styles.paperContent} ${isHovered ? styles.paperContentActive : ""}`}
            >
              <h3 className={styles.paperTitle}>{project.title}</h3>
              <p className={styles.paperDescription}>{project.description}</p>

              <div className={styles.techChips}>
                {project.techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div key={tech.name} className={styles.techChipCompact}>
                      <Icon color={tech.color} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={styles.paperHint}
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              Click to view details
            </div>
          </motion.div>

          {/* FOLDER FRONT FLAP */}
          <motion.div
            animate={{
              rotateX: isHovered ? -55 : 0,
              y: isHovered ? 15 : 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className={styles.folderFront}
            style={{
              boxShadow: isHovered
                ? "0 30px 40px rgba(0,0,0,0.6)"
                : "0 8px 30px rgba(0,0,0,0.4), inset 0 2px 20px rgba(255,255,255,0.2)",
            }}
          >
            <motion.div
              animate={{
                opacity: isHovered ? 0.4 : 1,
                scale: isHovered ? 0.95 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={styles.folderFrontIconWrap}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,0.9)"
                stroke="rgba(255,255,255,1)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* FULL SCREEN EXPANDED MODAL (using Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div className={styles.modalRoot}>
                {/* Dimmed Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.modalBackdrop}
                  onClick={() => setIsExpanded(false)}
                />

                {/* Layout-Animated Big Card */}
                <motion.div
                  layoutId={`card-${project.id}`}
                  className={styles.modalCard}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className={styles.closeBtn}
                  >
                    <FiX size={18} />
                  </button>

                  <h2 className={styles.modalTitle}>{project.title}</h2>

                  <p className={styles.modalDescription}>
                    {project.description}
                  </p>

                  <h4 className={styles.modalTechHeading}>
                    Technologies Used:
                  </h4>
                  <div className={styles.modalTechChips}>
                    {project.techStack.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <div key={tech.name} className={styles.modalTechChip}>
                          <Icon size={18} color={tech.color} />
                          {tech.name}
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.modalActions}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionLink} ${styles.actionGithub}`}
                      >
                        <FiGithub size={18} /> Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionLink} ${styles.actionLive}`}
                      >
                        <FiExternalLink size={18} /> Live Deployment
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
