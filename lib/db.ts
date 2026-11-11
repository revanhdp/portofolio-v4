import mongoose from "mongoose";

/* Fail fast, and remember a failed attempt for a short while. Without the
   cooldown every request waits out the full timeout again while the
   database is unreachable (for example an Atlas IP allowlist mismatch).  */
const SERVER_SELECTION_TIMEOUT_MS = 3_000;
const RETRY_AFTER_FAILURE_MS = 30_000;

/* Next.js reloads modules in dev, so the connection is kept on globalThis
   to avoid opening a new pool on every reload. It is keyed by URI and
   database name, so changing .env.local switches connections cleanly.    */
const cache = globalThis as unknown as {
  mongooseCache?: { key: string; conn: Promise<typeof mongoose> };
  mongooseFailure?: { key: string; at: number; error: unknown };
};

export function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local.");
  }

  const key = `${uri}|${dbName ?? ""}`;
  if (cache.mongooseCache?.key === key) return cache.mongooseCache.conn;

  const failure = cache.mongooseFailure;
  if (failure?.key === key && Date.now() - failure.at < RETRY_AFTER_FAILURE_MS) {
    return Promise.reject(failure.error);
  }

  const previous = cache.mongooseCache;
  const conn: Promise<typeof mongoose> = (async () => {
    // Close the old connection first, or mongoose refuses a second URI
    if (previous) await mongoose.disconnect();
    const connected = await mongoose.connect(uri, {
      dbName,
      bufferCommands: false,
      serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
    });
    cache.mongooseFailure = undefined;
    return connected;
  })().catch((err) => {
    // Do not keep a rejected promise, or a later retry could never succeed
    if (cache.mongooseCache?.conn === conn) cache.mongooseCache = undefined;
    cache.mongooseFailure = { key, at: Date.now(), error: err };
    throw err;
  });
  cache.mongooseCache = { key, conn };
  return conn;
}
