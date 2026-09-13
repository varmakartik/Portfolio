# Portfolio Project Brain

> Persistent project context for developers and AI assistants. Read this file before exploring the repository. It is intended to prevent repeated full-project analysis and reduce token usage.

## AI Quick Start

1. Treat `Portfolio/` as the application root.
2. Read this file first. Do not scan the whole repository unless the requested task changes the architecture or this document appears outdated.
3. For content updates, start in `src/data/`. For visual or behavior updates, open only the relevant file in `src/sections/` or `src/components/`.
4. Before editing, run `git status --short` and preserve all existing user changes.
5. After meaningful architecture, dependency, route, or folder changes, update this file.
6. Verify code changes with `npm run lint` and `npm run build` when practical.

## Project Summary

This is Kartik Vishwakarma's personal developer portfolio. It is a single-page React application with animated sections, a light blue/slate visual theme, background music, a Three.js loading screen, project filtering, and a contact form.

Most portfolio content is separated from presentation code and stored in `src/data/`. Prefer updating those data files instead of hardcoding content inside components.

## Technology Stack

| Area | Technology |
| --- | --- |
| Build tool | Vite 8 |
| UI framework | React 19 |
| Styling | Tailwind CSS 4 plus global CSS |
| Animation | Framer Motion, GSAP, Three.js |
| Icons | Lucide React and React Icons |
| Contact form | EmailJS browser SDK |
| Notifications | React Hot Toast |
| Deployment | Vercel SPA rewrite |
| Linting | Oxlint |
| Testing | Vitest, Testing Library, jsdom |

Installed packages also include Lenis, React Router, React CountUp, React Type Animation, and React Intersection Observer. Not every installed package is fully used.

## Commands

Run commands from `Portfolio/`:

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

Vite uses path aliases such as `@`, `@components`, `@sections`, `@hooks`, `@data`, `@animations`, and `@assets`. Existing files mostly use relative imports, so follow the local style of the file being edited.

## Application Flow

```text
index.html
  -> src/main.jsx
     -> src/App.jsx
        -> Loader (initial five-second loading experience)
        -> MusicPlayer
        -> URL pathname decides the visible view
           -> Main portfolio view
              -> Navbar
              -> Hero
              -> TechStack
              -> Experience
              -> Projects
              -> Research
              -> Contact
              -> Footer
           -> TechMessages alternate view
```

The main portfolio uses section IDs for navigation: `hero`, `skills`, `experience`, `projects`, `research`, and `contact`. Navbar and footer links call `scrollIntoView()`.

`App.jsx` currently handles the alternate view with `window.location.pathname` and a custom browser `navigate` event. React Router is installed but is not the primary navigation system.

## Folder Structure

```text
Portfolio/
|-- brain.md                    # This persistent project guide
|-- index.html                  # Vite HTML entry point
|-- package.json                # Dependencies and scripts
|-- package-lock.json           # Locked dependency versions
|-- vite.config.js              # React/Tailwind plugins and aliases
|-- tailwind.config.js          # Theme tokens, fonts, animations
|-- vercel.json                 # Rewrites all routes to index.html
|-- README.md                   # Older human-facing setup notes
|-- scratch_light.js            # Experimental/reference script
|-- scratch_palette.js          # Experimental/reference script
|-- public/
|   |-- profile_photo.jpg       # Profile image
|   |-- Resume_4.0_Kartik.pdf   # Downloadable resume
|   |-- portfolio.png           # Portfolio image asset
|   `-- up.png                  # Legacy rocket asset; currently unused
`-- src/
    |-- main.jsx                # React DOM mounting and global CSS import
    |-- App.jsx                 # App shell, loader state, view selection
    |-- App.css                 # App-level styles
    |-- index.css               # Global theme, utilities, animations, cursor CSS
    |-- animations/
    |   `-- variants.js         # Shared Framer Motion variants
    |-- assets/
    |   |-- hero.png            # Hero visual
    |   |-- p-song.mp3          # Background music
    |   |-- react.svg           # Starter/legacy asset
    |   `-- vite.svg            # Starter/legacy asset
    |-- components/
    |   |-- layout/
    |   |   |-- Navbar.jsx
    |   |   `-- Footer.jsx
    |   |-- loader/
    |   |   `-- Loader.jsx
    |   `-- ui/
    |       |-- BackgroundEffects.jsx
    |       |-- GlowCard.jsx
    |       |-- MagneticButton.jsx
    |       `-- MusicPlayer.jsx
    |-- data/
    |   |-- personalInfo.js     # Name, bio, contact, resume, socials
    |   |-- skills.js           # Categorized technology stack
    |   |-- experience.js       # Employment/internship timeline
    |   |-- projects.js         # Project cards, filters, modal details
    |   |-- education.js        # Education, certification, languages
    |   `-- research.js         # Research-related data; check usage before editing
    |-- hooks/
    |   |-- useLenis.js         # Lenis instance synchronized with GSAP ScrollTrigger
    |   |-- useMousePosition.js # Window mouse coordinates
    |   `-- useScrollProgress.js# Scroll percentage and CSS variable
    `-- sections/
        |-- Hero.jsx            # Intro, typewriter, terminal, CTAs, profile card
        |-- TechStack.jsx       # Skill categories and responsive accordions
        |-- Experience.jsx      # Animated vertical career timeline
        |-- Projects.jsx        # Filters, cards, detail modal
        |-- Research.jsx        # Education/certifications/languages UI
        |-- Contact.jsx         # Contact details and EmailJS form
        `-- TechMessages.jsx    # Alternate quote/broadcast-style screen
```

