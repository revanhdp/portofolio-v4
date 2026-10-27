"use client";

import { useState } from "react";
import EditorShell from "./EditorShell";
import { Field, Section, Select, Switch, Text } from "./fields";
import { createUser, deleteUser, updateUser } from "@/lib/admin-actions";
import { ROLES, ROLE_HINT, ROLE_LABEL, type Role } from "@/lib/roles";

export type UserRow = {
  id: string;
  username: string;
  name: string;
  role: Role;
  active: boolean;
};

const ROLE_OPTIONS = ROLES.map((r) => ({ value: r, label: ROLE_LABEL[r] }));

export default function UserForm({
  initial,
  isSelf,
}: {
  initial?: UserRow;
  isSelf: boolean;
}) {
  const base = {
    username: initial?.username ?? "",
    name: initial?.name ?? "",
    role: initial?.role ?? ("editor" as Role),
    active: initial?.active ?? true,
    password: "",
  };
  const [doc, setDoc] = useState(base);
  const set = <K extends keyof typeof doc>(k: K, v: (typeof doc)[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  return (
    <EditorShell
      backHref="/admin/users"
      isNew={!initial}
      dirty={JSON.stringify(doc) !== JSON.stringify(base)}
      onSave={() => (initial ? updateUser(initial.id, doc) : createUser(doc))}
      onDelete={initial && !isSelf ? () => deleteUser(initial.id) : undefined}
    >
      <Section title="Profile">
        <div className="admin-grid admin-grid--2">
          <Text label="Name" value={doc.name} onChange={(v) => set("name", v)} />
          <Text
            label="Username"
            value={doc.username}
            disabled={!!initial}
            onChange={(v) => set("username", v)}
            hint={initial ? "Usernames cannot be changed." : "a–z, 0–9, dot, dash and underscore"}
          />
        </div>
      </Section>

      <Section title="Access">
        <Select
          label="Role"
          value={doc.role}
          options={ROLE_OPTIONS}
          onChange={(v) => set("role", v)}
          disabled={isSelf}
          hint={isSelf ? "You cannot change your own role." : ROLE_HINT[doc.role]}
        />
        {!isSelf && (
          <Switch
            label="Active"
            hint="Inactive users cannot sign in."
            checked={doc.active}
            onChange={(v) => set("active", v)}
          />
        )}
      </Section>

      <Section
        title="Password"
        description={
          initial
            ? "Leave empty to keep the current password. Setting a new one signs the user out everywhere."
            : undefined
        }
      >
        <Field label={initial ? "New password" : "Password"} hint="At least 8 characters.">
          <input
            className="admin-input"
            type="password"
            autoComplete="new-password"
            value={doc.password}
            onChange={(e) => set("password", e.target.value)}
          />
        </Field>
      </Section>
    </EditorShell>
  );
}
