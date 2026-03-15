import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import AnimatedHobbyStickers from "./AnimatedHobbyStickers";
import contactPhoto from "../assets/contact_me.jpeg";
import styles from "./ContactSection.module.css";

interface SocialCard {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  url: string;
  previewUrl: string;
  color: string;
  bgGradient: string;
}

function buildPreviewShot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=540`;
}

const socials: SocialCard[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/seif.atef176",
    previewUrl: "https://www.facebook.com/seif.atef176",
    color: "#1877F2",
    bgGradient: "linear-gradient(135deg, #1877F2 0%, #0d5bbf 100%)",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/seif6029/",
    previewUrl: "https://www.instagram.com/seif6029/",
    color: "#E4405F",
    bgGradient:
      "linear-gradient(135deg, #833AB4 0%, #E4405F 50%, #FCAF45 100%)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/seif-atef/",
    previewUrl: "https://www.linkedin.com/in/seif-atef/",
    color: "#0A66C2",
    bgGradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    url: "https://wa.me/201062205436",
    previewUrl: "https://wa.me/201062205436",
    color: "#25D366",
    bgGradient: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
  },
  {
    id: "gmail",
    label: "Gmail",
    icon: SiGmail,
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=seifatef2005@gmail.com",
    previewUrl: "https://mail.google.com/",
    color: "#EA4335",
    bgGradient: "linear-gradient(135deg, #EA4335 0%, #c5221f 100%)",
  },
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    url: "https://github.com/seif-a096",
    previewUrl: "https://github.com/seif-a096",
    color: "#f0f0f0",
    bgGradient: "linear-gradient(135deg, #333 0%, #0d1117 100%)",
  },
];

// Fan positions: 3 left, center photo, 3 right
// Each card gets a rotation and x-offset from center
// Fan positions scaled up for larger cards
// Photo is 260x364, cards are 200x275
const fanPositions = [
  { rotate: -30, x: -400, y: 25 }, // far left
  { rotate: -18, x: -250, y: -12 }, // mid left
  { rotate: -6, x: -115, y: -25 }, // near left
  { rotate: 6, x: 115, y: -25 }, // near right
  { rotate: 18, x: 250, y: -12 }, // mid right
  { rotate: 30, x: 400, y: 25 }, // far right
];

export default function ContactSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [compactLayout, setCompactLayout] = useState(false);
  const [failedPreviews, setFailedPreviews] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompactLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const markPreviewFailed = (id: string) => {
    setFailedPreviews((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={styles.contactRoot}>
      {/* Header with Stickers */}
      <div className={styles.contactHeader}>
        <AnimatedHobbyStickers color="white" />
        <h2 className={`section-title ${styles.contactTitle}`}>Find Me On</h2>
      </div>

      {/* Fanned cards + center photo */}
      <div className={styles.fanDeck}>
        {/* Center photo */}
        <motion.div
          className={styles.centerPhoto}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={contactPhoto}
            alt="Seif Atef"
            className={styles.centerPhotoImg}
          />
        </motion.div>

        {/* Social cards fanned around the photo */}
        {socials.map((social, i) => {
          const pos = fanPositions[i];
          const Icon = social.icon;
          const isHovered = hoveredId === social.id;
          const previewSrc = buildPreviewShot(social.previewUrl);
          const previewFailed = !!failedPreviews[social.id];

          return (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(social.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={styles.socialCard}
              style={{
                background: social.bgGradient,
                zIndex: isHovered ? 20 : i < 3 ? 5 - i : i,
                boxShadow: isHovered
                  ? `0 20px 50px ${social.color}44`
                  : "0 8px 30px rgba(0,0,0,0.3)",
              }}
              initial={{
                x: compactLayout ? 0 : pos.x,
                y: compactLayout ? 0 : pos.y,
                rotate: compactLayout ? 0 : pos.rotate,
              }}
              animate={{
                x: compactLayout ? 0 : isHovered ? pos.x * 1.15 : pos.x,
                y: compactLayout ? 0 : isHovered ? pos.y - 30 : pos.y,
                rotate: compactLayout
                  ? 0
                  : isHovered
                    ? pos.rotate * 0.5
                    : pos.rotate,
                scale: isHovered ? 1.12 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
            >
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.socialPreview}
                >
                  <div className={styles.previewChrome}>
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#ff5f57" }}
                    />
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#febc2e" }}
                    />
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#28c840" }}
                    />
                    <span className={styles.previewUrl}>
                      {social.previewUrl.replace("https://", "")}
                    </span>
                  </div>
                  <div className={styles.previewBody}>
                    {previewFailed ? (
                      <div className={styles.previewFallback}>
                        <Icon size={22} color={social.color} />
                        <span>{social.label} Preview</span>
                      </div>
                    ) : (
                      <img
                        src={previewSrc}
                        alt={`${social.label} preview`}
                        className={styles.previewImg}
                        onError={() => markPreviewFailed(social.id)}
                      />
                    )}
                  </div>
                </motion.div>
              )}
              <Icon size={40} color="white" />
              <span className={styles.socialLabel}>{social.label}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Footer text */}
      <p className={styles.contactFooter}>
        Let&apos;s connect — whether it&apos;s about a project, collaboration,
        or just a conversation.
      </p>
    </div>
  );
}
