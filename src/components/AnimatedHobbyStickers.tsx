import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimatedHobbyStickers.module.css";

interface AnimatedHobbyStickersProps {
  color?: string;
}

// Each hobby: label + high-quality professional 24x24 SVG paths
const hobbies = [
  {
    label: "Football",
    viewBox: "0 0 24 24",
    paths: [
      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", // Outer circle
      "M12 7l-4.5 3.5L9 16h6l1.5-5.5L12 7z", // Inner pentagon
      "M12 7V2", // Top line
      "M7.5 10.5L2.5 9", // Top left line
      "M16.5 10.5L21.5 9", // Top right line
      "M9 16l-3.5 5", // Bottom left line
      "M15 16l3.5 5", // Bottom right line
    ],
  },
  {
    label: "Gaming",
    viewBox: "0 0 24 24",
    paths: [
      "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      "M6 8v4", // D-pad vertical
      "M4 10h4", // D-pad horizontal
      "M15 13h.01", // Button A (dot)
      "M18 11h.01", // Button B (dot)
    ],
  },
  {
    label: "Coding",
    viewBox: "0 0 24 24",
    paths: [
      "M4 16h16", // Monitor base shadow
      "M5 20h14", // Monitor stand bottom
      "M9 16v4", // Stand leg left
      "M15 16v4", // Stand leg right
      "M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6", // Screen boundary
      "m10 8-2 2 2 2", // <
      "m14 8 2 2-2 2", // >
    ],
  },
  {
    label: "Sports",
    viewBox: "0 0 24 24",
    paths: [
      "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", // Trophy left handle
      "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", // Trophy right handle
      "M4 22h16", // Trophy base bottom
      "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", // Trophy base left curve
      "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", // Trophy base right curve
      "M18 2H6v7a6 6 0 0 0 12 0V2Z", // Trophy cup
    ],
  },
];

// SVG path draw-on animation
const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
      opacity: { delay: i * 0.1, duration: 0.2 },
    },
  }),
  exit: {
    opacity: 0,
    pathLength: 0,
    transition: { duration: 0.25 },
  },
};

export default function AnimatedHobbyStickers({
  color = "rgba(210, 255, 0, 0.85)",
}: AnimatedHobbyStickersProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hobbies.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const hobby = hobbies[currentIndex];

  return (
    <div className={styles.sticker}>
      <AnimatePresence mode="wait">
        <motion.svg
          key={hobby.label}
          viewBox={hobby.viewBox}
          width="50"
          height="50"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
          transition={{ duration: 0.4 }}
          className={styles.icon}
        >
          {hobby.paths.map((d, i) => (
            <motion.path
              key={`${hobby.label}-${i}`}
              d={d}
              variants={pathVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          ))}
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}
