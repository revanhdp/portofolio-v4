/* Icon keys a work row can use. Kept apart from lib/models/Work.ts so
   client components can import it without pulling in Mongoose.        */
export const WORK_ICONS = [
  "ship",
  "megaphone",
  "building",
  "code",
  "graduation",
  "layout",
  "globe",
] as const;
