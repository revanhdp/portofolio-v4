"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ImageIcon, X } from "lucide-react";
import { Field, btn } from "./fields";
import MediaBrowser from "./MediaBrowser";

/* A path field plus a "Browse" button that opens the media library.
   The path can still be typed by hand, e.g. for files in /public. */
export default function ImagePicker({
  label,
  value,
  onChange,
  hint,
  currentUser,
  isSuperadmin,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const [open, setOpen] = useState(false);

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
      <Field label={label} hint={hint ?? "Pick from Media, or type a path to a file in /public."}>
        <span style={{ display: "flex", gap: 8 }}>
          <span className="admin-thumb">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" />
            ) : null}
          </span>
          <input
            className="admin-input"
            value={value}
            placeholder="/uploads/…"
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="button" className={btn.secondary} onClick={() => setOpen(true)}>
            <ImageIcon size={14} />
            Browse
          </button>
        </span>
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
