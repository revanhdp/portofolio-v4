import type { StackCategory, WorkIcon } from "./data";

/* Content as stored in MongoDB and sent to client components. Every
   user-facing string carries both languages; lib/localize.ts flattens
   them to the legacy shapes in lib/data.ts for a chosen language.     */

export type L = { en: string; id?: string };

export type CStackCategory = {
  id: string;
  label: L;
  icon: StackCategory["icon"];
  order: number;
  items: { name: string; note: L }[];
};

export type CProject = {
  id: string;
  name: string;
  description: L;
  url?: string;
  github?: string;
  archived: boolean;
  year: string;
  role: L;
  overview: L[];
  stack: string[];
  highlights: L[];
  images: { src: string; caption: L }[];
  order: number;
};

export type CWork = {
  id: string;
  company: string;
  logo?: string;
  period: string;
  role: L;
  order: number;
  projects: {
    icon: WorkIcon;
    name: string;
    description: L;
    slug?: string;
  }[];
};

export type CWriting = {
  slug: string;
  title: L;
  date: string;
  description: L;
  content: L;
  readingTime: number;
  published: boolean;
  order: number;
};
