import { createHmac, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import type { Role } from "@/lib/roles";

/* Session = a signed, expiring, httpOnly cookie holding the user id and
   that user's sessionVersion. Role and active state are always read from
   the database, so demoting or disabling someone takes effect at once.   */

export const SESSION_COOKIE = "porto_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

export type SessionUser = {
  id: string;
  username: string;
  name: string;
  role: Role;
};

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set. Add it to .env.local.");
  return value;
}

const sign = (payload: string) =>
  createHmac("sha256", secret()).update(payload).digest("base64url");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function createToken(userId: string, version: number): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${userId}.${version}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Checks signature and expiry only — no database. Used by the proxy. */
export function parseToken(
  token: string | undefined,
): { userId: string; version: number } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [userId, version, exp, signature] = parts;
  if (!safeEqual(signature, sign(`${userId}.${version}.${exp}`))) return null;
  if (Number(exp) <= Date.now() / 1000) return null;
  return { userId, version: Number(version) };
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

/** The signed-in user, or null. Cached for the duration of one request. */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const session = parseToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return null;
  try {
    await connectDB();
    const user = await User.findById(session.userId).lean();
    if (!user || !user.active || user.sessionVersion !== session.version) {
      return null;
    }
    return {
      id: String(user._id),
      username: user.username,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
});

/** Call at the top of every admin page and server action. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireSuperadmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "superadmin") redirect("/admin");
  return user;
}
