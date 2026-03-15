import * as React from "react";
import { motion } from "framer-motion";

type BlobBackgroundProps = {
  backgroundColor: string;
  blobColor: string;
  blobCount?: number;
  blobSize?: number;
  blobComplexity?: number;
  blobSpeed?: number;
  strokeWidth?: number;
  strokeOpacity?: number;
};

export default function BlobBackground({
  backgroundColor,
  blobColor,
  blobCount = 10,
  blobSize = 280,
  blobComplexity = 160,
  blobSpeed = 0.7,
  strokeWidth = 1.5,
  strokeOpacity = 0.45,
}: BlobBackgroundProps) {
  const filterId = React.useId();

  const seededValue = React.useCallback(
    (seed: number, min: number, max: number) => {
      const raw = Math.sin(seed * 9999.91) * 10000;
      const normalized = raw - Math.floor(raw);
      return normalized * (max - min) + min;
    },
    [],
  );

  const blobs = React.useMemo(
    () =>
      [...Array(blobCount)].map((_, i) => ({
        x: [
          seededValue(i * 7.1 + 1, -20, 110) + "%",
          seededValue(i * 7.1 + 2, -20, 110) + "%",
          seededValue(i * 7.1 + 3, -20, 110) + "%",
        ],
        y: [
          seededValue(i * 7.1 + 4, -20, 110) + "%",
          seededValue(i * 7.1 + 5, -20, 110) + "%",
          seededValue(i * 7.1 + 6, -20, 110) + "%",
        ],
        sizeFactor: seededValue(i * 7.1 + 7, 0.5, 1.5),
        duration: seededValue(i * 7.1 + 8, 25, 50) / blobSpeed,
      })),
    [blobCount, blobSpeed, seededValue],
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* SVG filter for organic blob displacement */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={blobComplexity}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <g filter={`url(#${filterId})`}>
          {blobs.map((blob, i) => (
            <motion.circle
              key={i}
              initial={{ cx: blob.x[0], cy: blob.y[0] }}
              animate={{ cx: blob.x, cy: blob.y }}
              transition={{
                duration: blob.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              r={blob.sizeFactor * blobSize}
              fill="none"
              stroke={blobColor}
              strokeWidth={strokeWidth}
              strokeOpacity={strokeOpacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
