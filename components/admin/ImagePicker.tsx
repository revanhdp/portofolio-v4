"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { Field, Spinner, btn } from "./fields";
import MediaBrowser from "./MediaBrowser";
import { IMAGE_ACCEPT, uploadImage } from "./upload";

/* A path field plus a "Browse" button that opens the media library.
   The path can still be typed by hand, e.g. for files in /public. */
export default function ImagePicker({
  label,
  value,
  onChange,
  hint,
  fallback,
  currentUser,
  isSuperadmin,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  /** Preview shown while the field is empty, e.g. the built-in logo that applies. */
  fallback?: string;
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const file = useRef<HTMLInputElement>(null);

  // Uploads the file and fills in its stored path — nothing to type or copy
  const upload = async (picked: File | undefined) => {
    if (!picked) return;
    setUploading(true);
    setError(undefined);
    try {
      onChange((await uploadImage(picked)).url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (file.current) file.current.value = "";
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <Field label={label} hint={hint ?? "Upload a file and the path fills in by itself, or pick one from Media."}>
        <span style={{ display: "flex", gap: 8 }}>
          <span className="admin-thumb" style={!value && fallback ? { opacity: 0.55 } : undefined}>
            {value || fallback ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value || fallback} alt="" style={{ objectFit: "contain", padding: value ? 0 : 4 }} />
            ) : null}
          </span>
          <span style={{ position: "relative", flex: 1, minWidth: 0 }}>
            <input
              className="admin-input"
              value={value}
              style={value ? { paddingRight: 36 } : undefined}
              placeholder="/uploads/…"
              onChange={(e) => onChange(e.target.value)}
            />
            {value && (
              <button
                type="button"
                className="admin-icon-btn"
                style={{ position: "absolute", right: 4, top: 4 }}
                title="Clear"
                aria-label="Clear"
                onClick={() => onChange("")}
              >
                <X size={13} />
              </button>
            )}
          </span>
          <input
            ref={file}
            type="file"
            accept={IMAGE_ACCEPT}
            hidden
            onChange={(e) => upload(e.target.files?.[0])}
          />
          <button type="button" className={btn.secondary} disabled={uploading} onClick={() => file.current?.click()}>
            {uploading ? <Spinner /> : <Upload size={14} />}
            Upload
          </button>
          <button type="button" className={btn.secondary} onClick={() => setOpen(true)}>
            <ImageIcon size={14} />
            Media
          </button>
        </span>
        {error && (
          <span role="alert" className="admin-hint" style={{ color: "var(--a-danger)" }}>
            {error}
          </span>
        )}
      </Field>

      {/* Portalled to <body> so the dialog is not inside the field's <label>
          and is not clipped by any parent; .admin keeps the design tokens. */}
      {open &&
        createPortal(
          <div className="admin" style={{ minHeight: 0 }}>
            <div className="admin-backdrop" data-lenis-prevent onClick={() => setOpen(false)}>
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Choose an image"
                className="admin-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="admin-modal-head">
                  Choose an image
                  <button
                    type="button"
                    className="admin-icon-btn"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="admin-modal-body">
                  <MediaBrowser
                    currentUser={currentUser}
                    isSuperadmin={isSuperadmin}
                    onSelect={(url) => {
                      onChange(url);
                      setOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
