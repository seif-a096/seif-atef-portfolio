import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { certificationsData } from "./CertificationsData";
import type { Certification } from "./CertificationsData";
import { FiExternalLink } from "react-icons/fi";
import styles from "./CertificationsGallery.module.css";

export default function CertificationsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], ["15%", "-35%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["-25%", "15%"]);

  // Row 1: JS, React, DEBI (frontend-focused)
  const row1Base = certificationsData.filter((c) =>
    ["js-complete", "react-ultimate", "debi-react"].includes(c.id),
  );
  const row1 = [...row1Base, ...row1Base, ...row1Base, ...row1Base];

  // Row 2: Node.js backend, HTML/CSS, ICPC
  const row2Base = certificationsData.filter((c) =>
    ["nodejs-bootcamp", "html-css-responsive", "icpc-acpc"].includes(c.id),
  );
  const row2 = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

  return (
    <div ref={containerRef} className={styles.galleryRoot}>
      <h2 className={`section-title ${styles.galleryTitle}`}>Certifications</h2>

      {/* Row 1 */}
      <motion.div
        style={{
          x: row1X,
        }}
        className={styles.galleryRow}
      >
        {row1.map((cert, i) => (
          <CertCard key={`r1-${cert.id}-${i}`} cert={cert} />
        ))}
      </motion.div>

      {/* Row 2 — reversed order */}
      <motion.div
        style={{
          x: row2X,
        }}
        className={styles.galleryRow}
      >
        {row2.map((cert, i) => (
          <CertCard key={`r2-${cert.id}-${i}`} cert={cert} />
        ))}
      </motion.div>
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const hasCredential = !!cert.credentialUrl;

  const card = (
    <div
      className={`${styles.certCard} ${hasCredential ? styles.certCardClickable : ""}`}
    >
      <img src={cert.image} alt={cert.name} className={styles.certImage} />

      {hasCredential && (
        <div className={styles.hoverOverlay}>
          <FiExternalLink size={24} color="white" />
          <span className={styles.overlayText}>View Credential</span>
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.issuer}>{cert.issuer}</span>
        <span className={styles.date}>{cert.date}</span>
      </div>
    </div>
  );

  if (hasCredential) {
    return (
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        {card}
      </a>
    );
  }

  return card;
}
