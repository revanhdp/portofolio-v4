"use client";

import { useState } from "react";
import EditorShell from "./EditorShell";
import { ListEditor, Localized, Section, Switch, Tags, Text } from "./fields";
import ImagePicker from "./ImagePicker";
import { deleteProject, saveProject } from "@/lib/admin-actions";
import type { CProject } from "@/lib/types";

const blank: CProject = {
  id: "",
  name: "",
  description: { en: "", id: "" },
  url: "",
  github: "",
  archived: false,
  year: "",
  role: { en: "", id: "" },
  overview: [],
  stack: [],
  highlights: [],
  images: [],
  order: 0,
};

const preview = (text: string, fallback: string) =>
  text ? (text.length > 60 ? `${text.slice(0, 60)}…` : text) : fallback;

export default function ProjectForm({
  initial,
  currentUser,
  isSuperadmin,
}: {
  initial?: CProject;
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const base = initial ?? blank;
  const [doc, setDoc] = useState<CProject>(base);
  const set = <K extends keyof CProject>(k: K, v: CProject[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  return (
    <EditorShell
      backHref="/admin/projects"
      isNew={!initial}
      dirty={JSON.stringify(doc) !== JSON.stringify(base)}
      onSave={() => saveProject(initial?.id, doc)}
      onDelete={initial && (() => deleteProject(initial.id))}
    >
      <Section title="Basics">
        <div className="admin-grid admin-grid--2">
          <Text label="Name" value={doc.name} onChange={(v) => set("name", v)} />
          <Text label="Slug" value={doc.id} onChange={(v) => set("id", v)} hint="Used in the URL" placeholder="my-project" />
          <Text label="Year" value={doc.year} onChange={(v) => set("year", v)} placeholder="2024 – Present" />
          <Text label="Order" type="number" value={doc.order} onChange={(v) => set("order", Number(v))} hint="Lower shows first" />
        </div>
        <Switch
          label="Archived"
          hint="Moves the project to the “no longer maintained” list."
          checked={doc.archived}
          onChange={(v) => set("archived", v)}
        />
      </Section>

      <Section title="Description">
        <Localized label="Short description" value={doc.description} onChange={(v) => set("description", v)} rows={2} hint="Shown in the project list." />
        <Localized label="Your role" value={doc.role} onChange={(v) => set("role", v)} />
        <Tags label="Tech used" value={doc.stack} onChange={(v) => set("stack", v)} hint="Comma separated, e.g. TypeScript, Next.js, Laravel" />
      </Section>

      <Section title="Links">
        <div className="admin-grid admin-grid--2">
          <Text label="Live URL" type="url" value={doc.url ?? ""} onChange={(v) => set("url", v)} placeholder="https://" />
          <Text label="Source code" type="url" value={doc.github ?? ""} onChange={(v) => set("github", v)} placeholder="https://github.com/…" />
        </div>
      </Section>

      <Section title="Overview" description="One block per paragraph on the project page.">
        <ListEditor
          items={doc.overview}
          onChange={(v) => set("overview", v)}
          create={() => ({ en: "", id: "" })}
          addLabel="Add paragraph"
          itemTitle={(item) => preview(item.en, "New paragraph")}
        >
          {(item, update) => <Localized value={item} onChange={update} rows={4} />}
        </ListEditor>
      </Section>

      <Section title="What you built" description="Short highlights, shown as a list.">
        <ListEditor
          items={doc.highlights}
          onChange={(v) => set("highlights", v)}
          create={() => ({ en: "", id: "" })}
          addLabel="Add highlight"
          itemTitle={(item) => preview(item.en, "New highlight")}
        >
          {(item, update) => <Localized value={item} onChange={update} rows={2} />}
        </ListEditor>
      </Section>

      <Section title="Screenshots" description="Shown as a grid; each opens full size.">
        <ListEditor
          items={doc.images}
          onChange={(v) => set("images", v)}
          create={() => ({ src: "", caption: { en: "", id: "" } })}
          addLabel="Add screenshot"
          itemTitle={(item) => preview(item.caption.en, "New screenshot")}
        >
          {(item, update) => (
            <>
              <ImagePicker
                label="Image"
                value={item.src}
                onChange={(src) => update({ ...item, src })}
                currentUser={currentUser}
                isSuperadmin={isSuperadmin}
              />
              <Localized label="Caption" value={item.caption} onChange={(caption) => update({ ...item, caption })} />
            </>
          )}
        </ListEditor>
      </Section>
    </EditorShell>
  );
}
