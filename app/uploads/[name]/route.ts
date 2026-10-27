import { getFile, mimeFor } from "@/lib/storage";

export const dynamic = "force-dynamic";

/* Serves uploaded files. Names are random and only ones matching the
   generated pattern are ever read, so there is no path traversal. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const data = await getFile(name);
  const type = mimeFor(name.split(".").pop() ?? "");
  if (!data || !type) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": type,
      "Content-Length": String(data.length),
      // File names are random and never reused, so they can be cached for good
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
