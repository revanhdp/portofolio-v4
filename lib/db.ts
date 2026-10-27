import mongoose from "mongoose";

/* Next.js reloads modules in dev, so the connection is kept on globalThis
   to avoid opening a new pool on every reload. It is keyed by URI and
   database name, so changing .env.local switches connections cleanly.    */
const cache = globalThis as unknown as {
  mongooseCache?: { key: string; conn: Promise<typeof mongoose> };
};

export function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local.");
  }

  const key = `${uri}|${dbName ?? ""}`;
  if (cache.mongooseCache?.key === key) return cache.mongooseCache.conn;

  const previous = cache.mongooseCache;
  const conn: Promise<typeof mongoose> = (async () => {
    // Close the old connection first, or mongoose refuses a second URI
    if (previous) await mongoose.disconnect();
    return mongoose.connect(uri, {
      dbName,
      bufferCommands: false,
      serverSelectionTimeoutMS: 10_000,
    });
  })().catch((err) => {
    // Do not keep a rejected promise, or a later retry could never succeed
    if (cache.mongooseCache?.conn === conn) cache.mongooseCache = undefined;
    throw err;
  });
  cache.mongooseCache = { key, conn };
  return conn;
}
