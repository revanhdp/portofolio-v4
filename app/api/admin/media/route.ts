import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Media } from "@/lib/models/Media";
import {
  MAX_UPLOAD_BYTES,
  deleteFile,
  detectExt,
  mimeFor,
  putFile,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

const toItem = (m: {
  _id: unknown;
  name: string;
  originalName: string;
  size: number;
  uploadedBy: string;
  createdAt?: Date;
}) => ({
  id: String(m._id),
  name: m.name,
  url: `/uploads/${m.name}`,
  originalName: m.originalName,
  size: m.size,
  uploadedBy: m.uploadedBy,
  createdAt: m.createdAt?.toISOString() ?? "",
});

const unauthorized = () =>
  NextResponse.json({ error: "Not signed in." }, { status: 401 });

export async function GET() {
  if (!(await getCurrentUser())) return unauthorized();
  await connectDB();
  const items = await Media.find().sort({ createdAt: -1 }).limit(500).lean();
  return NextResponse.json({ items: items.map(toItem) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File is larger than ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.` },
      { status: 413 },
    );
  }

  // Trust the file's bytes, never its name or declared type
  const data = Buffer.from(await file.arrayBuffer());
  const ext = detectExt(data);
  if (!ext) {
    return NextResponse.json(
      { error: "Only PNG, JPG, GIF, WebP and AVIF images are allowed." },
      { status: 415 },
    );
  }

  const name = `${randomBytes(12).toString("hex")}.${ext}`;
  await putFile(name, data);
  await connectDB();
  const doc = await Media.create({
    name,
    originalName: file.name.slice(0, 200),
    mime: mimeFor(ext)!,
    size: data.length,
    uploadedBy: user.username,
  });
  return NextResponse.json({ item: toItem(doc.toObject()) }, { status: 201 });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const id = new URL(request.url).searchParams.get("id");
  await connectDB();
  const media = id ? await Media.findById(id).catch(() => null) : null;
  if (!media) return NextResponse.json({ ok: true });

  if (user.role !== "superadmin" && media.uploadedBy !== user.username) {
    return NextResponse.json(
      { error: "You can only delete your own uploads." },
      { status: 403 },
    );
  }
  await deleteFile(media.name);
  await media.deleteOne();
  return NextResponse.json({ ok: true });
}
