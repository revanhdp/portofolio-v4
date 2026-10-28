"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import EditorShell from "./EditorShell";
import { ListEditor, Localized, Section, Spinner, Switch, Text, btn } from "./fields";
import ToolPicker, { type ToolOption } from "./ToolPicker";
import { IMAGE_ACCEPT, uploadImage } from "./upload";
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
  tools,
  currentUser,
  isSuperadmin,
}: {
  initial?: CProject;
  /** Tools from the Stack module, offered in the picker. */
  tools: ToolOption[];
  currentUser: string;
  isSuperadmin: boolean;
}) {
  const base = initial ?? blank;
  const [doc, setDoc] = useState<CProject>(base);
  const set = <K extends keyof CProject>(k: K, v: CProject[K]) =>
    setDoc((d) => ({ ...d, [k]: v }));

  // Drop several screenshots at once: each is stored and added with its path filled in
  const shots = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const uploadShots = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setUploadError(undefined);
    for (const file of Array.from(files)) {
      try {
        const { url } = await uploadImage(file);
        setDoc((d) => ({
          ...d,
          images: [...d.images, { src: url, caption: { en: "", id: "" } }],
        }));
      } catch (err) {
        setUploadError(`${file.name}: ${err instanceof Error ? err.message : "Upload failed."}`);
        break;
      }
    }
    setUploading(false);
    if (shots.current) shots.current.value = "";
  };

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
        <ToolPicker
          label="Tech used"
          value={doc.stack}
          onChange={(v) => set("stack", v)}
          tools={tools}
          hint="Choose from your Stack. Dashed chips are not in the Stack list yet."
        />
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

      <Section title="Screenshots" description="Shown as a grid; each opens full size. Uploaded files are saved and their paths filled in for you.">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <input ref={shots} type="file" multiple accept={IMAGE_ACCEPT} hidden onChange={(e) => uploadShots(e.target.files)} />
          <button type="button" className={btn.secondary} disabled={uploading} onClick={() => shots.current?.click()}>
            {uploading ? <Spinner /> : <Upload size={14} />}
            {uploading ? "Uploading…" : "Upload screenshots"}
          </button>
          {uploadError && (
            <span role="alert" className="admin-hint" style={{ color: "var(--a-danger)" }}>
              {uploadError}
            </span>
          )}
        </div>
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
