"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Trash2 } from "lucide-react";
import { Spinner, btn } from "./fields";
import type { ActionResult } from "@/lib/admin-actions";

/* Form frame shared by every editor: the fields, an error line, and a
   floating save bar. `onSave` and `onDelete` are server actions already
   bound to the current document. */
export default function EditorShell({
  backHref,
  isNew,
  dirty,
  onSave,
  onDelete,
  children,
}: {
  backHref: string;
  isNew: boolean;
  /** True when the form differs from what is stored. */
  dirty: boolean;
  onSave: () => Promise<ActionResult>;
  onDelete?: () => Promise<ActionResult>;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [confirming, setConfirming] = useState(false);
  const confirmTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const leaving = useRef(false);

  // Warn before closing the tab with unsaved edits
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!leaving.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  useEffect(() => () => clearTimeout(confirmTimer.current), []);

  const run = (action: () => Promise<ActionResult>) => {
    setError(undefined);
    startTransition(async () => {
      const res = await action();
      if (res.ok) {
        leaving.current = true;
        router.push(backHref);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  const requestDelete = () => {
    if (!onDelete) return;
    if (confirming) {
      clearTimeout(confirmTimer.current);
      setConfirming(false);
      run(onDelete);
      return;
    }
    setConfirming(true);
    confirmTimer.current = setTimeout(() => setConfirming(false), 4000);
  };

  const status = pending
    ? "Saving…"
    : dirty
      ? "Unsaved changes"
      : isNew
        ? "New entry"
        : "No changes";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(onSave);
      }}
    >
      <div className="admin-sections">{children}</div>

      {error && (
        <p role="alert" className="admin-alert admin-alert--error" style={{ marginBottom: 8 }}>
          <AlertCircle size={14} />
          {error}
        </p>
      )}

      <div className="admin-savebar">
        <span className="admin-savebar-status" aria-live="polite">
          <span className={`admin-dot ${dirty ? "admin-dot--dirty" : ""}`} />
          <span>{status}</span>
        </span>

        {!isNew && onDelete && (
          <button
            type="button"
            disabled={pending}
            data-confirm={confirming}
            className={btn.danger}
            onClick={requestDelete}
          >
            <Trash2 size={14} />
            {confirming ? "Click again to delete" : "Delete"}
          </button>
        )}
        <button
          type="button"
          className={btn.ghost}
          onClick={() => router.push(backHref)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending || (!dirty && !isNew)}
          className={btn.primary}
        >
          {pending && <Spinner />}
          {isNew ? "Create" : "Save"}
        </button>
      </div>
    </form>
  );
}
