import * as React from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaCode, FaJs, FaMicrochip, FaPython } from "react-icons/fa";
import CursorLens from "./CursorLens";
import SectionBlock from "./components/SectionBlock";
import LoadingScreen from "./components/LoadingScreen";
import { projectsData } from "./components/ProjectsData";
import ProjectCard from "./components/ProjectCard";
import AnimatedHobbyStickers from "./components/AnimatedHobbyStickers";
import SiteHeader from "./components/SiteHeader";
import HeroHud from "./components/HeroHud";

// Lazy-loaded heavy components for performance
const FloatingSkillsCloud = React.lazy(
  () => import("./components/FloatingSkillsCloud"),
);
const CertificationsGallery = React.lazy(
  () => import("./components/CertificationsGallery"),
);
const ContactSection = React.lazy(() => import("./components/ContactSection"));
import "./App.css";
import aboutImage from "./assets/about_me.jpg";
import baseImg from "./assets/base.png";
import revealImg from "./assets/reveal.png";

type TechBadge = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  left: string;
  top: string;
  delay: string;
};

const techBadges: TechBadge[] = [
  { label: "C", icon: FaCode, left: "2%", top: "72%", delay: "0s" },
  { label: "C#", icon: FaCode, left: "10%", top: "48%", delay: "0.4s" },
  { label: "C++", icon: FaCode, left: "24%", top: "28%", delay: "0.8s" },
  { label: "JS", icon: FaJs, left: "40%", top: "14%", delay: "1.2s" },
  { label: "TS", icon: FaCode, left: "58%", top: "12%", delay: "1.6s" },
  { label: "Python", icon: FaPython, left: "76%", top: "24%", delay: "2s" },
  { label: "VHDL", icon: FaCode, left: "90%", top: "44%", delay: "2.4s" },
  { label: "ARM", icon: FaMicrochip, left: "98%", top: "68%", delay: "2.8s" },
];

const navLinks = [
  { label: "HOME", id: "hero" },
  { label: "ABOUT ME", id: "about" },
  { label: "SKILLS", id: "skills" },
  { label: "PROJECTS", id: "projects" },
  { label: "EXPERIENCE / LEARNING", id: "experience" },
  { label: "CONTACT", id: "contact" },
];

