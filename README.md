# EchoGPT — Multi-AI Chat Ecosystem

A complete frontend redesign of the EchoGPT ecosystem: a marketing landing page, a multi-AI chat web application, and a reimagined Chrome extension concept — all in a single React + TypeScript project.

---

## Project Overview

EchoGPT is a platform that unifies multiple AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1, Mistral Large, Perplexity Pro) into one chat interface. Users can switch models mid-conversation, compare responses side-by-side, and access AI from any browser tab via a Chrome extension sidebar.

This project delivers three interconnected experiences accessible through hash-based routing:

1. **Landing Page** (`#/landing`) — A modern marketing site with hero, features, AI model showcase, interactive product preview, why-choose section, pricing, testimonials, FAQ, and call-to-action.
2. **Web App** (`#/app`) — A full multi-AI chat interface with conversation history sidebar, real-time model switching, streaming responses, code block rendering, and prompt suggestions.
3. **Chrome Extension Concept** (`#/extension`) — An interactive mockup of the browser sidebar with quick actions (summarize, explain, translate, rewrite), conversation history, prompt library, and settings page.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm

### Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs automatically)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview

# 5. Run TypeScript type checking
npm run typecheck

# 6. Run ESLint
npm run lint
```

The app runs on `http://localhost:5173` in development. No backend setup or API keys are required — all AI responses are simulated locally.

---

## Technologies Used

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | React 18 | UI component architecture |
| Language | TypeScript (strict mode) | Type safety across the entire codebase |
| Build tool | Vite 5 | Fast dev server and production bundling |
| Styling | Tailwind CSS 3 | Utility-first styling with custom theme |
| Icons | Lucide React | Consistent icon system |
| State management | Zustand | Theme state with localStorage persistence |
| Routing | Custom hash-based router | SPA navigation between landing/app/extension |

No additional UI libraries (Material UI, shadcn, etc.) are used — all components are built from scratch with Tailwind CSS for full design control.

---

## Architecture

### Folder Structure

```
src/
├── components/
│   ├── chat/              # Multi-AI chat web app
│   │   ├── ChatApp.tsx         — Main chat layout, state & streaming logic
│   │   ├── ChatSidebar.tsx     — Conversation history panel with search
│   │   ├── ChatInput.tsx       — Message input with prompt suggestions
│   │   ├── MessageBubble.tsx   — Message rendering with code blocks & copy
│   │   └── ModelSelector.tsx   — AI model dropdown picker
│   ├── extension/         # Chrome extension concept
│   │   └── ExtensionView.tsx   — Full extension UI (chat, history, prompts, settings)
│   ├── landing/           # Marketing landing page
│   │   ├── LandingPage.tsx     — Page assembler with skip-link
│   │   ├── Navbar.tsx          — Sticky nav with glass effect & mobile menu
│   │   ├── Hero.tsx            — Hero with animated dual-chat mockup
│   │   ├── Features.tsx        — 6-card feature grid
│   │   ├── AIModels.tsx        — 6 AI model showcase cards
│   │   ├── Preview.tsx         — Interactive 4-tab product preview
│   │   ├── WhyChoose.tsx       — 6 benefits + stats banner
│   │   ├── Pricing.tsx         — 3-tier pricing with highlight
│   │   ├── Testimonials.tsx    — 6 testimonials in masonry layout
│   │   ├── FAQ.tsx             — 8-item accordion FAQ
│   │   ├── CTA.tsx             — Gradient call-to-action banner
│   │   └── Footer.tsx          — 5-column footer with social links
│   └── ui/                # Reusable UI primitives
│       ├── Button.tsx          — Variant + size button system
│       ├── Logo.tsx            — EchoGPT brand logo component
│       ├── Reveal.tsx          — Scroll-triggered reveal animation wrapper
│       └── ThemeToggle.tsx     — Dark/light mode toggle
├── data/
│   ├── content.ts         — AI models, features, pricing, FAQ, testimonials
│   └── chatData.ts        — Chat types, conversation factory, response simulator
├── hooks/
│   ├── useRouter.ts       — Hash-based navigation (landing / app / extension)
│   └── useReveal.ts       — IntersectionObserver scroll reveal
├── stores/
│   └── themeStore.ts      — Zustand theme state with localStorage persistence
├── App.tsx                — Root component with route switching & theme init
├── main.tsx               — React entry point
└── index.css              — Tailwind + custom animations + CSS variables
```

### Key Design Decisions

- **CSS custom properties** (`--bg`, `--text`, `--border`, etc.) drive the theme system, enabling instant dark/light switching without re-rendering components. The `.dark` class on `<html>` toggles all variables.
- **Tailwind `darkMode: 'class'`** ensures `dark:` utility variants respond to the manual toggle, not OS preference.
- **Hash-based routing** keeps the app as a true SPA — no server config needed. Navigate between `#/landing`, `#/app`, and `#/extension`.
- **Zustand** manages theme state with localStorage persistence and respects the user's `prefers-color-scheme` on first visit.
- **Simulated streaming** — AI responses stream word-by-word using `setInterval`, demonstrating the real-time chat experience without requiring API keys.
- **IntersectionObserver** powers scroll-triggered reveal animations — more performant than scroll event listeners.
- **Centralized data layer** — All content (AI models, features, pricing, FAQ, testimonials, chat types) lives in `src/data/`, making it easy to swap simulated data for real API responses.

---

## Assumptions

1. **Simulated AI responses** — Since no real API keys are configured, chat responses use a local response generator (`generateResponse()` in `chatData.ts`) that produces contextual mock answers based on keywords (code, creative, general). The response varies by model ID for realism. The architecture supports swapping in real API calls by replacing the `generateResponse` function.

