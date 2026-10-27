/* Copies the static content in lib/data.ts into MongoDB.
   Run with: npm run seed        (add --reset to wipe the collections first)
   English text is filled in; the Indonesian side is left empty for the
   admin to translate, and falls back to English until then.
   Existing documents are left alone, so re-running never overwrites edits. */

import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import { Project } from "../lib/models/Project";
import { StackCategory } from "../lib/models/StackCategory";
import { Work } from "../lib/models/Work";
import { Writing } from "../lib/models/Writing";
import {
  staticProjects,
  staticStack,
  staticWorks,
  staticWritings,
} from "../lib/static-content";

type Keyed = { slug: string };

async function insertMissing<T extends Keyed>(
  model: mongoose.Model<T>,
  docs: T[],
): Promise<number> {
  await Promise.all(
    docs.map((doc) =>
      model.updateOne(
        { slug: doc.slug } as never,
        { $setOnInsert: doc },
        { upsert: true },
      ),
    ),
  );
  return docs.length;
}

async function main() {
  await connectDB();

  if (process.argv.includes("--reset")) {
    await Promise.all([
      Project.deleteMany({}),
      StackCategory.deleteMany({}),
      Work.deleteMany({}),
      Writing.deleteMany({}),
    ]);
    console.log("Collections cleared.");
  }

  const counts = {
    stack: await insertMissing(
      StackCategory,
      staticStack.map(({ id, ...rest }) => ({ slug: id, ...rest })),
    ),
    projects: await insertMissing(
      Project,
      staticProjects.map(({ id, ...rest }) => ({ slug: id, ...rest })),
    ),
    work: await insertMissing(
      Work,
      staticWorks.map(({ id, ...rest }) => ({ slug: id, ...rest })),
    ),
    writings: await insertMissing(Writing, staticWritings),
  };

  console.log("Seeded:", counts);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
