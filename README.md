# Kartik Vishwakarma — Full-Stack Developer Portfolio

A high-performance, modern developer portfolio built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **GSAP ScrollTrigger**. Designed for visual excellence, accessibility, and fluid interactions using a clean, light-themed design system with dynamic telemetry ambient colors.

---

## 🎨 Design System & Color Palette

The layout conforms to an off-white, high-contrast theme with dynamic pipeline glows:

- **Primary Accent**: `#2563EB` (Electric Blue) — Highlights, primary calls-to-action, key telemetry logs.
- **AI & LLM Accent**: `#7C3AED` (Purple) — AI & LLM pipeline nodes, chips, and ambient glow.
- **Secondary Accents**: `#38BDF8` (Sky Blue), `#10B981` (Emerald), `#EA580C` (Orange), `#E50914` (Red).
- **Background Layer**: `#F8FAFC` (Slate-50) — Off-white clean layout surface with dynamic scene gradients.
- **Typography**: Space Grotesk, Sora, Outfit, and Syne.

---

## 🚀 Key Features

### 🖥️ Interactive Hero Diagnostics Terminal
- **Three-Tab Terminal**: Live tab selectors for **AI Shell** (scrollable output with interactive commands), **Console Diagnostics**, and **System Diagnostics**.
- **Typing Bio Animation**: Dynamic role cycling detailing Full-Stack, Backend Architecture, and AI engineering skills.
- **Interactive Visual Card**: Flipping interactive identity card with tech tags and real-time status.

### 📊 Software Telemetry Hub
- **7 Categorized Pipeline Nodes**:
  - **Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS.
  - **Backend**: Node.js, Express.js, NestJS, Fastify, Flask, FastAPI.
  - **Database**: Oracle DB, Redis, MongoDB, PostgreSQL, MySQL, SQLite, Supabase.
  - **Languages**: JavaScript, TypeScript, Python, Java, SQL.
  - **Cloud & Services**: Docker, Vercel, Render, Supabase, Clerk Auth, Nginx, Apache, GitHub Actions, Linux.
  - **AI & LLM Stack**: Claude, Codex / OpenAI, Qwen, Ollama, Hugging Face, OpenRouter, Gemini AI, LangChain, Llama.
  - **Tools & Testing**: Git, GitHub, Jest, Postman, Thunder Client.
- **GSAP ScrollTrigger Pinned Navigation**: Left sidebar stays pinned while right-side diagnostic cards scroll and seamlessly update active category and background telemetry glows.
- **Mobile Accordion**: Touch-optimized collapsible panels with category metrics and verified library counts.

### 💼 Career Experience Timeline
- **Career Milestones**: Includes current full-stack role at **Retail Rockets** (`https://retailrockets.in`), previous software engineering internships, and achievements.
- **Scroll-Linked Progression**: Animated vertical timeline track with spring smoothing.

### 📂 Bento-Grid Projects Showcase
- **Tilted GlowCards**: Dynamic hover-tilt effect with accent shadows matching project branding.
- **Interactive Project Modal**: Detailed popups showing architecture highlights, branded tech stack badges, repository references, and live demo links.
- **Category Filter Tabs**: Quick filtering across Full-Stack, Backend, AI/ML, and Mobile applications.

### 🎵 Ambient Audio Player & Three.js Loader
- **Background Music**: Integrated `MusicPlayer` with mute/play controls and autoplay fallback.
- **Neural Network Canvas**: Animated Three.js neural-network loader during initial boot sequence.

### 📄 Direct Resume Downloader
- Native download trigger for the updated resume (`Resume_4.0_Kartik.pdf`).

---

## 🛠️ Technology Stack

| Category | Technologies |
| --- | --- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS |
| **Animation & Scroll** | [Framer Motion](https://www.framer.com/motion/), [GSAP ScrollTrigger](https://greensock.com/), [Lenis](https://lenis.darkroom.engineering/) |
| **3D & Canvas** | [Three.js](https://threejs.org/) |
| **Testing** | [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/), jsdom |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/) |
| **Form Handling** | [EmailJS](https://www.emailjs.com/) & [React Hot Toast](https://react-hot-toast.com/) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Directory Structure

```text
Portfolio/
├── brain.md                    # Persistent project context and architecture guide
├── index.html                  # HTML5 entry point
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite plugins, aliases, and build configuration
├── tailwind.config.js          # Theme tokens, fonts, and animation configuration
├── vercel.json                 # Single-page application rewrites
├── public/
│   ├── profile_photo.jpg       # Profile photo
│   └── Resume_4.0_Kartik.pdf   # Downloadable resume
└── src/
    ├── animations/             # Shared Framer Motion variant definitions
    ├── assets/                 # Background music (p-song.mp3) and images
    ├── components/
    │   ├── layout/             # Navbar and Footer components
    │   ├── loader/             # Three.js neural loader
    │   └── ui/                 # GlowCard, MagneticButton, MusicPlayer, BackgroundEffects
    ├── data/                   # Data sources (skills, experience, projects, personalInfo)
    ├── hooks/                  # useLenis, useMousePosition, useScrollProgress
    ├── sections/               # Page sections
    │   ├── Hero.jsx            # Landing intro, flipping card, HeroTerminal
    │   ├── TechStack.jsx       # Pinned pipeline nodes & diagnostic panels
    │   ├── Experience.jsx      # Scroll-linked career timeline
    │   ├── Projects.jsx        # Bento grid showroom and ProjectModal
    │   ├── Research.jsx        # Education, credentials, and languages
    │   ├── Contact.jsx         # Contact info and submission form
    │   └── TechMessages.jsx    # Alternate technology broadcast view
    ├── App.jsx                 # App shell, loader controller, view router
    ├── index.css               # Design system, CSS tokens, custom scrollbars
    └── main.jsx                # React DOM entry point
```

---

## 💻 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kartikvarma-dev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *The site will be hosted at `http://localhost:5173/`.*

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Lint code**:
   ```bash
   npm run lint
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```


