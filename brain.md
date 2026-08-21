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
- `src/App.jsx` owns startup loader completion, global decorative/UI components, and portfolio-versus-tech-messages view selection.
- `src/index.css` is the main design foundation. Check it before adding duplicate utility classes, keyframes, or typography rules.
- `src/App.css` contains additional app-specific styling; some Vite-era styles may be legacy.

### Sections

- `Hero.jsx` is the landing section. It includes animated roles, social/resume actions, a flipping visual card, and a three-tab terminal with AI Shell selected first, Console Diagnostics second, and System third. AI Shell history scrolls only inside its output panel.
- `TechStack.jsx` reads categorized skills. On desktop, GSAP ScrollTrigger pins the left pipeline list while the right diagnostic panels scroll and update the active category. Mobile uses an accordion.
- `Experience.jsx` reads timeline data and uses scroll-linked animation for the progress line.
- `Projects.jsx` reads project data, derives filters, and manages selected-project modal state.
- `Research.jsx` currently presents education, certification, and languages. Its visible purpose does not match its filename/section label exactly.
- `Contact.jsx` presents contact information and sends form data through EmailJS when valid service credentials are supplied.
- `TechMessages.jsx` is a separate screen with technology-themed messages/quotes.

### Shared Components

- `Navbar.jsx` contains responsive anchored navigation and view switching.
- `Footer.jsx` repeats section navigation, social links, copyright, and back-to-top behavior.
- `Loader.jsx` displays a fixed five-second boot sequence and creates a Three.js neural-network canvas. Any performance work should inspect cleanup and reduced-motion behavior here.
- `MusicPlayer.jsx` creates an `Audio` instance for `p-song.mp3`, attempts autoplay, falls back to the first user interaction, and provides a mute/play button.
- `GlowCard.jsx`, `MagneticButton.jsx`, and `BackgroundEffects.jsx` provide reusable visual effects.

## Data Ownership

Use this map for normal content edits:

| Content | Primary file |
| --- | --- |
| Name, headline, bio, email, phone, location | `src/data/personalInfo.js` |
| Social/profile links and resume path | `src/data/personalInfo.js` |
| Skills and category colors/icons | `src/data/skills.js` |
| Work history and achievements | `src/data/experience.js` |
| Projects, tags, links, descriptions | `src/data/projects.js` |
| Degree, GPA, certificate, languages | `src/data/education.js` |
| Research-specific records | `src/data/research.js` |

When changing an object shape, search for every consumer before editing. UI components rely directly on data property names and there is no schema validation or TypeScript checking.

## Visual System

The current implemented design is primarily a light theme:

- Page/background: pale slate and white surfaces.
- Primary accent: blue (`#2563EB`).
- Secondary accents: sky blue, emerald, and pink.
- Typography families configured in Tailwind: Space Grotesk, Sora, Outfit, and Syne.
- Motion is a major part of the experience: entrance reveals, hover glow, scrolling timelines, background effects, custom cursor, loader, and music feedback.
- Responsive layouts use Tailwind breakpoints, including custom `xs` and `3xl` screens.

Maintain this visual language unless the task explicitly requests a redesign. Check mobile layout, keyboard navigation, reduced motion, and color contrast when adding effects.

## Important Current Issues and Risks

These are known from the repository audit and should be considered before feature work:

1. Several source files contain text-encoding artifacts such as `Â©`, `â€“`, and similar mojibake. Clean these carefully as UTF-8 text.
2. EmailJS values in the contact form are placeholders, so production delivery is not fully configured. Do not commit secret/private keys; use Vite environment variables.
3. The `Research` section currently represents education and credentials, which can confuse users and maintainers.
4. Navigation uses a custom event/pathname mechanism even though React Router is installed. Direct navigation and browser history deserve testing.
5. Some components, especially `Hero.jsx`, are large and combine several responsibilities.
6. `README.md` is stale in places and may reference an older resume filename.
7. Loader always lasts about five seconds, which may feel slow and adds WebGL work before content appears.
8. Background audio autoplay is browser-dependent and may be undesirable for accessibility or user preference.
9. Some dependencies and starter assets appear unused. Confirm with search before removing them.

## Improvement Priorities

A sensible improvement order is:

1. Fix visible text encoding issues and stale content/links.
2. Make contact submission production-ready with validated environment configuration and honest error states.
3. Improve accessibility: reduced motion, keyboard behavior, focus handling, semantic labels, audio preference, and modal focus trapping.
4. Reduce startup/performance cost from the fixed loader, Three.js, custom cursor, and heavy animation.
5. Clarify section naming and navigation architecture.
6. Split oversized components while preserving behavior.
7. Remove confirmed unused packages/assets and align documentation.
8. Add component or end-to-end tests for navigation, project filters/modal, resume link, and contact form.

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

After changes, use the checks relevant to the task:

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

For ordinary copy, style, or isolated bug fixes, updating this file is unnecessary unless the description above becomes inaccurate.

Last repository analysis: 2026-08-21.
