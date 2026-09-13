/* "Hello" in a handful of languages, cycled by the typewriter greeting.
   Kept short and left-to-right: the greeting animates character by
   character, which breaks the contextual joining of RTL scripts.       */
export const greetings = [
  "Howdy",
  "Hello",
  "Halo",
  "Hola",
  "Salut",
  "Ciao",
  "Olá",
  "Hej",
  "Privet",
  "你好",
  "안녕",
] as const;

export type WorkIcon =
  | "ship"
  | "megaphone"
  | "building"
  | "code"
  | "graduation"
  | "layout"
  | "globe";

export type WorkExperience = {
  id: string;
  company: string;
  /** Logo file in /public; falls back to the company monogram when absent. */
  logo?: string;
  period: string;
  role: string;
  projects: {
    icon: WorkIcon;
    name: string;
    description: string;
    /** Project id — makes the row link to /projects/<slug>. */
    slug?: string;
  }[];
};

export type Writing = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  readingTime: number;
};

export type ProjectImage = {
  /** File in /public — e.g. "/projects/emanifest/dashboard.png". */
  src: string;
  caption: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  archived?: boolean;
  /* Everything below feeds the detail page at /projects/<id>. */
  year: string;
  role: string;
  /** One entry per paragraph. */
  overview: string[];
  stack: string[];
  highlights: string[];
  /** Screenshots. The gallery is skipped entirely when this is empty. */
  images?: ProjectImage[];
};

export type StackCategory = {
  id: string;
  label: string;
  icon: "frontend" | "backend" | "database" | "tooling";
  items: {
    name: string;
    note: string;
  }[];
};

