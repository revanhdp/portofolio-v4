"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Copy, ImageIcon, Trash2, Upload } from "lucide-react";
import { Spinner } from "./fields";
import { IMAGE_ACCEPT, uploadImage, type UploadedImage } from "./upload";

export type MediaItem = UploadedImage;

const formatSize = (n: number) =>
  n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

/* Upload, browse and delete images. With `onSelect` it works as a picker
   (clicking a tile chooses it); without, it is the full library. */
export default function MediaBrowser({
  onSelect,
  currentUser,
  isSuperadmin,
}: {
  onSelect?: (url: string) => void;
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const [items, setItems] = useState<MediaItem[]>();
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>();
  const [copied, setCopied] = useState<string>();
  const [confirmDelete, setConfirmDelete] = useState<string>();
  const input = useRef<HTMLInputElement>(null);

  const reload = async () => {
    const res = await fetch("/api/admin/media");
    if (res.ok) setItems((await res.json()).items);
    else setError("Could not load media.");
  };

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/media")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => !cancelled && setItems(data.items))
      .catch(() => !cancelled && setError("Could not load media."));
    return () => {
      cancelled = true;
    };
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length || busy) return;
    setBusy(true);
    setError(undefined);
    const uploaded: UploadedImage[] = [];
    for (const file of Array.from(files)) {
      try {
        uploaded.push(await uploadImage(file));
      } catch (err) {
        setError(`${file.name}: ${err instanceof Error ? err.message : "Upload failed."}`);
        break;
      }
    }
    await reload();
    setBusy(false);
    if (input.current) input.current.value = "";
    // As a picker, a single fresh upload is chosen right away
    if (onSelect && uploaded.length === 1 && files.length === 1) onSelect(uploaded[0].url);
  };

  const remove = async (item: MediaItem) => {
    // First click arms the button, the second one deletes
    if (confirmDelete !== item.id) {
      setConfirmDelete(item.id);
      return;
    }
    setConfirmDelete(undefined);
    const res = await fetch(`/api/admin/media?id=${item.id}`, { method: "DELETE" });
    if (!res.ok) setError((await res.json().catch(() => null))?.error ?? "Delete failed.");
    await reload();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input
        ref={input}
        type="file"
        multiple
        accept={IMAGE_ACCEPT}
        hidden
        onChange={(e) => upload(e.target.files)}
      />
      <button
        type="button"
        className="admin-drop"
        data-active={dragging}
        disabled={busy}
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void upload(e.dataTransfer.files);
        }}
      >
        <span className="admin-tile">{busy ? <Spinner /> : <Upload size={14} strokeWidth={1.75} />}</span>
        <span>
          {busy ? (
            "Uploading…"
          ) : (
            <>
              <strong>Click to upload</strong> or drop images here
            </>
          )}
        </span>
        <span style={{ fontSize: 12 }}>PNG, JPG, GIF, WebP or AVIF · up to 8 MB each</span>
      </button>

      {error && (
        <p role="alert" className="admin-alert admin-alert--error">
          <AlertCircle size={14} />
          {error}
        </p>
      )}

      {!items ? (
        <p className="admin-hint" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Spinner /> Loading images…
        </p>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-tile">
            <ImageIcon size={14} strokeWidth={1.75} />
          </span>
          No images yet.
        </div>
      ) : (
        <ul className="admin-media-grid">
          {items.map((item) => {
            const canDelete = isSuperadmin || item.uploadedBy === currentUser;
            const armed = confirmDelete === item.id;
            return (
              <li key={item.id} className="admin-media" data-selectable={!!onSelect}>
                {onSelect ? (
                  <button
                    type="button"
                    className="admin-media-thumb"
                    onClick={() => onSelect(item.url)}
                    title="Use this image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.originalName} loading="lazy" />
                  </button>
                ) : (
                  <div className="admin-media-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.originalName} loading="lazy" />
                  </div>
                )}

                <div className="admin-media-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="Copy path"
                    aria-label="Copy path"
                    onClick={() => {
                      void navigator.clipboard?.writeText(item.url);
                      setCopied(item.id);
                      setTimeout(() => setCopied(undefined), 1200);
                    }}
                  >
                    {copied === item.id ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                  {canDelete && (
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn--danger"
                      title={armed ? "Click again to delete" : "Delete"}
                      aria-label={armed ? "Click again to delete" : "Delete"}
                      style={armed ? { color: "var(--a-danger)" } : undefined}
                      onClick={() => remove(item)}
                      onMouseLeave={() => armed && setConfirmDelete(undefined)}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="admin-media-meta">
                  <div className="admin-media-name" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="admin-media-sub">
                    {armed ? (
                      <span style={{ color: "var(--a-danger)" }}>Click the bin again to delete</span>
                    ) : (
                      <>
                        {formatSize(item.size)} · @{item.uploadedBy}
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
