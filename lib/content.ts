import { connectDB } from "./db";
import { Project } from "./models/Project";
import { StackCategory } from "./models/StackCategory";
import { Work } from "./models/Work";
import { Writing } from "./models/Writing";
import {
  staticProjects,
  staticStack,
  staticWorks,
  staticWritings,
} from "./static-content";
import type { CProject, CStackCategory, CWork, CWriting } from "./types";

/* Server-side reads for the public pages and the admin. If MongoDB is
   unreachable the static content in lib/data.ts is served instead, so a
   database outage never takes the site down.                           */

const BY_ORDER = { order: 1, createdAt: 1 } as const;

/** Strips Mongo bookkeeping and makes the doc safe to pass to client components. */
function plain<T>(doc: unknown, idFrom?: "slug"): T {
  const rest = JSON.parse(JSON.stringify(doc));
  for (const key of ["_id", "__v", "createdAt", "updatedAt"]) delete rest[key];
  if (idFrom) {
    const { slug, ...others } = rest;
    return { id: slug, ...others } as T;
  }
  return rest as T;
}

async function read<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await connectDB();
    return await query();
  } catch (err) {
    console.error(
      "[content] MongoDB unavailable, serving static data:",
      err instanceof Error ? err.message : err,
    );
    return fallback;
  }
}

export const getStack = () =>
  read(
    async () =>
      (await StackCategory.find().sort(BY_ORDER).lean()).map((d) =>
        plain<CStackCategory>(d, "slug"),
      ),
    staticStack,
  );

export const getProjects = () =>
  read(
    async () =>
      (await Project.find().sort(BY_ORDER).lean()).map((d) =>
        plain<CProject>(d, "slug"),
      ),
    staticProjects,
  );

export const getProject = async (id: string) =>
  (await getProjects()).find((p) => p.id === id) ?? null;

export const getWorks = () =>
  read(
    async () =>
      (await Work.find().sort(BY_ORDER).lean()).map((d) =>
        plain<CWork>(d, "slug"),
      ),
    staticWorks,
  );

export const getWritings = () =>
  read(
    async () =>
      (await Writing.find().sort(BY_ORDER).lean()).map((d) =>
        plain<CWriting>(d),
      ),
    staticWritings,
  );
