import type {
  Project,
  StackCategory,
  Writing,
  WorkExperience,
} from "./data";
import type {
  CProject,
  CStackCategory,
  CWork,
  CWriting,
  L,
} from "./types";
import type { Language } from "./i18n";

/* Flattens stored two-language content into the single-language shapes
   the views already use. Falls back to English when a translation is
   empty, so a half-translated entry never renders blank.              */

export const pick = (text: L | undefined, lang: Language): string =>
  (lang === "id" && text?.id ? text.id : text?.en) ?? "";

export const localizeStack = (
  cats: CStackCategory[],
  lang: Language,
): StackCategory[] =>
  cats.map((c) => ({
    id: c.id,
    label: pick(c.label, lang),
    icon: c.icon,
    items: c.items.map((i) => ({ name: i.name, note: pick(i.note, lang) })),
  }));

export const localizeProject = (p: CProject, lang: Language): Project => ({
  id: p.id,
  name: p.name,
  description: pick(p.description, lang),
  url: p.url,
  github: p.github,
  archived: p.archived,
  year: p.year,
  role: pick(p.role, lang),
  overview: p.overview.map((o) => pick(o, lang)),
  stack: p.stack,
  highlights: p.highlights.map((h) => pick(h, lang)),
  images: p.images.map((i) => ({ src: i.src, caption: pick(i.caption, lang) })),
});

export const localizeWork = (w: CWork, lang: Language): WorkExperience => ({
  id: w.id,
  company: w.company,
  logo: w.logo,
  period: w.period,
  role: pick(w.role, lang),
  projects: w.projects.map((p) => ({
    icon: p.icon,
    name: p.name,
    description: pick(p.description, lang),
    slug: p.slug,
  })),
});

export const localizeWriting = (w: CWriting, lang: Language): Writing => ({
  slug: w.slug,
  title: pick(w.title, lang),
  date: w.date,
  description: pick(w.description, lang),
  content: pick(w.content, lang),
  readingTime: w.readingTime,
});