## File Responsibilities

### Entry and Shell

- `src/main.jsx` mounts React and imports the global stylesheet.
- `src/App.jsx` owns startup loader state, global decorative/UI components, and portfolio-versus-tech-messages view selection.
- `src/index.css` is the main design foundation. Check it before adding duplicate utility classes, keyframes, or typography rules.
- `src/App.css` contains additional app-specific styling.

### Sections

- `Hero.jsx` is the landing section. It includes animated roles, social/resume actions, a flipping visual card, and a three-tab terminal (`HeroTerminal.jsx`) with AI Shell selected first, Console Diagnostics second, and System third. AI Shell history scrolls only inside its output panel.
- `TechStack.jsx` reads categorized skills. On desktop, GSAP ScrollTrigger pins the left pipeline list while the right diagnostic panels scroll and update the active category. Mobile uses an accordion.
- `Experience.jsx` reads timeline data (including current role at Retail Rockets) and uses scroll-linked animation for the progress line.
- `Projects.jsx` reads project data, derives filters, and manages selected-project modal state with Bento grid layouts and branded tech badges (`techMeta.js`).
- `Research.jsx` presents education, certification, and languages UI.
- `Contact.jsx` presents contact information and sends form data through EmailJS.
- `TechMessages.jsx` is a separate screen with technology-themed messages/quotes.

### Shared Components

- `Navbar.jsx` contains responsive anchored navigation and view switching.
- `Footer.jsx` repeats section navigation, social links, copyright, and back-to-top behavior.
- `Loader.jsx` displays an animated boot sequence and creates a Three.js neural-network canvas.
- `MusicPlayer.jsx` creates an `Audio` instance for `p-song.mp3`, attempts autoplay, falls back to user interaction, and provides audio controls.
- `GlowCard.jsx`, `MagneticButton.jsx`, and `BackgroundEffects.jsx` provide reusable visual effects.

## Data Ownership

Use this map for normal content edits:

| Content | Primary file | Key Details |
| --- | --- | --- |
| Name, headline, bio, email, phone, location | `src/data/personalInfo.js` | Socials, resume link, contact details |
| Skills and category colors/icons | `src/data/skills.js` | Frontend, Backend, Database, Languages, Cloud & Services, **AI & LLM Stack**, Tools & Testing |
| Work history and achievements | `src/data/experience.js` | Includes **Retail Rockets** (Full-Stack Software Developer), previous roles, and milestones |
| Projects, tags, links, descriptions | `src/data/projects.js` | Featured Bento works, repositories, live links |
| Degree, GPA, certificate, languages | `src/data/education.js` | Academic credentials and certifications |
| Research-specific records | `src/data/research.js` | Academic and technical publications |

## Skill Categories Architecture

