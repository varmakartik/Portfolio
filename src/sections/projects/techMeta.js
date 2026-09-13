import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiSupabase,
  SiMysql, SiSqlite, SiRedis, SiDocker, SiJest,
  SiClaude, SiQwen, SiOllama, SiHuggingface, SiOpenrouter, SiGooglegemini, SiLangchain, SiMeta,
} from "react-icons/si"
import { RiOpenaiFill } from "react-icons/ri"
import { GrOracle } from "react-icons/gr"
import { FaUserShield, FaServer, FaEnvelope } from "react-icons/fa"
import { Cpu } from "lucide-react"

/** Shared icon + color metadata for tech stack chips used in Projects and ProjectModal. */
export const techMeta = {
  "Claude": { icon: SiClaude, color: "#D97706" },
  "Codex": { icon: RiOpenaiFill, color: "#10A37F" },
  "OpenAI": { icon: RiOpenaiFill, color: "#10A37F" },
  "Qwen": { icon: SiQwen, color: "#615CED" },
  "Ollama": { icon: SiOllama, color: "#0F172A" },
  "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },
  "OpenRouter": { icon: SiOpenrouter, color: "#6366F1" },
  "Gemini AI": { icon: SiGooglegemini, color: "#2563EB" },
  "Gemini SDK": { icon: SiGooglegemini, color: "#2563EB" },
  "LangChain": { icon: SiLangchain, color: "#1C3C3C" },
  "Llama": { icon: SiMeta, color: "#0081FB" },
  "Jest": { icon: SiJest, color: "#C21325" },
  "Oracle DB": { icon: GrOracle, color: "#F80000" },
  "Oracle": { icon: GrOracle, color: "#F80000" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#0F172A" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#475569" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "SQLite": { icon: SiSqlite, color: "#003B57" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Clerk API": { icon: FaUserShield, color: "#6C47FF" },
  "Clerk Auth": { icon: FaUserShield, color: "#6C47FF" },
  "JWT": { icon: FaUserShield, color: "#D97706" },
  "Recharts": { icon: Cpu, color: "#E11D48" },
  "Realtime DB": { icon: SiSupabase, color: "#3ECF8E" },
  "Realtime Sync": { icon: SiSupabase, color: "#3ECF8E" },
  "Render": { icon: FaServer, color: "#46E3B7" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "OAuth2 PKCE": { icon: FaUserShield, color: "#10B981" },
  "Docker Compose": { icon: SiDocker, color: "#2496ED" },
  "Nodemailer": { icon: FaEnvelope, color: "#3776AB" },
}
