import type { IconType } from "react-icons";
import { 
  FaCode, FaJs, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, 
  FaDocker, FaGithub, FaLinux, FaWindows, FaApple 
} from "react-icons/fa";
import { 
  SiC, SiCplusplus, SiTypescript, SiAssemblyscript, SiVercel,
  SiTailwindcss, SiFigma, SiExpress, SiMongoose, SiMongodb, SiPostgresql, 
  SiRos, SiRedux, SiNpm
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscTerminalBash } from "react-icons/vsc";
import { BsDatabaseFillDown } from "react-icons/bs";

export type SkillNode = {
  name: string;
  icon?: IconType;
  children?: SkillNode[];
  color?: string; // Hex color for the leaf/icon 
};

export const skillsTreeData: SkillNode = {
  name: "Skills",
  color: "#ffffff",
  children: [
    {
      name: "Languages",
      color: "#8ca83d",
      children: [
        { name: "C", icon: SiC, color: "#a8b9cc" },
        { name: "C++", icon: SiCplusplus, color: "#00599C" },
        { name: "C#", icon: TbBrandCSharp, color: "#239120" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "ARM Assembly", icon: SiAssemblyscript, color: "#3070b3" },
        { name: "VHDL", icon: FaCode, color: "#FF6600" },
        { name: "Bash", icon: VscTerminalBash, color: "#4EAA25" },
      ]
    },
    {
      name: "Frontend",
      color: "#4ab5bd",
      children: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" },
        { name: "Next.js", icon: SiVercel, color: "#ffffff" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      ]
    },
    {
      name: "Backend",
      color: "#bf5656",
      children: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#ffffff" },
        { name: "REST APIs", icon: FaCode, color: "#3399FC" },
        { name: "Mongoose", icon: SiMongoose, color: "#880000" },
      ]
    },
    {
      name: "Databases",
      color: "#bfb256",
      children: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "Relational", icon: BsDatabaseFillDown, color: "#CC292B" },
        { name: "NoSQL", icon: BsDatabaseFillDown, color: "#47A248" },
      ]
    },
    {
      name: "Tools & OS",
      color: "#9b56bf",
      children: [
        { name: "Docker", icon: FaDocker, color: "#2496ED" },
        { name: "Git / GitHub", icon: FaGithub, color: "#F05032" },
        { name: "npm", icon: SiNpm, color: "#CB3837" },
        { name: "Scripting", icon: VscTerminalBash, color: "#4EAA25" },
        { name: "ROS", icon: SiRos, color: "#22314E" },
        { name: "Linux", icon: FaLinux, color: "#FCC624" },
        { name: "Windows", icon: FaWindows, color: "#0078D6" },
        { name: "macOS", icon: FaApple, color: "#A3AAAE" },
      ]
    }
  ]
};
