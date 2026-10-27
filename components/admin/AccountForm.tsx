"use client";

import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Field, Spinner, btn } from "./fields";
import { changeOwnPassword } from "@/lib/admin-actions";

export default function AccountForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string }>();
  const [pending, start] = useTransition();

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}
      onSubmit={(e) => {
        e.preventDefault();
        if (next !== confirm) {
          setMessage({ ok: false, text: "The new passwords do not match." });
          return;
        }
        start(async () => {
          const res = await changeOwnPassword(current, next);
          if (res.ok) {
            setCurrent("");
            setNext("");
            setConfirm("");
            setMessage({ ok: true, text: "Password changed. Other devices were signed out." });
          } else {
            setMessage({ ok: false, text: res.error });
          }
        });
      }}
    >
      <Field label="Current password">
        <input className="admin-input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
      </Field>
      <Field label="New password" hint="At least 8 characters.">
        <input className="admin-input" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} required />
      </Field>
      <Field label="Repeat new password">
        <input className="admin-input" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </Field>

      {message && (
        <p role="alert" className={`admin-alert ${message.ok ? "admin-alert--success" : "admin-alert--error"}`}>
          {message.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {message.text}
        </p>
      )}

      <button type="submit" disabled={pending} className={btn.primary} style={{ alignSelf: "flex-start" }}>
        {pending && <Spinner />}
        Change password
      </button>
    </form>
  );
}
