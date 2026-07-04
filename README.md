# Kartik Ramesh Varma — Premium Developer Portfolio

A premium, high-performance developer portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Optimized for visual excellence, accessibility, and fluid interactions using a clean, light-themed 4-color palette.

Live preview tracks real-time software telemetry, server diagnostics, responsive project showrooms, and timeline experience tracking.

---

## 🎨 Design System & Color Palette

The layout conforms to a premium, accessible off-white theme specified by the following palette:

- **Primary Accent**: `#2563EB` (Electric Blue) — Highlights, primary calls-to-action, key telemetry logs.
- **Secondary Accent**: `#38BDF8` (Sky Blue) — Progress bars, visual links, accents, icons.
- **Background Layer**: `#F8FAFC` (Slate-50) — Off-white clean layout surface.
- **Body & Headings Text**: `#1E293B` (Slate-800) — High-contrast, legible typeface coloring.

---

## 🚀 Key Features

### 🖥️ Real-Time Hero Diagnostics Console
- **Interactive Dashboards**: Live tab selectors inside a telemetry box containing **Console logs**, **Server performance stats**, and **AI Shell triggers**.
- **Typing Bio Animations**: Elegant role typing cycle detailing Full-Stack, API Engineering, and Automation skills.

### 📊 Software Telemetry Hub
- **Interactive Pipelines**: Grouped skill node navigation interface spanning Frontend, Backend, Database, Cloud, and Tools.
- **Fluid Layout**: The category pipeline console stays sticky-pinned to the top of the viewport on larger screens, while the right-side skill grid flows organically alongside vertical scrolling.
- **Responsive Mobile Fallback**: Smooth expandable accordion sections optimized for touch devices.

### 📂 Bento-Grid Projects Showcase
- **Tilted GlowCards**: Dynamic hover-tilt effect with accent shadows matching project branding.
- **Interactive Modal Details**: Detailed popup windows showing key features, technical tag boards, repository references, and live preview links.

### 📄 Direct Resume Downloader
- **Zero-Latency Downloads**: Native download trigger targetting `resume_3.0.pdf` via standard anchor selectors.

### 🕹️ Custom Follower Cursor
- **Micro-Animations**: Custom cursor dots that follow the cursor and fluidly shift color/scale when hovering interactive links.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, hooks, custom viewport entry events)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Fast compiling utility-first framework)
- **Bundler**: [Vite](https://vitejs.dev/) (Ultra-fast Hot Module Replacement building pipeline)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Hardware-accelerated viewport entrance springs)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Project Directory Structure

```filepath
├── public/                 # Static asset folder (Resume PDF, icons)
├── src/
│   ├── animations/         # Framer motion transition presets
│   ├── components/         # Global shared layouts
│   │   ├── cursor/         # Custom trailing cursor
│   │   ├── layout/         # Navbar, footer wrappers
│   │   ├── loader/         # Entrance diagnostics loader screen
│   │   └── ui/             # Reusable interactive cards
│   ├── data/               # Unified content stores (projects, skills, resume details)
│   ├── hooks/              # Native event helpers
│   ├── sections/           # Section page containers (Hero, Projects, Tech, Experience)
│   ├── App.jsx             # Root layout controller
│   ├── index.css           # Tailwind base layers, typography mappings
│   └── main.jsx            # DOM entry hook
├── index.html              # HTML5 template structure
├── vite.config.js          # Vite custom compiler rules
└── package.json            # Script dependencies
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
   *The site will be hosted locally at `http://localhost:5173/` (or `http://localhost:5174/`).*

4. **Build for production**:
   ```bash
   npm run build
   ```
   *Outputs optimized static build bundles inside the `dist/` directory.*

---

