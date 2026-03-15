import * as React from "react";
import { addPropertyControls, ControlType } from "./framer-shim";
import {
  motion,
  useMotionValue,
  useSpring,
  useTime,
  useTransform,
} from "framer-motion";

// Module-level cache — always up-to-date regardless of component lifecycle.
// This means that even if the mouse hasn't moved since the loader disappeared,
// we already know where it is and can prime the blob immediately on mount.
let _cachedClientX = -1;
let _cachedClientY = -1;
if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      _cachedClientX = e.clientX;
      _cachedClientY = e.clientY;
    },
    { passive: true },
  );
}

type CursorLensProps = {
  baseImage: string;
  revealImage: string;
  objectFit: "cover" | "contain";
  backgroundColor: string;
  blobOutlineColor: string;
  parallaxStrength: number;
  showBackground: boolean;
  bgBlobCount: number;
  bgBlobSize: number;
  bgBlobComplexity: number;
  bgBlobSpeed: number;
  blobStrokeWidth: number;
  previewCursor: boolean;
  blobSize: number;
  shapeComplexity: number;
  roughness: number;
  speed: number;
  viscosity: number;
};

/**
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 600
 */
export default function CursorLens(props: CursorLensProps) {
  const {
    baseImage,
    revealImage,
    objectFit,
    backgroundColor,
    blobOutlineColor,
    parallaxStrength,
    showBackground,
    bgBlobCount,
    bgBlobSize,
    bgBlobComplexity,
    bgBlobSpeed,
    blobStrokeWidth,
    previewCursor,
    blobSize,
    shapeComplexity,
    roughness,
    speed,
    viscosity,
  } = props;

  const [isHovering, setIsHovering] = React.useState(false);
  const isActive = isHovering || previewCursor;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const backgroundBlobs = React.useMemo(() => {
    return [...Array(bgBlobCount)].map(() => ({
      x: [
        random(-20, 110) + "%",
        random(-20, 110) + "%",
        random(-20, 110) + "%",
      ],
      y: [
        random(-20, 110) + "%",
        random(-20, 110) + "%",
        random(-20, 110) + "%",
      ],
      sizeFactor: random(0.5, 1.5),
      duration: random(25, 50) / bgBlobSpeed,
    }));
  }, [bgBlobCount, bgBlobSpeed]);

  const bgFilterId = React.useId();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXRatio = useMotionValue(0);
  const mouseYRatio = useMotionValue(0);

  const smoothOptions = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseXRatio, smoothOptions);
  const smoothY = useSpring(mouseYRatio, smoothOptions);

  const baseX = useTransform(
    smoothX,
    [-1, 1],
    [parallaxStrength, -parallaxStrength],
  );
  const baseY = useTransform(
    smoothY,
    [-1, 1],
    [parallaxStrength, -parallaxStrength],
  );
  const revealX = useTransform(
    smoothX,
    [-1, 1],
    [parallaxStrength * 2.5, -parallaxStrength * 2.5],
  );
  const revealY = useTransform(
    smoothY,
    [-1, 1],
    [parallaxStrength * 2.5, -parallaxStrength * 2.5],
  );

  React.useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = "touches" in e ? e.touches[0] : null;
      const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
      const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;

      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
        mouseXRatio.set((x / rect.width) * 2 - 1);
        mouseYRatio.set((y / rect.height) * 2 - 1);
      } else {
        mouseXRatio.set(0);
        mouseYRatio.set(0);
      }
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("touchstart", handleGlobalMove);
    window.addEventListener("touchmove", handleGlobalMove);

    // ── Prime from cursor-prime event (fired by App when loader finishes) ──
    // This runs AFTER the loader disappears, at which point _cachedClientX
    // holds the real current mouse position, and getBoundingClientRect() is
    // accurate. No need to move the mouse to activate the reveal.
    const handlePrime = () => {
      if (_cachedClientX < 0 || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = _cachedClientX;
      const cy = _cachedClientY;
      const inside =
        cx >= rect.left &&
        cx <= rect.right &&
        cy >= rect.top &&
        cy <= rect.bottom;
      if (inside) {
        mouseX.set(cx - rect.left);
        mouseY.set(cy - rect.top);
        mouseXRatio.set(((cx - rect.left) / rect.width) * 2 - 1);
        mouseYRatio.set(((cy - rect.top) / rect.height) * 2 - 1);
        setIsHovering(true);
      }
    };
    window.addEventListener("cursor-prime", handlePrime);
    // ─────────────────────────────────────────────────────────────────────

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("touchstart", handleGlobalMove);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("cursor-prime", handlePrime);
    };
  }, [mouseX, mouseY, mouseXRatio, mouseYRatio]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseXRatio.set(0);
    mouseYRatio.set(0);
  };

  const time = useTime();

  const useWake = (index: number) => {
    const stiffness = speed * (1 - index * 0.15);
    const damping = 20 + viscosity * index * 5;
    const mass = 0.1 + index * 0.1;
    return {
      x: useSpring(mouseX, { stiffness, damping, mass }),
      y: useSpring(mouseY, { stiffness, damping, mass }),
    };
  };

  const head = useWake(0);
  const body1 = useWake(1);
  const body2 = useWake(2);
  const tail = useWake(4);

  const complexityRadius = blobSize * shapeComplexity * 0.6;
  const sat1X = useTransform(
    time,
    (t) => head.x.get() + Math.sin(t * 0.002) * complexityRadius,
  );
  const sat1Y = useTransform(
    time,
    (t) => head.y.get() + Math.cos(t * 0.002) * complexityRadius,
  );
  const sat2X = useTransform(
    time,
    (t) => head.x.get() + Math.cos(t * 0.004) * (complexityRadius * 0.8),
  );
  const sat2Y = useTransform(
    time,
    (t) => head.y.get() + Math.sin(t * 0.004) * (complexityRadius * 0.8),
  );

  const cursorFilterId = React.useId();
  const maskId = React.useId();
  const greyBlobFilterId = React.useId();

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...containerStyle, backgroundColor: backgroundColor }}
    >
      {showBackground && (
        <>
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <filter id={bgFilterId}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.008"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={bgBlobComplexity}
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
              zIndex: 0,
              overflow: "visible",
            }}
          >
            <g filter={`url(#${bgFilterId})`}>
              {backgroundBlobs.map((blob, i) => (
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
                  r={blob.sizeFactor * bgBlobSize}
                  fill="none"
                  stroke={blobOutlineColor}
                  strokeWidth={blobStrokeWidth}
                  strokeOpacity={0.5}
                />
              ))}
            </g>
          </svg>
        </>
      )}

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={cursorFilterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={roughness}
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            <feGaussianBlur in="distorted" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <defs>
          <mask id={maskId}>
            <g filter={`url(#${cursorFilterId})`}>
              <motion.g
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.6,
                }}
                transition={{
                  opacity: {
                    duration: isActive ? 0.35 : 0.55,
                    ease: isActive ? "easeOut" : "easeIn",
                  },
                  scale: {
                    duration: isActive ? 0.4 : 0.6,
                    ease: isActive ? "easeOut" : "easeIn",
                  },
                }}
                style={{ transformOrigin: "center" }}
              >
                <motion.circle
                  cx={sat1X}
                  cy={sat1Y}
                  r={blobSize * 0.6}
                  fill="white"
                />
                <motion.circle
                  cx={sat2X}
                  cy={sat2Y}
                  r={blobSize * 0.5}
                  fill="white"
                />
                <motion.circle
                  cx={head.x}
                  cy={head.y}
                  r={blobSize * 0.7}
                  fill="white"
                />
                <motion.circle
                  cx={body1.x}
                  cy={body1.y}
                  r={blobSize * 0.6}
                  fill="white"
                />
                <motion.circle
                  cx={body2.x}
                  cy={body2.y}
                  r={blobSize * 0.5}
                  fill="white"
                />
                <motion.circle
                  cx={tail.x}
                  cy={tail.y}
                  r={blobSize * 0.3}
                  fill="white"
                />
              </motion.g>
            </g>
          </mask>
        </defs>
      </svg>

      <div style={{ ...layerContainerStyle, zIndex: 10 }}>
        <motion.div
          style={{
            ...imageStyle,
            backgroundImage: `url(${baseImage})`,
            backgroundSize: objectFit,
            x: baseX,
            y: baseY,
            scale: 1.1,
          }}
        />
      </div>

      {/* Visible grey gooey cursor blob — same amoeba shape as the reveal mask */}
      <motion.svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 15,
        }}
        animate={{ opacity: isActive ? 0.12 : 0 }}
        transition={{ duration: isActive ? 0.35 : 0.55 }}
      >
        <defs>
          <filter id={greyBlobFilterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={roughness}
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            <feGaussianBlur in="distorted" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <g filter={`url(#${greyBlobFilterId})`}>
          <motion.g
            animate={{
              scale: isActive ? 1 : 0.6,
            }}
            transition={{
              scale: {
                duration: isActive ? 0.4 : 0.6,
                ease: isActive ? "easeOut" : "easeIn",
              },
            }}
            style={{ transformOrigin: "center" }}
          >
            <motion.circle
              cx={sat1X}
              cy={sat1Y}
              r={blobSize * 0.6}
              fill="black"
            />
            <motion.circle
              cx={sat2X}
              cy={sat2Y}
              r={blobSize * 0.5}
              fill="black"
            />
            <motion.circle
              cx={head.x}
              cy={head.y}
              r={blobSize * 0.7}
              fill="black"
            />
            <motion.circle
              cx={body1.x}
              cy={body1.y}
              r={blobSize * 0.6}
              fill="black"
            />
            <motion.circle
              cx={body2.x}
              cy={body2.y}
              r={blobSize * 0.5}
              fill="black"
            />
            <motion.circle
              cx={tail.x}
              cy={tail.y}
              r={blobSize * 0.3}
              fill="black"
            />
          </motion.g>
        </g>
      </motion.svg>

      <motion.div
        style={{
          ...layerContainerStyle,
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
          zIndex: 20,
        }}
      >
        <motion.div
          style={{
            ...imageStyle,
            backgroundImage: `url(${revealImage})`,
            backgroundSize: objectFit,
            x: revealX,
            y: revealY,
            scale: 1.1,
          }}
        />
      </motion.div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const layerContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  willChange: "transform",
};