`src/data/skills.js` organizes technical skills into 7 pipeline nodes:
1. `frontend` (Blue `#2563EB`): React, Next.js, TypeScript, JavaScript, Tailwind CSS.
2. `backend` (Red `#E50914`): Node.js, Express.js, NestJS, Fastify, Flask, FastAPI.
3. `database` (Green `#10B981`): Oracle DB, Redis, MongoDB, PostgreSQL, MySQL, SQLite, Supabase.
4. `languages` (Sky `#38BDF8`): JavaScript, TypeScript, Python, Java, SQL.
5. `cloud` (Crimson `#991B1B`): Docker, Vercel, Render, Supabase, Clerk Auth, Nginx, Apache, GitHub Actions, Linux.
6. `aiml` (Purple `#7C3AED`): Claude, Codex, Qwen, Ollama, Hugging Face, OpenRouter, Gemini AI, LangChain, Llama.
7. `tools` (Orange `#7F1D1D`): Git, GitHub, Jest, Postman, Thunder Client, VS Code, npm.

## Recent Major Updates & Fixes (September 2026)

1. **AI & LLM Stack Pipeline Node**:
   - Added full `aiml` skill category in `src/data/skills.js` positioned immediately after `Cloud & Services`.
   - Integrated icons and brand metadata across `TechStack.jsx` and `techMeta.js`.
2. **TechStack GSAP ScrollTrigger Calibration**:
   - Fixed `boundaryTrigger` (`start: 'top 60%'`, `end: 'bottom 10%'`) to prevent premature reset to `'all'` when viewing lower panels.
   - Added `pb-[35vh]` to the panels container to enable smooth desktop pinning and scroll-spy tracking through all categories.
   - Dynamically mapped telemetry accent themes (`sceneTheme`) and category proficiencies across desktop cards and mobile accordions.
3. **Skills Expansion**:
   - Added DevOps/Servers: **Nginx**, **Apache**, **GitHub Actions**, **Linux**.
   - Added Databases: **Oracle DB**, **Redis**.
   - Added Testing: **Jest**.
4. **Experience Update**:
   - Added active full-stack role at **Retail Rockets** (`https://retailrockets.in`).
5. **Encoding Clean-up**:
   - Replaced text encoding mojibake (such as `2026 â€¢ Active`, `Â©`, `â€“`) with standard UTF-8 characters (`2026 • Active`).
6. **Automated Testing Suite**:
   - Comprehensive Vitest suite in `src/**/*.test.jsx?` covering `data.test.js`, `skills.test.js`, `Navbar.test.jsx`, `Footer.test.jsx`, `Hero.test.jsx`, and `Projects.test.jsx` (23 tests passing).

## Visual System

The current implemented design is primarily a light theme:

- Page/background: pale slate and white surfaces with dynamic telemetry ambient colors.
- Primary accent: blue (`#2563EB`), with category-specific glows (cyan, rose, emerald, amber, crimson, purple, orange).
- Typography families configured in Tailwind: Space Grotesk, Sora, Outfit, and Syne.
- Motion: Framer Motion reveals, GSAP ScrollTrigger pinning, Lenis smooth scroll, hover glows, and Three.js neural canvas.
- Responsive layouts use Tailwind breakpoints, including custom `xs` and `3xl` screens.

Maintain this visual language unless the task explicitly requests a redesign. Check mobile layout, keyboard navigation, reduced motion, and color contrast when adding effects.

## Important Current Issues and Risks

These are known from the repository audit and should be considered before feature work:

1. Several source files contained text-encoding artifacts such as `Â©`, `â€“`, and `2026 â€¢ Active`. Cleaned to UTF-8 (`2026 • Active`). Maintain standard UTF-8 in future edits.
2. EmailJS values in the contact form are placeholders, so production delivery is not fully configured. Do not commit secret/private keys; use Vite environment variables.
3. The `Research` section currently represents education and credentials, which can confuse users and maintainers.
4. Navigation uses a custom event/pathname mechanism even though React Router is installed. Direct navigation and browser history deserve testing.
5. Some components, especially `Hero.jsx`, are large and combine several responsibilities.
6. `README.md` is stale in places and may reference an older resume filename.
7. Loader duration is configured with neural-network animation. Any performance work should inspect cleanup and reduced-motion behavior.
8. Background audio autoplay is browser-dependent and provides explicit mute/play user controls.
9. Some dependencies and starter assets appear unused. Confirm with search before removing them.

## Improvement Priorities

A sensible improvement order is:

1. Fix visible text encoding issues and stale content/links (Completed).
2. Make contact submission production-ready with validated environment configuration and honest error states.
3. Improve accessibility: reduced motion, keyboard behavior, focus handling, semantic labels, audio preference, and modal focus trapping.
4. Reduce startup/performance cost from loader, Three.js, custom cursor, and heavy animation.
5. Clarify section naming and navigation architecture.
6. Split oversized components while preserving behavior.
7. Remove confirmed unused packages/assets and align documentation.
8. Add component or end-to-end tests for navigation, project filters/modal, resume link, and contact form (Completed Vitest suite).

