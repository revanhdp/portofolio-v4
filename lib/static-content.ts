import {
  works,
  stack,
  projects,
  archivedProjects,
  writings,
} from "./data";
import type {
  CProject,
  CStackCategory,
  CWork,
  CWriting,
  L,
} from "./types";

/* lib/data.ts reshaped into the stored form. Used as the seed source and
   as the fallback when MongoDB cannot be reached.                       */

const L = (en: string): L => ({ en, id: "" });

export const staticStack: CStackCategory[] = stack.map((c, order) => ({
  id: c.id,
  label: L(c.label),
  icon: c.icon,
  order,
  items: c.items.map((i) => ({ name: i.name, note: L(i.note) })),
}));

export const staticProjects: CProject[] = [
  ...projects,
  ...archivedProjects,
].map((p, order) => ({
  id: p.id,
  name: p.name,
  description: L(p.description),
  url: p.url,
  github: p.github,
  archived: p.archived ?? archivedProjects.includes(p),
  year: p.year,
  role: L(p.role),
  overview: p.overview.map(L),
  stack: p.stack,
  highlights: p.highlights.map(L),
  images: (p.images ?? []).map((i) => ({ src: i.src, caption: L(i.caption) })),
  order,
}));

export const staticWorks: CWork[] = works.map((w, order) => ({
  id: w.id,
  company: w.company,
  logo: w.logo,
  period: w.period,
  role: L(w.role),
  order,
  projects: w.projects.map((p) => ({
    icon: p.icon,
    name: p.name,
    description: L(p.description),
    slug: p.slug,
  })),
}));

export const staticWritings: CWriting[] = writings.map((w, order) => ({
  slug: w.slug,
  title: L(w.title),
  date: w.date,
  description: L(w.description),
  content: L(w.content),
  readingTime: w.readingTime,
  published: true,
  order,
}));
