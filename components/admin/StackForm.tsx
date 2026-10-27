"use client";

import { useState } from "react";
import EditorShell from "./EditorShell";
import { ListEditor, Localized, Section, Select, Text } from "./fields";
import { TECH_ICONS } from "@/components/techIconsRegistry";
import { deleteStack, saveStack } from "@/lib/admin-actions";
import type { CStackCategory } from "@/lib/types";

const blank: CStackCategory = {
  id: "",
  label: { en: "", id: "" },
  icon: "frontend",
  order: 0,
  items: [],
};

const ICONS: { value: CStackCategory["icon"]; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "tooling", label: "Tooling" },
];

export default function StackForm({ initial }: { initial?: CStackCategory }) {
  const base = initial ?? blank;
  const [doc, setDoc] = useState<CStackCategory>(base);
  const set = <K extends keyof CStackCategory>(k: K, v: CStackCategory[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  return (
    <EditorShell
      backHref="/admin/stack"
      isNew={!initial}
      dirty={JSON.stringify(doc) !== JSON.stringify(base)}
      onSave={() => saveStack(initial?.id, doc)}
      onDelete={initial && (() => deleteStack(initial.id))}
    >
      <Section title="Category">
        <div className="admin-grid admin-grid--3">
          <Text label="Slug" value={doc.id} onChange={(v) => set("id", v)} placeholder="frontend" />
          <Select label="Icon" value={doc.icon} options={ICONS} onChange={(v) => set("icon", v)} />
          <Text label="Order" type="number" value={doc.order} onChange={(v) => set("order", Number(v))} hint="Lower shows first" />
        </div>
        <Localized label="Name" value={doc.label} onChange={(v) => set("label", v)} />
      </Section>

      <Section
        title="Tools"
        description="Use a known name, like TypeScript or Docker, so the tool gets its logo."
      >
        <datalist id="tech-names">
          {Object.keys(TECH_ICONS).map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <ListEditor
          items={doc.items}
          onChange={(v) => set("items", v)}
          create={() => ({ name: "", note: { en: "", id: "" } })}
          addLabel="Add tool"
          itemTitle={(item) => item.name || "New tool"}
        >
          {(item, update) => (
            <>
              <Text
                label="Name"
                value={item.name}
                list="tech-names"
                onChange={(name) => update({ ...item, name })}
              />
              <Localized label="Note" value={item.note} onChange={(note) => update({ ...item, note })} />
            </>
          )}
        </ListEditor>
      </Section>
    </EditorShell>
  );
}