// Reusable scroll-reveal wrapper component
function SectionReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="section-reveal"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [onDarkBg, setOnDarkBg] = React.useState(false);
  const aboutRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroToAboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });

  // Calculate header color based on scroll
  // Hero is light background -> text should be dark (#2c330f)
  // About and beyond are dark -> text should be light (#e2e0d4)
  const headerTextColor = useTransform(
    heroToAboutProgress,
    [0.1, 0.4],
    ["#2c330f", "#e2e0d4"],
  );

  const headerBorderColor = useTransform(
    heroToAboutProgress,
    [0.1, 0.4],
    ["rgba(44, 51, 15, 0.4)", "rgba(255, 255, 255, 0.4)"],
  );

  // Track when we've scrolled onto a dark section
  useMotionValueEvent(heroToAboutProgress, "change", (v) => {
    setOnDarkBg(v > 0.25);
  });

  // Lines should be light when on dark backgrounds OR when menu is open
  const needsLightLines = onDarkBg || isMenuOpen;

  const aboutContentOpacity = useTransform(
    heroToAboutProgress,
    [0, 0.45, 1],
    [0.2, 0.65, 1],
  );

  // Lock body scroll while nav is open
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="page-root">
      <SiteHeader
        isMenuOpen={isMenuOpen}
        needsLightLines={needsLightLines}
        headerTextColor={headerTextColor}
        headerBorderColor={headerBorderColor}
        activeSection={activeSection}
        navLinks={navLinks}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onNavigate={scrollToSection}
      />

      <section id="hero" className="hero-section">
        <HeroHud badges={techBadges} />

        <CursorLens
          baseImage={baseImg}
          revealImage={revealImg}
          objectFit="cover"
          backgroundColor="#F2F2F2"
          blobOutlineColor="#A1A1A1"
          parallaxStrength={8}
          showBackground={true}
          bgBlobCount={11}
          bgBlobSize={300}
          bgBlobComplexity={200}
          bgBlobSpeed={0.8}
          blobStrokeWidth={1.5}
          previewCursor={false}
          blobSize={400}
          shapeComplexity={1.5}
          roughness={50}
          speed={600}
          viscosity={4}
        />
      </section>

      {/* About Me — deep olive dark, lime-tinted blobs */}
      <SectionBlock
        id="about"
        className="about-section"
        sectionRef={aboutRef}
        blob={{
          backgroundColor: "#171a10",
          blobColor: "#d2ff00",
          blobCount: 9,
          blobSize: 300,
          blobComplexity: 180,
          blobSpeed: 0.6,
          strokeOpacity: 0.18,
        }}
      >
        <SectionReveal>
          <motion.div
            className="about-layout"
            style={{ opacity: aboutContentOpacity }}
          >
            <div className="about-photo-wrap">
              <img
                src={aboutImage}
                alt="Seif Atef"
                className="about-photo"
                loading="lazy"
              />
            </div>

            <div className="about-copy">
              <h2 className="about-heading about-heading-row">
                About Me <AnimatedHobbyStickers />
              </h2>
              <p>
                Hi, I&apos;m Seif Atef, a Computer Engineering student at Cairo
                University and a full-stack developer interested in building
                intelligent and scalable systems.
              </p>
              <p>
                My work spans frontend and backend development, along with a
                growing focus on artificial intelligence and system
                architecture. I enjoy designing complete solutions, from
                building user interfaces to developing backend services and
                APIs.
              </p>
              <blockquote className="about-quote">
                I don&apos;t always have a solution, but I know how to find one.
              </blockquote>
            </div>
          </motion.div>
        </SectionReveal>
      </SectionBlock>

      {/* Skills — near-black blue-grey, cyan blobs */}
      <SectionBlock
        id="skills"
        blob={{
          backgroundColor: "#0e1117",
          blobColor: "#00d4ff",
          blobCount: 11,
          blobSize: 260,
          blobComplexity: 140,
          blobSpeed: 0.8,
          strokeOpacity: 0.15,
        }}
      >
        <SectionReveal>
          <div className="skills-layout">
            {/* Left Text Column */}
            <div className="skills-copy">
              <h2 className="section-title skills-title">Skills</h2>
              <p className="skills-description">
                A comprehensive toolkit spanning low-level systems programming
                to modern full-stack web architectures.
                <br />
                <br />
                Drag and rotate the interactive 3D cloud to explore the
                languages, frameworks, and tools that power my applications.
              </p>
            </div>

            {/* Right 3D Cloud Column */}
            <div className="skills-canvas-container">
              <React.Suspense
                fallback={
                  <div className="section-loading-fallback">
                    Loading 3D Engine...
                  </div>
                }
              >
                <FloatingSkillsCloud />
              </React.Suspense>
            </div>
          </div>
        </SectionReveal>
      </SectionBlock>

      {/* Projects — dark charcoal, warm amber blobs */}
      <SectionBlock
        id="projects"
        className="projects-section"
        blob={{
          backgroundColor: "#14110e",
          blobColor: "#ff9500",
          blobCount: 10,
          blobSize: 320,
          blobComplexity: 200,
          blobSpeed: 0.5,
          strokeOpacity: 0.16,
        }}
      >
        <div className="projects-shell">
          <SectionReveal>
            <h2 className="section-title section-title-center">Projects</h2>

            <div className="projects-grid">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </SectionBlock>

      {/* Experience — dark olive-green, muted lime blobs */}
      <SectionBlock
        id="experience"
        className="experience-section"
        blob={{
          backgroundColor: "#111810",
          blobColor: "#a8c400",
          blobCount: 8,
          blobSize: 340,
          blobComplexity: 160,
          blobSpeed: 0.65,
          strokeOpacity: 0.2,
        }}
      >
        <SectionReveal>
          <React.Suspense
            fallback={
              <div className="section-loading-fallback padded">
                Loading Experience...
              </div>
            }
          >
            <CertificationsGallery />
          </React.Suspense>
        </SectionReveal>
      </SectionBlock>

      {/* Contact — deep charcoal-purple, soft violet blobs */}
      <SectionBlock
        id="contact"
        className="contact-section"
        blob={{
          backgroundColor: "#110f17",
          blobColor: "#9b7fea",
          blobCount: 9,
          blobSize: 290,
          blobComplexity: 150,
          blobSpeed: 0.55,
          strokeOpacity: 0.18,
        }}
      >
        <SectionReveal>
          <React.Suspense
            fallback={
              <div className="section-loading-fallback padded">
                Loading Contact...
              </div>
            }
          >
            <ContactSection />
          </React.Suspense>
        </SectionReveal>
      </SectionBlock>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const onDone = React.useCallback(() => {
    setLoaded(true);
    // Fire after the next paint so the loader has unmounted and the hero
    // element has its final layout — CursorLens listens for this to prime
    // the reveal blob at the cursor's current position without needing a move.
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("cursor-prime"));
    });
  }, []);

  return (
    <>
      {/* Site renders underneath so resources preload during the loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AppContent />
      </motion.div>

      {/* Loader sits on top (fixed z-9999), unmounts after flash */}
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onDone={onDone} />}
      </AnimatePresence>
    </>
  );
}

export default App;
