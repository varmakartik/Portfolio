import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiSupabase,
  SiPython,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
} from "react-icons/si";

import {
  FaBrain,
  FaJava,
  FaServer,
  FaUserShield,
} from "react-icons/fa";

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    color: "#2563EB",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
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
    ],
  },

  {
    id: "database",
    title: "Database",
    color: "#10B981",
    skills: [
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
    ],
  },

  {
    id: "tools",
    title: "Tools",
    color: "#7F1D1D",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },

  // AI / ML (Unchanged)
  // {
  //   id: "aiml",
  //   title: "AI / ML",
  //   color: "#2563EB",
  //   skills: [
  //     { name: "TensorFlow", icon: SiTensorflow, color: "#2563EB" },
  //     { name: "PyTorch", icon: SiPytorch, color: "#E50914" },
  //     { name: "Scikit-learn", icon: SiScikitlearn, color: "#10B981" },
  //     { name: "OpenAI API", icon: FaBrain, color: "#FFFFFF" },
  //   ],
  // },
];

// Flat skills for marquee
export const allSkills = skillCategories.flatMap((cat) => cat.skills);