import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/* File storage behind three functions. This is the local-disk version;
   swap the bodies for an S3/MinIO client to move uploads off the server. */

const DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
} as const;
export type FileExt = keyof typeof TYPES;

export const mimeFor = (ext: string): string | undefined =>
  TYPES[ext as FileExt];

/** Only names this module generates are ever read or deleted. */
export const SAFE_NAME = /^[a-f0-9]{24}\.(png|jpg|gif|webp|avif)$/;

/** Detects the real image type from the file's first bytes. SVG is refused on purpose. */
export function detectExt(b: Buffer): FileExt | null {
  if (b.length < 12) return null;
  if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return "png";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.toString("ascii", 0, 4) === "GIF8") return "gif";
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "webp";
  if (b.toString("ascii", 4, 8) === "ftyp" && /avif|avis/.test(b.toString("ascii", 8, 12))) return "avif";
  return null;
}

export async function putFile(name: string, data: Buffer): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await writeFile(path.join(DIR, name), data);
}

export async function getFile(name: string): Promise<Buffer | null> {
  if (!SAFE_NAME.test(name)) return null;
  try {
    return await readFile(path.join(DIR, name));
  } catch {
    return null;
  }
}

export async function deleteFile(name: string): Promise<void> {
  if (!SAFE_NAME.test(name)) return;
  await unlink(path.join(DIR, name)).catch(() => {});
}