CursorLens.defaultProps = {
  baseImage:
    "https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=80",
  revealImage:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
  objectFit: "cover",
  backgroundColor: "#1a1a2e",
  blobOutlineColor: "#4a4e69",
  parallaxStrength: 4,
  showBackground: true,
  bgBlobCount: 15,
  bgBlobSize: 80,
  bgBlobSpeed: 1,
  bgBlobComplexity: 60,
  blobStrokeWidth: 1,
  previewCursor: false,
  blobSize: 120,
  shapeComplexity: 0.8,
  roughness: 0,
  speed: 250,
  viscosity: 1,
} as CursorLensProps;

addPropertyControls(CursorLens, {
  baseImage: {
    type: ControlType.Image,
    title: "Base Image",
    description: "The bottom layer image (background).",
  },
  revealImage: {
    type: ControlType.Image,
    title: "Reveal Image",
    description: "The top layer image revealed by the cursor.",
  },
  objectFit: {
    type: ControlType.Enum,
    title: "Fit",
    defaultValue: "cover",
    options: ["cover", "contain"],
    description: "How images scale to fill the container.",
  },
  backgroundColor: {
    type: ControlType.Color,
    title: "Bg colour",
    defaultValue: "#1a1a2e",
    description: "Solid background color.",
  },
  blobOutlineColor: {
    type: ControlType.Color,
    title: "BG blob Colour",
    defaultValue: "#4a4e69",
    description: "Color of the floating outline shapes.",
  },
  parallaxStrength: {
    type: ControlType.Number,
    title: "IMG 3D depth",
    defaultValue: 4,
    min: 0,
    max: 10,
    description: "Pixel distance the images move (Parallax).",
  },
  showBackground: {
    type: ControlType.Boolean,
    title: "Show bg blobs",
    defaultValue: true,
    description: "Toggle background animations on/off.",
  },
  bgBlobCount: {
    type: ControlType.Number,
    title: "BG Blob count",
    defaultValue: 15,
    min: 1,
    max: 50,
    displayStepper: true,
    description: "Number of floating outlines.",
  },
  bgBlobSize: {
    type: ControlType.Number,
    title: "bg Blob size",
    defaultValue: 80,
    min: 10,
    max: 300,
    description: "Base scale for background blobs.",
  },
  bgBlobSpeed: {
    type: ControlType.Number,
    title: "bg blob Speed",
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
    description: "Animation speed multiplier.",
  },
  bgBlobComplexity: {
    type: ControlType.Number,
    title: "bg Blob complexity",
    defaultValue: 60,
    min: 0,
    max: 200,
    description: "Distortion level (0=Circle, 100=Organic).",
  },
  blobStrokeWidth: {
    type: ControlType.Number,
    title: "Blob stroke",
    defaultValue: 1,
    min: 0.5,
    max: 5,
    step: 0.5,
    description: "Thickness of the outline lines.",
  },
  previewCursor: {
    type: ControlType.Boolean,
    title: "Cursor preview",
    defaultValue: false,
    description: "Force reveal ON for editing.",
  },
  blobSize: {
    type: ControlType.Number,
    title: "Cursor size",
    defaultValue: 120,
    min: 50,
    max: 400,
    description: "Radius of the reveal mask.",
  },
  shapeComplexity: {
    type: ControlType.Number,
    title: "cursor complexity",
    defaultValue: 0.8,
    min: 0,
    max: 1.5,
    step: 0.1,
    description: "0=Round, 1+=Amoeba shape.",
  },
  roughness: {
    type: ControlType.Number,
    title: "cursor roughness",
    defaultValue: 0,
    min: 0,
    max: 50,
    description: "Edge noise/static effect.",
  },
  speed: {
    type: ControlType.Number,
    title: "cursor speed",
    defaultValue: 250,
    min: 50,
    max: 600,
    description: "Higher = Snappier response.",
  },
  viscosity: {
    type: ControlType.Number,
    title: "cursor viscosity",
    defaultValue: 1,
    min: 0,
    max: 5,
    description: "Higher = Slower, fluid trail.",
  },
});
