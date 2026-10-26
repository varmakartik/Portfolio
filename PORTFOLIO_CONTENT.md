# Portfolio content guide

## Projects

Edit `src/data/projects.js` for project descriptions, repository links, demos, and engineering notes. `src/data/projectPresentation.js` supplies each project's category and visual theme. The current project artwork is an interface concept, not a screenshot or a statement about production usage.

## AI Creative Lab

The home page includes the lab at `/#ai-lab`. Its dedicated gallery is `/ai-lab` (the existing Vercel SPA rewrite supports direct visits).

Edit `src/data/creativeLab.js`. Collections without `media.src` display the designed placeholder and **In progress**. No AI images or films have been published yet.

To publish an image, put the file in `public/ai-lab/` and add:

```js
media: { type: 'image', src: '/ai-lab/my-image.webp', alt: 'A description of the actual image' }
```

To publish a video, add:

```js
media: { type: 'video', src: '/ai-lab/my-film.mp4', poster: '/ai-lab/my-film-poster.webp' }
```

Update the title and description for the real piece. Supplying media replaces the placeholder and changes that card's status to **Published**. Update the lab-wide introduction/status when the first collection launches. Videos have native controls and do not autoplay.

## GitHub activity

The username comes from `personalInfo.socials.github`. The calendar fetches public profile contribution data from the GitHub Contributions API (`https://github.com/grubersjoe/github-contributions-api`) using `?y=last`. This is a third-party service, not a GitHub-authenticated integration. No API token is needed or exposed. Responses are cached in memory for one hour. The widget validates data, aborts after 12 seconds, and offers retry/profile links on failure. Dates and metrics are derived from the returned data; no demo contribution counts are shown.

## Navigation and accessibility

Section destinations are defined in `src/utils/sectionNavigation.js`. Heading wrappers use `data-section-heading`, so navigation uses a single measured header offset. Keep navigation order consistent with section order in `src/App.jsx`.

Project dialogs open directly, trap keyboard focus, close with Escape, and restore focus. Animations respect reduced-motion preferences. The contribution calendar supports arrow keys, Home, and End.

Run `npm test`, `npm run lint`, and `npm run build` before publishing.

# Portfolio chat and KAI

The existing chat panel in `src/components/ui/PortfolioChat.jsx` keeps its current layout and styling. Set `VITE_KAI_API_URL` to the public base URL of the KAI FastAPI service to enable AI replies. The frontend checks `/health`, posts to `/chat`, and uses the existing local `getPortfolioReply` response when KAI is missing, unhealthy, or fails during a request. It retries KAI on the next message.

The panel subtitle reports `KAI online`, `Checking KAI…`, or `KAI unavailable · Portfolio guide active`. Each answer is labelled `KAI` or `Portfolio guide (KAI unavailable)` so visitors can tell which mode answered it.

New messages enter with a subtle fade and lift, disabled under reduced-motion preferences. On every question, the chat reads the current section from the page's existing navigation anchors and sends its section ID plus a short text excerpt to KAI. This lets KAI resolve "this section" and similar questions without changing the chat layout. The local fallback guide uses the same section ID for those questions.

For local testing, run the KAI backend on `http://127.0.0.1:8000`; the development portfolio uses that URL by default. Set `VITE_KAI_API_URL` if KAI runs elsewhere. For a deployed portfolio, configure the variable in the hosting environment with a publicly reachable HTTPS backend URL. Keep `GROQ_API_KEY` only on the backend; never add it as a Vite variable.

