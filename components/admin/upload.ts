export type UploadedImage = {
  id: string;
  name: string;
  url: string;
  originalName: string;
  size: number;
  uploadedBy: string;
};

export const IMAGE_ACCEPT = "image/png,image/jpeg,image/gif,image/webp,image/avif";

/** Uploads one image to the media library. Resolves with its stored URL; throws a readable message on failure. */
export async function uploadImage(file: File): Promise<UploadedImage> {
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Upload failed.");
  return data.item as UploadedImage;
}
