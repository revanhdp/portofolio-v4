"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/lib/admin-actions";
import { Field, Spinner, btn } from "@/components/admin/fields";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  const [show, setShow] = useState(false);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Field label="Username">
        <input
          className="admin-input"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
          required
        />
      </Field>
      <Field label="Password">
        <span className="admin-password">
          <input
            className="admin-input"
            type={show ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            title={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </span>
      </Field>

      {state?.error && (
        <p role="alert" className="admin-alert admin-alert--error">
          <AlertCircle size={14} />
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`${btn.primary} admin-btn--block`}
        style={{ marginTop: 4 }}
      >
        {pending && <Spinner />}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
