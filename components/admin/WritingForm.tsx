"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import EditorShell from "./EditorShell";
import { Localized, Section, Switch, Text } from "./fields";
import { deleteWriting, saveWriting } from "@/lib/admin-actions";
import type { CWriting } from "@/lib/types";

const blank: CWriting = {
  slug: "",
  title: { en: "", id: "" },
  date: "",
  description: { en: "", id: "" },
  content: { en: "", id: "" },
  readingTime: 1,
  published: true,
  order: 0,
};

export default function WritingForm({ initial }: { initial?: CWriting }) {
  const base = initial ?? blank;
  const [doc, setDoc] = useState<CWriting>(base);
  const set = <K extends keyof CWriting>(k: K, v: CWriting[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  return (
    <EditorShell
      backHref="/admin/writings"
      isNew={!initial}
      dirty={JSON.stringify(doc) !== JSON.stringify(base)}
      onSave={() => saveWriting(initial?.slug, doc)}
      onDelete={initial && (() => deleteWriting(initial.slug))}
    >
      <Section title="Details">
        <p className="admin-alert">
          <Info size={14} />
          The public Writings pages are switched off for now. Entries are stored but not shown yet.
        </p>
        <Localized label="Title" value={doc.title} onChange={(v) => set("title", v)} />
        <div className="admin-grid admin-grid--2">
          <Text label="Slug" value={doc.slug} onChange={(v) => set("slug", v)} placeholder="my-article" />
          <Text label="Date" value={doc.date} onChange={(v) => set("date", v)} placeholder="Aug 2026" />
          <Text label="Reading time (min)" type="number" value={doc.readingTime} onChange={(v) => set("readingTime", Number(v))} />
          <Text label="Order" type="number" value={doc.order} onChange={(v) => set("order", Number(v))} hint="Lower shows first" />
        </div>
        <Switch label="Published" hint="Drafts stay hidden." checked={doc.published} onChange={(v) => set("published", v)} />
      </Section>

      <Section title="Content">
        <Localized label="Description" value={doc.description} onChange={(v) => set("description", v)} rows={2} />
        <Localized label="Body (Markdown)" value={doc.content} onChange={(v) => set("content", v)} rows={16} />
      </Section>
    </EditorShell>
  );
}
