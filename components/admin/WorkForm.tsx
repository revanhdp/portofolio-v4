"use client";

import { useState } from "react";
import EditorShell from "./EditorShell";
import { ListEditor, Localized, Section, Select, Text } from "./fields";
import ImagePicker from "./ImagePicker";
import { deleteWork, saveWork } from "@/lib/admin-actions";
import { WORK_ICONS } from "@/lib/work-icons";
import type { CWork } from "@/lib/types";

const blank: CWork = {
  id: "",
  company: "",
  logo: "",
  period: "",
  role: { en: "", id: "" },
  order: 0,
  projects: [],
};

const ICON_OPTIONS = WORK_ICONS.map((i) => ({
  value: i,
  label: i.charAt(0).toUpperCase() + i.slice(1),
}));

export default function WorkForm({
  initial,
  projectSlugs,
  currentUser,
  isSuperadmin,
}: {
  initial?: CWork;
  projectSlugs: string[];
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const base = initial ?? blank;
  const [doc, setDoc] = useState<CWork>(base);
  const set = <K extends keyof CWork>(k: K, v: CWork[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  return (
    <EditorShell
      backHref="/admin/work"
      isNew={!initial}
      dirty={JSON.stringify(doc) !== JSON.stringify(base)}
      onSave={() => saveWork(initial?.id, doc)}
      onDelete={initial && (() => deleteWork(initial.id))}
    >
      <Section title="Company">
        <div className="admin-grid admin-grid--2">
          <Text label="Company" value={doc.company} onChange={(v) => set("company", v)} />
          <Text label="Slug" value={doc.id} onChange={(v) => set("id", v)} placeholder="company-name" />
          <Text label="Period" value={doc.period} onChange={(v) => set("period", v)} placeholder="2024 – Present" />
          <Text label="Order" type="number" value={doc.order} onChange={(v) => set("order", Number(v))} hint="Lower shows first" />
        </div>
        <ImagePicker
          label="Logo"
          value={doc.logo ?? ""}
          onChange={(v) => set("logo", v)}
          hint="Leave empty to show the company's initials."
          currentUser={currentUser}
          isSuperadmin={isSuperadmin}
        />
        <Localized label="Role" value={doc.role} onChange={(v) => set("role", v)} />
      </Section>

      <Section title="Projects" description="What you worked on there. Link a row to a project to make it clickable.">
        <datalist id="project-slugs">
          {projectSlugs.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <ListEditor
          items={doc.projects}
          onChange={(v) => set("projects", v)}
          create={() => ({ icon: "code" as const, name: "", description: { en: "", id: "" }, slug: "" })}
          addLabel="Add project"
          itemTitle={(item) => item.name || "New project"}
        >
          {(item, update) => (
            <>
              <div className="admin-grid admin-grid--2">
                <Text label="Name" value={item.name} onChange={(name) => update({ ...item, name })} />
                <Select label="Icon" value={item.icon} options={ICON_OPTIONS} onChange={(icon) => update({ ...item, icon })} />
              </div>
              <Text
                label="Links to project"
                value={item.slug ?? ""}
                list="project-slugs"
                onChange={(slug) => update({ ...item, slug })}
                hint="Optional — the slug of a project"
              />
              <Localized label="Description" value={item.description} onChange={(description) => update({ ...item, description })} />
            </>
          )}
        </ListEditor>
      </Section>
    </EditorShell>
  );
}
