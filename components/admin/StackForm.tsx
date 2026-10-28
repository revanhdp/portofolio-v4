"use client";

import { useState } from "react";
import EditorShell from "./EditorShell";
import { ListEditor, Localized, Section, Select, Text } from "./fields";
import ImagePicker from "./ImagePicker";
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

export default function StackForm({
  initial,
  currentUser,
  isSuperadmin,
}: {
  initial?: CStackCategory;
  currentUser: string;
  isSuperadmin: boolean;
}) {
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
        description="Known names like TypeScript or Docker get a built-in logo. Upload an icon to replace it, or to add a tool that has none."
      >
        <datalist id="tech-names">
          {Object.keys(TECH_ICONS).map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <ListEditor
          items={doc.items}
          onChange={(v) => set("items", v)}
          create={() => ({ name: "", note: { en: "", id: "" }, icon: "", iconDark: "" })}
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
              <>
                <ImagePicker
                  label="Icon"
                  value={item.icon ?? ""}
                  fallback={TECH_ICONS[item.name]?.iconSrc}
                  hint={TECH_ICONS[item.name] ? "Empty uses the built-in logo shown here." : "Square PNG, WebP or AVIF works best."}
                  onChange={(icon) => update({ ...item, icon })}
                  currentUser={currentUser}
                  isSuperadmin={isSuperadmin}
                />
                <ImagePicker
                  label="Dark mode icon"
                  value={item.iconDark ?? ""}
                  fallback={item.icon ? undefined : TECH_ICONS[item.name]?.darkIconSrc}
                  hint="Optional. Empty reuses the main icon."
                  onChange={(iconDark) => update({ ...item, iconDark })}
                  currentUser={currentUser}
                  isSuperadmin={isSuperadmin}
                />
              </>
            </>
          )}
        </ListEditor>
      </Section>
    </EditorShell>
  );
}
