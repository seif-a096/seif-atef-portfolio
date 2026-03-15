import type { IconType } from "react-icons";
import { 
  FaReact, FaNodeJs, FaDocker, FaPython, FaHtml5
} from "react-icons/fa";
import { 
  SiTypescript, SiJavascript, SiPostgresql, SiMongodb, SiRedis, 
  SiNestjs, SiExpress, SiTailwindcss, SiNextdotjs, SiSupabase, 
  SiCplusplus, SiVercel
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import { BsDatabaseFillDown } from "react-icons/bs";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: { name: string; icon: IconType; color: string }[];
  githubUrl: string;
  liveUrl?: string;
  placeholderColor?: string;
};

export const projectsData: Project[] = [
  {
    id: "prodexa-frontend",
    title: "Prodexa Platform (Frontend)",
    description: "A comprehensive professional networking platform integrating social community features, freelance job marketplaces, and gamified skill-building.",
    image: "/images/prodexa-front.jpg", 
    placeholderColor: "linear-gradient(135deg, #1f2937, #111827)",
    techStack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    githubUrl: "https://github.com/seif-a096/Prodexa_FrontEnd",
    liveUrl: "https://prodexa-platform.vercel.app/"
  },
  {
    id: "prodexa-backend",
    title: "Prodexa Backend",
    description: "The robust core orchestrating real-time interactions, secure auth, WebSockets for live chat, and complex community management logic.",
    image: "/images/prodexa-back.jpg",
    placeholderColor: "linear-gradient(135deg, #4b5563, #1f2937)",
    techStack: [
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
    githubUrl: "https://github.com/seif-a096/Prodexa_Backend",
  },
  {
    id: "wild-oasis-next",
    title: "The Wild Oasis (Next.js)",
    description: "A luxury cabin booking website featuring interactive date selection, reservations, and optimized SSR performance on the App Router.",
    image: "/images/wild-oasis-next.jpg",
    placeholderColor: "linear-gradient(135deg, #0f172a, #020617)",
    techStack: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" }
    ],
    githubUrl: "https://github.com/seif-a096/the-wild-oasis-next",
    liveUrl: "https://the-wild-oasis-next-mocha.vercel.app/"
  },
  {
    id: "wild-oasis-react",
    title: "The Wild Oasis Dashboard",
    description: "A full-featured internal hotel management dashboard handling bookings, capacity filtering, and settings management.",
    image: "/images/wild-oasis.jpg",
    placeholderColor: "linear-gradient(135deg, #1e40af, #1e3a8a)",
    techStack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Vite", icon: SiVercel, color: "#646CFF" }
    ],
    githubUrl: "https://github.com/seif-a096/the-wild-oasis",
    liveUrl: "https://the-wild-oasis-two-gules.vercel.app/"
  },
  {
    id: "natours",
    title: "Natours Tour Booking",
    description: "A full-stack tour booking platform featuring authentication, interactive maps, reviews, and secure checkout processes.",
    image: "/images/natours.jpg",
    placeholderColor: "linear-gradient(135deg, #166534, #14532d)",
    techStack: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Pug", icon: FaHtml5, color: "#A86454" }
    ],
    githubUrl: "https://github.com/seif-a096/natours",
    liveUrl: "https://natours-production-e608.up.railway.app/"
  },
  {
    id: "octopi-frontend",
    title: "Octopi UI",
    description: "An interactive dashboard interface allowing users to input project metrics and visualize machine-learning predicted software development efforts.",
    image: "/images/octopi.jpg",
    placeholderColor: "linear-gradient(135deg, #7e22ce, #581c87)",
    techStack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" }
    ],
    githubUrl: "https://github.com/seif-a096/Octopi"
  },
  {
    id: "octopi-ml-api",
    title: "Octopi ML API",
    description: "A Flask-based backend hosting a machine learning model trained on 500+ projects to predict development effort in person-hours.",
    image: "/images/octopi-ml.jpg",
    placeholderColor: "linear-gradient(135deg, #b91c1c, #991b1b)",
    techStack: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Flask", icon: VscTerminalBash, color: "#ffffff" },
      { name: "Data Science", icon: BsDatabaseFillDown, color: "#FF9900" }
    ],
    githubUrl: "https://github.com/seif-a096/Octopi_model_api"
  },
  {
    id: "sql-docker",
    title: "SQL Server on Mac (Docker)",
    description: "Automated bash setup scripts for running an Azure SQL Edge container on Apple Silicon Macs, facilitating seamless database development without full VMs.",
    image: "/images/sql-docker.jpg",
    placeholderColor: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
    techStack: [
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Bash", icon: VscTerminalBash, color: "#4EAA25" },
      { name: "SQL Server", icon: BsDatabaseFillDown, color: "#CC292B" }
    ],
    githubUrl: "https://github.com/seif-a096/SQL_Docker"
  },
  {
    id: "vhdl-processor",
    title: "Von-Neumann Pipelined Processor",
    description: "A 32-bit Von-Neumann Pipelined Processor modeled in VHDL, implementing a 5-stage pipeline with hazard detection, dynamic branch prediction, and forwarding.",
    image: "/images/vhdl.jpg",
    placeholderColor: "linear-gradient(135deg, #065f46, #064e3b)",
    techStack: [
      { name: "VHDL", icon: VscTerminalBash, color: "#FF6600" },
      { name: "Computer Arch", icon: FaDocker, color: "#a8b9cc" }
    ],
    githubUrl: "https://github.com/seif-a096/VHDL-Von-Neumann-Pipelined-Processor"
  },
  {
    id: "bitboy",
    title: "BitBoy Handheld Console",
    description: "A custom-built retro handheld gaming console powered by an STM32 MCU, packed with 7 classic games all programmed entirely in bare-metal ARM Assembly.",
    image: "/images/bitboy.jpg",
    placeholderColor: "linear-gradient(135deg, #ea580c, #c2410c)",
    techStack: [
      { name: "ARM Assembly", icon: VscTerminalBash, color: "#3070b3" },
      { name: "STM32", icon: VscTerminalBash, color: "#00599C" },
      { name: "Hardware", icon: FaDocker, color: "#F7DF1E" }
    ],
    githubUrl: "https://github.com/Ali-Said1/Bitboy"
  },
  {
    id: "snakemon-ph2",
    title: "Snakemon (Board Game)",
    description: "An object-oriented C++ implementation extending the classic Snakes & Ladders game with Monopoly mechanics, special abilities, and a custom map designer mode.",
    image: "/images/snakemon.jpg",
    placeholderColor: "linear-gradient(135deg, #be185d, #9d174d)",
    techStack: [
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "OOP Design", icon: VscTerminalBash, color: "#ffffff" }
    ],
    githubUrl: "https://github.com/Ali-Said1/snakemon-ph2"
  }
];