2. **No backend persistence** — Conversations live in React state and reset on page reload. The data layer (`chatData.ts`) with its `Conversation` and `ChatMessage` interfaces is structured to easily integrate with a real backend (e.g., Supabase) when needed.

3. **Chrome extension is a concept UI** — The extension is presented as an interactive mockup within a browser frame mockup, not as an actual installable Chrome extension. It demonstrates the popup/sidebar UI, settings, navigation, and workflow redesign as specified in the assignment.

4. **All six AI models** are represented with their real branding colors, context windows, and descriptions from their respective providers, but model selection and switching is UI-only — no actual API calls are made.

5. **Single-bundle SPA** — All three views are bundled into one JavaScript file (247KB / 70KB gzipped). No lazy loading or code splitting is used, as the total bundle size is small enough that the complexity isn't justified.

---

## Additional Features Implemented

### Bonus features beyond the core requirements:

- **Dark/Light Mode** — Full theme system with system preference detection (`prefers-color-scheme`), localStorage persistence, and smooth CSS transitions. The toggle is available on all three views (landing, chat, extension). Uses Tailwind `darkMode: 'class'` with CSS custom properties for instant theme switching.

- **Scroll-Triggered Reveal Animations** — Landing page sections fade and slide in as the user scrolls, powered by `IntersectionObserver` for performance. Configurable delay per element via the `Reveal` component.

- **Interactive Product Preview** — Tabbed mockup on the landing page with 4 views: Multi-Model Chat, Side-by-Side Comparison, Browser Extension Sidebar, and Prompt Library. Users can switch tabs to see each feature in action.

- **Streaming Responses** — Simulated word-by-word streaming with a blinking cursor indicator, mimicking real AI chat behavior. Input is disabled during streaming to prevent race conditions.

- **Code Block Rendering** — Messages containing code fences (```` ```language ````) are parsed and rendered as formatted, scrollable code blocks with monospace font.

- **Prompt Suggestions** — Quick-start chips above the chat input and starter cards on the empty state ("Brainstorm ideas", "Explain a concept", "Write code", "Draft an email").

- **Quick Actions in Extension** — One-click actions: Summarize Page, Explain Text, Translate, and Rewrite — designed for the browser sidebar context where users want fast page-aware actions.

- **Prompt Library** — Categorized prompt templates (Writing, Coding, Research, Quick Actions) available in both the web app and the extension. One-click to insert and send.

- **Conversation Management** — Create, search, switch, and delete conversations in both the web app and extension. Conversation titles auto-derive from the first message.

- **Copy to Clipboard** — Hover any AI response to reveal a copy button that copies the full message text.

- **Responsive Design** — All views work from mobile (320px) to desktop (1920px+) with appropriate breakpoints (`sm`, `md`, `lg`). The chat sidebar collapses to an overlay on mobile. The extension mockup hides the fake webpage on small screens.

- **Accessibility (WCAG considerations)** — Skip-to-main-content link on the landing page, ARIA labels on all interactive elements, `aria-expanded` on accordion and mobile menu, keyboard navigation (Enter to send, Enter/Space to select conversations), `focus-visible` rings on buttons, semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`), and `role="button"` with `tabIndex` on clickable non-button elements.

- **SEO Meta Tags** — Updated `<title>`, `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`), and Twitter Card tags.

- **Custom Animations** — Floating background elements, animated gradient text, pulse rings, blinking cursor, smooth hover transitions, and glass morphism effects on the navbar.

- **Masonry Testimonials Layout** — CSS columns-based masonry layout for testimonials, creating a dynamic, non-uniform grid.

- **Stats Banner** — Animated gradient-text statistics (50K+ users, 6+ models, 2M+ messages, 4.9/5 rating) on the Why Choose section.

---

## Evaluation Criteria Alignment

| Criterion | How It's Addressed |
|-----------|-------------------|
| **Frontend architecture** | Clean separation: `components/{landing,chat,extension,ui}`, `data/`, `hooks/`, `stores/`. Each component has a single responsibility. Shared UI primitives reduce duplication. |
| **Code quality & maintainability** | TypeScript strict mode, typed interfaces for all data models, zero `any` types, consistent naming conventions, centralized data layer, no unused imports (enforced by ESLint). |
| **UI/UX implementation** | Cohesive blue/cyan brand palette, consistent 8px spacing, 3 font weights max, 150% body line height, hover states, micro-interactions, progressive disclosure via modals/drawers. |
| **Responsive design** | Mobile-first with breakpoints at `sm` (640px), `md` (768px), `lg` (1024px). Sidebar overlay on mobile, collapsible nav, adaptive grids. |
| **Performance optimization** | 70KB gzipped bundle, IntersectionObserver instead of scroll listeners, CSS-only animations (GPU-accelerated), no heavy dependencies. |
| **Creativity & innovation** | Interactive 4-tab product preview, browser frame extension mockup with highlighted-text context, masonry testimonials, streaming with cursor, dual-chat hero mockup. |
| **Attention to detail** | Glass morphism navbar, gradient text, floating background blurs, focus-visible rings, disabled states during streaming, copy-on-hover, auto-derived conversation titles. |
| **User experience** | Smooth scroll, instant theme toggle, keyboard shortcuts, prompt suggestions, quick actions, searchable history. |
| **Problem-solving approach** | Hash-based routing for SPA without Next.js, CSS variables for theme performance, simulated streaming for demo without API keys, IntersectionObserver for scroll reveals. |
