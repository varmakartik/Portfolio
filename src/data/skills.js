import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFastify,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiSupabase,
  SiRedis,
  SiPython,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiHoppscotch,
  SiNginx,
  SiApache,
  SiGithubactions,
  SiLinux,
  SiJest,
  SiClaude,
  SiQwen,
  SiOllama,
  SiHuggingface,
  SiOpenrouter,
  SiGooglegemini,
  SiLangchain,
  SiMeta,
} from "react-icons/si";

import { RiOpenaiFill } from "react-icons/ri";
import { GrOracle } from "react-icons/gr";

import {
  FaJava,
  FaServer,
  FaUserShield,
  FaBolt,
} from "react-icons/fa";

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    color: "#2563EB",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },

  {
    id: "backend",
    title: "Backend",
    color: "#E50914",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Fastify", icon: SiFastify, color: "#000000" },
      { name: "Flask", icon: SiFlask, color: "#000000" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" }
    ],
  },

  {
    id: "database",
    title: "Database",
    color: "#10B981",
    skills: [
      { name: "Oracle DB", icon: GrOracle, color: "#F80000" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },

  {
    id: "languages",
    title: "Languages",
    color: "#38BDF8",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "SQL", icon: SiSqlite, color: "#003B57" },
    ],
  },

  {
    id: "cloud",
    title: "Cloud & Services",
    color: "#991B1B",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Render", icon: FaServer, color: "#46E3B7" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Clerk Auth", icon: FaUserShield, color: "#6C47FF" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Apache", icon: SiApache, color: "#D22128" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },

  {
    id: "aiml",
    title: "AI & LLM Stack",
    color: "#7C3AED",
    skills: [
      { name: "Claude", icon: SiClaude, color: "#D97706" },
      { name: "Codex", icon: RiOpenaiFill, color: "#10A37F" },
      { name: "Qwen", icon: SiQwen, color: "#615CED" },
      { name: "Ollama", icon: SiOllama, color: "#0F172A" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
      { name: "OpenRouter", icon: SiOpenrouter, color: "#6366F1" },
      { name: "Gemini AI", icon: SiGooglegemini, color: "#2563EB" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      { name: "Llama", icon: SiMeta, color: "#0081FB" },
    ],
  },

  {
    id: "tools",
    title: "Tools & Testing",
    color: "#7F1D1D",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Thunder Client", icon: FaBolt, color: "#0077CC" },
      { name: "Hoppscotch", icon: SiHoppscotch, color: "#31C48D" },
    ],
  },
];

// Flat skills for marquee
export const allSkills = skillCategories.flatMap((cat) => cat.skills);