## Change Guidelines

- Keep content in `src/data/` and reusable behavior in `src/components/` or `src/hooks/`.
- Avoid duplicating colors and animations when a theme token or global class already exists.
- Preserve desktop and mobile behavior for every section change.
- Avoid changing data keys without updating every component that consumes them.
- Do not expose EmailJS or other private configuration directly in source; use `VITE_*` environment variables and document required names in `.env.example`.
- Dispose Three.js resources and remove event listeners/timers in effect cleanup functions.
- Respect `prefers-reduced-motion` for new animation work.
- Keep public asset references rooted at `/`, for example `/Resume_4.0_Kartik.pdf`.
- Preserve user changes shown by Git; never reset unrelated work.

## Verification Checklist

After changes, run the test and lint suites:

```bash
npm run lint
npm test
npm run build
```

Then manually verify:

- The loader exits and the portfolio renders.
- Navbar and footer links scroll to the correct section.
- Mobile navigation opens, closes, and scrolls correctly.
- Project filtering and project modal work.
- Resume and external social links point to valid destinations.
- Contact form gives truthful success/error feedback.
- Alternate Tech Messages navigation and browser back behavior work.
- No horizontal overflow appears on mobile.
- Music controls work when autoplay is blocked.

## Keeping This Brain Current

Update `brain.md` whenever any of these change:

- Folder structure or important filenames.
- Routes/views or section IDs.
- Core dependencies, scripts, deployment, or environment variables.
- Data-file ownership or object shapes.
- Major component responsibilities.
- Known issues that are fixed or newly discovered.

---

## Agent Changelog & Execution History

### Entry: 2026-09-14 00:11:00 IST | Agent: Antigravity Coding Assistant

- **1. AI & LLM Stack Category Addition**:
  - Added new `aiml` section in `src/data/skills.js` positioned immediately after `Cloud & Services` with `#7C3AED` purple theme and `Sparkles` icon.
  - Added skills: **Claude** (`SiClaude`), **Codex** (`RiOpenaiFill`), **Qwen** (`SiQwen`), **Ollama** (`SiOllama`), **Hugging Face** (`SiHuggingface`), **OpenRouter** (`SiOpenrouter`), **Gemini AI** (`SiGooglegemini`), **LangChain** (`SiLangchain`), **Llama** (`SiMeta`).
  - Added metadata, icons, and chip styling in `src/sections/projects/techMeta.js`.
- **2. TechStack GSAP ScrollTrigger & Pinning Fix**:
  - Corrected `boundaryTrigger` (`start: 'top 60%'`, `end: 'bottom 10%'`) in `src/sections/TechStack.jsx` so scrolling into lower panels (**AI & LLM Stack** and **Tools & Testing**) does not trigger premature unpinning or reset the active category back to `'all'`.
  - Added `pb-[35vh]` bottom padding to right column panels so lower panels reach the trigger midpoint smoothly while the left sidebar stays pinned.
  - Linked dynamic `sceneTheme` and category proficiencies for AI and Tools in both desktop view and mobile accordions.
- **3. Additional Technical Skills Added**:
  - Added DevOps/Servers: **Nginx** (`SiNginx`), **Apache** (`SiApache`), **GitHub Actions** (`SiGithubactions`), **Linux** (`SiLinux`).
  - Added Databases: **Oracle DB** (`GrOracle`), **Redis** (`SiRedis`).
  - Added Testing: **Jest** (`SiJest`).
- **4. Work Experience Update**:
  - Added current Full-Stack Software Developer role at **Retail Rockets** (`https://retailrockets.in`) in `src/data/experience.js`.
- **5. Encoding Mojibake Clean-Up**:
  - Cleaned text encoding artifacts across all files (including `2026 â€¢ Active` &rarr; `2026 • Active`, `Â©`, `â€“`).
- **6. Featured Works Bento Grid UI Preservation**:
  - Preserved the interactive Bento grid layout, project modals, and tech chips in `src/sections/Projects.jsx`.
- **7. Automated Testing Suite & Linting**:
  - Configured and passed all **23 tests across 6 test suites** using Vitest (`npm test` / `npx vitest run`).
  - Resolved ESLint warnings and duplicate keys in `techMeta.js` via `oxlint`.
