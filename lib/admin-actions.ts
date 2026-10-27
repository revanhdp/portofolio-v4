"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Model } from "mongoose";
import {
  SESSION_COOKIE,
  createToken,
  requireSuperadmin,
  requireUser,
  sessionCookieOptions,
} from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { ROLES, type Role } from "@/lib/roles";
import { Project } from "@/lib/models/Project";
import { StackCategory } from "@/lib/models/StackCategory";
import { User } from "@/lib/models/User";
import { Work } from "@/lib/models/Work";
import { Writing } from "@/lib/models/Writing";
import type { CProject, CStackCategory, CWork, CWriting } from "@/lib/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong.";

/* ── Login ──────────────────────────────────────────────────────── */

// Best-effort brute-force guard, kept in memory (per server process)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

// Verified against when the username does not exist, so timing does not reveal it
let dummyHash: Promise<string> | undefined;

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  let user;
  try {
    await connectDB();
    user = await User.findOne({ username });
  } catch {
    return { error: "Cannot reach the database. Try again." };
  }

  dummyHash ??= hashPassword("not-a-real-password");
  const valid = user
    ? await verifyPassword(password, user.passwordHash)
    : (await verifyPassword(password, await dummyHash), false);

  if (!user || !valid || !user.active) {
    attempts.set(ip, {
      count: entry && entry.resetAt > now ? entry.count + 1 : 1,
      resetAt: entry && entry.resetAt > now ? entry.resetAt : now + WINDOW_MS,
    });
    return { error: "Wrong username or password." };
  }

  attempts.delete(ip);
  user.lastLoginAt = new Date();
  await user.save();
  (await cookies()).set(
    SESSION_COOKIE,
    createToken(String(user._id), user.sessionVersion),
    sessionCookieOptions,
  );
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ── Content ────────────────────────────────────────────────────── */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Creates a document, or updates the one stored under `original`. */
async function save<T extends { slug: string }>(
  model: Model<T>,
  original: string | undefined,
  doc: T,
): Promise<ActionResult> {
  await requireUser();
  try {
    if (!SLUG.test(doc.slug)) {
      return {
        ok: false,
        error: "Slug must be lowercase letters, numbers and dashes only.",
      };
    }
    await connectDB();
    await new model(doc).validate();

    const exists = (slug: string) => model.exists({ slug } as never);
    if (!original) {
      if (await exists(doc.slug)) {
        return { ok: false, error: `Slug "${doc.slug}" is already used.` };
      }
      await model.create(doc);
    } else {
      if (original !== doc.slug && (await exists(doc.slug))) {
        return { ok: false, error: `Slug "${doc.slug}" is already used.` };
      }
      const res = await model.updateOne(
        { slug: original } as never,
        { $set: doc } as never,
        { runValidators: true },
      );
      if (res.matchedCount === 0) {
        return { ok: false, error: "This entry no longer exists." };
      }
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

async function remove<T>(model: Model<T>, slug: string): Promise<ActionResult> {
  await requireUser();
  try {
    await connectDB();
    await model.deleteOne({ slug } as never);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

// The views use `id`; the database key is `slug`.
const withSlug = <T extends { id: string }>({ id, ...rest }: T) => ({
  slug: id,
  ...rest,
});

export const saveStack = async (original: string | undefined, d: CStackCategory) =>
  save(StackCategory, original, withSlug(d) as never);
export const saveProject = async (original: string | undefined, d: CProject) =>
  save(Project, original, withSlug(d) as never);
export const saveWork = async (original: string | undefined, d: CWork) =>
  save(Work, original, withSlug(d) as never);
export const saveWriting = async (original: string | undefined, d: CWriting) =>
  save(Writing, original, d as never);

export const deleteStack = async (slug: string) => remove(StackCategory, slug);
export const deleteProject = async (slug: string) => remove(Project, slug);
export const deleteWork = async (slug: string) => remove(Work, slug);
export const deleteWriting = async (slug: string) => remove(Writing, slug);

/* ── Users (superadmin only) ────────────────────────────────────── */

const USERNAME = /^[a-z0-9._-]{3,32}$/;
const MIN_PASSWORD = 8;

export type UserInput = {
  username: string;
  name: string;
  role: Role;
  active: boolean;
  /** Required for a new user; on edit, leave empty to keep the current one. */
  password?: string;
};

const otherActiveSuperadmins = (excludeId: string) =>
  User.countDocuments({
    _id: { $ne: excludeId },
    role: "superadmin",
    active: true,
  });

export async function createUser(input: UserInput): Promise<ActionResult> {
  await requireSuperadmin();
  try {
    const username = input.username.trim().toLowerCase();
    if (!USERNAME.test(username)) {
      return { ok: false, error: "Username: 3–32 characters, a-z 0-9 . _ - only." };
    }
    if (!input.name.trim()) return { ok: false, error: "Name is required." };
    if (!ROLES.includes(input.role)) return { ok: false, error: "Unknown role." };
    if ((input.password ?? "").length < MIN_PASSWORD) {
      return { ok: false, error: `Password needs at least ${MIN_PASSWORD} characters.` };
    }
    await connectDB();
    if (await User.exists({ username })) {
      return { ok: false, error: `Username "${username}" is already taken.` };
    }
    await User.create({
      username,
      name: input.name.trim(),
      role: input.role,
      active: input.active,
      passwordHash: await hashPassword(input.password!),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

export async function updateUser(
  id: string,
  input: UserInput,
): Promise<ActionResult> {
  const me = await requireSuperadmin();
  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user) return { ok: false, error: "This user no longer exists." };
    if (!input.name.trim()) return { ok: false, error: "Name is required." };
    if (!ROLES.includes(input.role)) return { ok: false, error: "Unknown role." };

    const losesAccess = input.role !== "superadmin" || !input.active;
    if (user.role === "superadmin" && losesAccess) {
      if (String(user._id) === me.id) {
        return { ok: false, error: "You cannot demote or deactivate your own account." };
      }
      if ((await otherActiveSuperadmins(id)) === 0) {
        return { ok: false, error: "There must be at least one active superadmin." };
      }
    }

    let endSessions = input.role !== user.role || (user.active && !input.active);
    if (input.password) {
      if (input.password.length < MIN_PASSWORD) {
        return { ok: false, error: `Password needs at least ${MIN_PASSWORD} characters.` };
      }
      user.passwordHash = await hashPassword(input.password);
      endSessions = true;
    }
    user.name = input.name.trim();
    user.role = input.role;
    user.active = input.active;
    if (endSessions) user.sessionVersion += 1;
    await user.save();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

export async function deleteUser(id: string): Promise<ActionResult> {
  const me = await requireSuperadmin();
  try {
    if (id === me.id) {
      return { ok: false, error: "You cannot delete your own account." };
    }
    await connectDB();
    const user = await User.findById(id);
    if (!user) return { ok: true };
    if (user.role === "superadmin" && user.active && (await otherActiveSuperadmins(id)) === 0) {
      return { ok: false, error: "There must be at least one active superadmin." };
    }
    await user.deleteOne();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Any signed-in user can change their own password. */
export async function changeOwnPassword(
  current: string,
  next: string,
): Promise<ActionResult> {
  const me = await requireUser();
  try {
    if (next.length < MIN_PASSWORD) {
      return { ok: false, error: `Password needs at least ${MIN_PASSWORD} characters.` };
    }
    await connectDB();
    const user = await User.findById(me.id);
    if (!user || !(await verifyPassword(current, user.passwordHash))) {
      return { ok: false, error: "Current password is wrong." };
    }
    user.passwordHash = await hashPassword(next);
    user.sessionVersion += 1;
    await user.save();
    // Keep this browser signed in; every other session is now invalid
    (await cookies()).set(
      SESSION_COOKIE,
      createToken(String(user._id), user.sessionVersion),
      sessionCookieOptions,
    );
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