export const works: WorkExperience[] = [
  {
    id: "abhipraya",
    company: "Abhipraya",
    logo: "/abhi.png",
    period: "2024 – Present",
    role: "Software Engineer / Web Developer",
    projects: [
      {
        icon: "ship",
        name: "eManifest (Kemenhub)",
        slug: "emanifest",
        description: "Sistem manifest digital Kemenhub RI",
      },
      {
        icon: "megaphone",
        name: "eKompu (Kemen PUPR)",
        slug: "ekompu",
        description: "Portal biro komunikasi publik Kementerian PUPR",
      },
      {
        icon: "building",
        name: "PKP HUB (Kemen PKP)",
        slug: "pkp-hub",
        description: "Platform portal perumahan & kawasan permukiman",
      },
    ],
  },
  {
    id: "studi-independen-2",
    company: "Studi Independen (Batch 2)",
    logo: "/celerates.png",
    period: "2023 – 2024",
    role: "Full-Stack Web Development Fellow",
    projects: [
      {
        icon: "code",
        name: "Advanced Web Engineering",
        description: "Full-stack development, API design, and system architecture",
      },
      {
        icon: "graduation",
        name: "Capstone Project",
        description: "End-to-end collaborative production-ready web application",
      },
    ],
  },
  {
    id: "studi-independen-1",
    company: "Studi Independen (Batch 1)",
    logo: "/nf.png",
    period: "2023",
    role: "Frontend Engineering Fellow",
    projects: [
      {
        icon: "layout",
        name: "Modern Frontend & UI/UX",
        description: "Responsive web apps, state management, and modern JavaScript",
      },
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    period: "2022 – 2023",
    role: "Web Developer",
    projects: [
      {
        icon: "globe",
        name: "Client Web Platforms",
        description: "Custom websites and web applications for local clients",
      },
    ],
  },
];

export const stack: StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "frontend",
    items: [
      { name: "TypeScript", note: "Type-safe by default" },
      { name: "React", note: "Component-driven interfaces" },
      { name: "Next.js", note: "App Router, SSR & RSC" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Framer Motion", note: "Interface motion & transitions" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "backend",
    items: [
      { name: "Node.js", note: "Services & API layers" },
      { name: "Laravel", note: "PHP apps & enterprise portals" },
      { name: "Express", note: "Lightweight REST routing" },
      { name: "REST API", note: "Contract-first design" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "database",
    items: [
      { name: "PostgreSQL", note: "Primary relational store" },
      { name: "MySQL", note: "Legacy & government systems" },
      { name: "Prisma", note: "Type-safe data access" },
      { name: "Redis", note: "Caching & background queues" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    icon: "tooling",
    items: [
      { name: "Git", note: "Trunk-based workflow" },
      { name: "Docker", note: "Reproducible environments" },
      { name: "Vercel", note: "Preview & production deploys" },
      { name: "Figma", note: "Design handoff" },
    ],
  },
];

export const writings: Writing[] = [
  {
    slug: "building-scalable-react-architecture",
    title: "Building Scalable React Architecture",
    date: "Aug 2026",
    description: "Patterns and practices for large React applications.",
    readingTime: 8,
    content: `
# Building Scalable React Architecture

When building large React applications, architecture decisions made early can have lasting impact. Here are the patterns I've found most effective.

## Feature-Based Structure

Instead of organizing by file type (components, hooks, utils), organize by feature:

\`\`\`
src/
  features/
    auth/
      components/
      hooks/
      api/
      types.ts
    dashboard/
      ...
\`\`\`

This approach keeps related code together and makes features self-contained.

## State Management

For most apps, a combination of React Query (server state) and Zustand (client state) covers 99% of use cases. Avoid Redux unless you have a very specific need for its dev tools or middleware ecosystem.

## Component Patterns

**Compound components** are great for complex UI with shared state:

\`\`\`tsx
<Select>
  <Select.Trigger />
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
  </Select.Content>
</Select>
\`\`\`

## Performance

Profile first, optimize second. The most common performance issues:
- Too many re-renders (use React DevTools Profiler)
- Heavy computations without memoization
- Missing virtualization for long lists

## Conclusion

Good architecture is invisible — it makes the codebase easy to navigate and extend without getting in your way.
    `,
  },
  {
    slug: "why-i-love-typescript",
    title: "Why I Love TypeScript",
    date: "Jun 2026",
    description:
      "How TypeScript changed the way I think about code correctness.",
    readingTime: 5,
    content: `
# Why I Love TypeScript

I was skeptical about TypeScript for a long time. I thought it would slow me down. I was wrong.

## The Turning Point

The moment it clicked for me was when I refactored a large JavaScript codebase to TypeScript. The number of bugs caught at compile time was staggering.

## What I Love Most

**Autocomplete**: The IDE knows what properties exist on every object. This alone saves hours of documentation lookups.

**Refactoring confidence**: Rename a function, and TypeScript tells you every call site. No more grep-and-pray.

**Self-documenting code**: Types are documentation that can't go out of date.

## Common Objections

*"It's too verbose"* — Use inference. TypeScript is smart enough that explicit types are rarely needed.

*"It slows you down"* — Only initially. The speed you gain from better tooling pays back within days.

## Takeaway

If you're still writing JavaScript without types, give TypeScript a serious try for one month. I suspect you won't go back.
    `,
  },
  {
    slug: "the-power-of-css-custom-properties",
    title: "The Power of CSS Custom Properties",
    date: "Mar 2026",
    description: "Using CSS variables to build maintainable design systems.",
    readingTime: 6,
    content: `
# The Power of CSS Custom Properties

CSS Custom Properties (variables) are one of the most underutilized features in CSS. They enable patterns that were previously impossible without preprocessors.

## Dynamic Theming

The most obvious use case: theming.

\`\`\`css
:root {
  --color-primary: #6366f1;
  --color-background: #ffffff;
}

.dark {
  --color-primary: #818cf8;
  --color-background: #111827;
}
\`\`\`

## Component Scoping

Variables can be scoped to components:

\`\`\`css
.card {
  --card-padding: 1rem;
  --card-radius: 0.5rem;
  
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

.card.compact {
  --card-padding: 0.5rem;
}
\`\`\`

## JavaScript Integration

Custom properties can be read and written from JavaScript:

\`\`\`js
// Read
const primary = getComputedStyle(root).getPropertyValue('--color-primary');

// Write
root.style.setProperty('--color-primary', '#ff0000');
\`\`\`

## Conclusion

If you're still hardcoding color values or using SCSS variables, switch to CSS custom properties. They're dynamic, interoperable, and supported everywhere.
    `,
  },
  {
    slug: "lessons-from-shipping-to-production",
    title: "Lessons from Shipping to Production",
    date: "Jan 2026",
    description: "Hard-won lessons from years of deploying software.",
    readingTime: 7,
    content: `
# Lessons from Shipping to Production

After years of shipping software to production, here are the lessons that stuck with me.

## Ship Small, Ship Often

Big releases are risky. Small, frequent releases reduce blast radius and make debugging easier. If something breaks, you know exactly what changed.

## Feature Flags Are Your Friend

Decouple deployment from release. Ship the code behind a flag, test it in production with a small percentage of users, then roll out gradually.

## Monitor Everything

You can't fix what you can't see. Set up:
- Error tracking (Sentry, Datadog)
- Performance monitoring (Core Web Vitals)
- Business metrics (conversion, retention)

## The Rollback Plan

Always have one. Before every deploy, ask: "If this breaks, can we revert within 5 minutes?" If the answer is no, your deployment process needs work.

## Culture Over Tools

The best deployment pipeline won't save a team that's afraid to ship. Build a culture where it's safe to make mistakes and fix them quickly.
    `,
  },
  {
    slug: "my-development-setup-2025",
    title: "My Development Setup 2025",
    date: "Dec 2025",
    description: "Tools, configs, and workflows that make me productive.",
    readingTime: 4,
    content: `
# My Development Setup 2025

A rundown of the tools and configs I use daily.

## Editor

VSCode with Vim keybindings. After trying Neovim for six months, I came back for the extension ecosystem. The best of both worlds.

Key extensions:
- GitHub Copilot
- GitLens
- Pretty TypeScript Errors
- Error Lens

## Terminal

iTerm2 + Zsh + Starship prompt. Fast, customizable, and looks great.

## Browser DevTools

Chrome for development, Firefox for privacy. I keep both open during development to catch browser-specific issues early.

## Design

Figma for wireframes, but I mostly design in the browser. Real constraints make better decisions.

## Note-taking

Obsidian with a simple Daily Notes setup. Plain text files that sync via iCloud.
    `,
  },
  {
    slug: "understanding-web-performance",
    title: "Understanding Web Performance",
    date: "Oct 2025",
    description: "A practical guide to Core Web Vitals and beyond.",
    readingTime: 9,
    content: `
# Understanding Web Performance

Performance is a feature. Users notice slow sites, even if they can't articulate why. Here's how to think about it.

## Core Web Vitals

Google's three key metrics:

**LCP (Largest Contentful Paint)** — How fast does the main content load? Target: under 2.5s.

**FID/INP (First Input Delay / Interaction to Next Paint)** — How responsive is the page? Target: under 200ms.

**CLS (Cumulative Layout Shift)** — Does content jump around? Target: under 0.1.

## Quick Wins

1. **Optimize images** — Use WebP, set explicit width/height, lazy load below-fold images
2. **Reduce JavaScript** — Remove unused code, split bundles, defer non-critical scripts
3. **Use a CDN** — Static assets should be served from edge locations close to users
4. **Enable caching** — Set proper Cache-Control headers

## Measuring

Don't guess — measure. Tools:
- Lighthouse (in Chrome DevTools)
- WebPageTest (real-world testing)
- CrUX (real user data from Chrome)

## The 80/20 Rule

80% of performance gains come from 20% of the work. Focus on the biggest bottlenecks first.
    `,
  },
];

export const projects: Project[] = [
  {
    id: "emanifest",
    name: "eManifest (Kemenhub)",
    description:
      "Sistem manifest digital terintegrasi untuk Kementerian Perhubungan RI",
    year: "2024 – Present",
    role: "Software Engineer",
    overview: [
      "eManifest digitises the passenger and cargo manifest process for Indonesian sea transport, replacing paper submissions with a single portal that operators, port officers, and the ministry all work from.",
      "The hard part is not the forms — it is that a manifest passes through several parties before it is final, and every one of them needs to see the same state without stepping on each other.",
    ],
    stack: ["TypeScript", "Next.js", "Laravel", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Manifest submission and verification flow shared by operators and port officers",
      "Role-based access across ministry, port, and operator accounts",
      "Reporting views that aggregate manifests by route, vessel, and period",
    ],
    images: [
      {
        src: "/projects/emanifest/dashboard.png",
        caption: "Dasbor pemantauan surat muatan barang, alur muat-bongkar, dan verifikasi QR Code",
      },
      {
        src: "/projects/emanifest/dashboard.png",
        caption: "Tampilan rute perjalanan dan konfirmasi status penerimaan logistik pelabuhan",
      },
    ],
  },
  {
    id: "ekompu",
    name: "eKompu (Kemen PUPR)",
    description:
      "Portal layanan biro komunikasi publik terintegrasi Kementerian PUPR",
    year: "2024",
    role: "Web Developer",
    overview: [
      "eKompu is the public communications bureau portal for the Ministry of Public Works and Housing — the place its press releases, media requests, and public information services are published and managed from.",
      "It carries a lot of editorial content, so most of the work went into making the publishing side quick to use and the public side quick to load.",
    ],
    stack: ["Laravel", "MySQL", "Tailwind CSS", "Alpine.js"],
    highlights: [
      "Editorial workflow for press releases and public information requests",
      "Media library shared across the bureau's publishing channels",
      "Public-facing pages tuned for fast first load on slow connections",
    ],
  },
  {
    id: "pkp-hub",
    name: "PKP HUB (Kemen PKP)",
    description: "Platform portal perumahan dan kawasan permukiman terpadu",
    year: "2024 – Present",
    role: "Software Engineer",
    overview: [
      "PKP HUB brings housing and settlement data for the Ministry of Housing and Settlement Areas into one portal, so programme data that used to live in separate spreadsheets and regional systems can be read in a single place.",
      "Most of the design effort was in the data model: the same programme is reported differently by different regions, and the portal has to reconcile that without losing the detail.",
    ],
    stack: ["TypeScript", "Next.js", "Laravel", "PostgreSQL"],
    highlights: [
      "Unified programme data across regional housing offices",
      "Dashboard views for programme progress by region and period",
      "Import pipeline that validates regional submissions before they land",
    ],
  },
  {
    id: "kanban-flow",
    name: "KanbanFlow",
    description: "Visual project management with real-time collaboration",
    url: "https://kanbanflow.app",
    github: "https://github.com/revanzahadiputra/kanbanflow",
    year: "2025",
    role: "Solo project",
    overview: [
      "A board-based project tracker built to see how far real-time collaboration can go before it needs a dedicated backend team.",
      "Cards move optimistically on the client and reconcile against the server, so a board still feels immediate when two people drag the same card at once.",
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "WebSocket"],
    highlights: [
      "Optimistic drag-and-drop that reconciles against server state",
      "Presence indicators showing who is looking at a board",
      "Keyboard-first card creation and navigation",
    ],
  },
  {
    id: "devnotes",
    name: "DevNotes",
    description: "Markdown note-taking app for developers",
    github: "https://github.com/revanzahadiputra/devnotes",
    year: "2025",
    role: "Solo project",
    overview: [
      "A local-first Markdown notebook for the notes that pile up while debugging — snippets, stack traces, and half-formed ideas.",
      "Notes are plain files on disk, so nothing is trapped in a database if the app goes away.",
    ],
    stack: ["TypeScript", "React", "Vite", "IndexedDB"],
    highlights: [
      "Local-first storage with plain Markdown files as the source of truth",
      "Full-text search across every note",
      "Syntax-highlighted code blocks with one-key copy",
    ],
  },
  {
    id: "openapi-ui",
    name: "OpenAPI UI",
    description: "Beautiful interactive API documentation generator",
    url: "https://openapiui.dev",
    year: "2024",
    role: "Solo project",
    overview: [
      "A documentation renderer that takes an OpenAPI schema and produces something worth reading, without the density that generated docs usually end up with.",
      "Every endpoint is explorable in place, so the docs double as a client for trying requests.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "OpenAPI"],
    highlights: [
      "Schema-driven pages generated straight from an OpenAPI document",
      "In-page request runner for trying endpoints against a live server",
      "Deep links to any endpoint, parameter, or schema",
    ],
  },
  {
    id: "color-palette",
    name: "PaletteCraft",
    description: "Generate harmonious color palettes for your design system",
    url: "https://palettecraft.io",
    github: "https://github.com/revanzahadiputra/palettecraft",
    year: "2024",
    role: "Solo project",
    overview: [
      "A palette generator that works in perceptual colour space, so a scale that looks evenly spaced actually is evenly spaced.",
      "Contrast is checked as you build rather than after, which tends to stop unusable colours from reaching a design system in the first place.",
    ],
    stack: ["TypeScript", "React", "OKLCH", "Canvas"],
    highlights: [
      "Perceptually even scales generated in OKLCH",
      "Live WCAG contrast checks against every surface in the palette",
      "Export to CSS custom properties, Tailwind config, or JSON",
    ],
  },
  {
    id: "gitpulse",
    name: "GitPulse",
    description: "GitHub activity dashboard and streak tracker",
    github: "https://github.com/revanzahadiputra/gitpulse",
    year: "2023",
    role: "Solo project",
    overview: [
      "A dashboard for reading your own GitHub activity — commit rhythm, language mix, and which repositories actually got attention.",
      "It caches aggressively, because the interesting views need far more API calls than GitHub's rate limit allows on demand.",
    ],
    stack: ["TypeScript", "Next.js", "GitHub API", "Redis"],
    highlights: [
      "Contribution heatmap and streak tracking across all repositories",
      "Language breakdown weighted by lines actually changed",
      "Cached aggregation layer that keeps within GitHub's rate limits",
    ],
  },
];

export const archivedProjects: Project[] = [
  {
    id: "old-blog",
    name: "PersonalBlog v1",
    description: "My first blog built with Gatsby and MDX",
    github: "https://github.com/revanzahadiputra/blog-v1",
    archived: true,
    year: "2022",
    role: "Solo project",
    overview: [
      "My first attempt at a personal site — Gatsby, MDX, and far more plugins than the job needed.",
      "It taught me most of what I know about build pipelines, mainly by breaking.",
    ],
    stack: ["Gatsby", "MDX", "GraphQL", "styled-components"],
    highlights: [
      "MDX posts with embedded interactive components",
      "Static generation with image processing at build time",
    ],
  },
  {
    id: "weather-app",
    name: "Cuaca",
    description: "Minimal weather app with location detection",
    github: "https://github.com/revanzahadiputra/cuaca",
    archived: true,
    year: "2022",
    role: "Solo project",
    overview: [
      "A small weather app in Bahasa Indonesia, built to practise consuming a third-party API and handling permissions properly.",
      "Retired once the free tier of the weather API it depended on disappeared.",
    ],
    stack: ["JavaScript", "React", "OpenWeather API"],
    highlights: [
      "Geolocation with a graceful fallback to manual city search",
      "Offline-tolerant rendering from the last successful response",
    ],
  },
];
