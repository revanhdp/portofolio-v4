import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getProjects, getStack, getWorks, getWritings } from "@/lib/content";
import PageHeader from "@/components/admin/PageHeader";
import { btn } from "@/components/admin/styles";

type Row = {
  key: string;
  title: string;
  sub?: string;
  meta?: string;
  badge?: { label: string; warn?: boolean };
};

type ListConfig = {
  title: string;
  description: string;
  newLabel: string;
  rows: Row[];
};

async function load(resource: string): Promise<ListConfig | null> {
  switch (resource) {
    case "stack":
      return {
        title: "Stack",
        description: "Tool categories shown on the stack page, with each tool's note.",
        newLabel: "New category",
        rows: (await getStack()).map((c) => ({
          key: c.id,
          title: c.label.en,
          meta: `${c.items.length} tools`,
        })),
      };
    case "projects":
      return {
        title: "Projects",
        description: "Active and archived projects, with their detail pages and screenshots.",
        newLabel: "New project",
        rows: (await getProjects()).map((p) => ({
          key: p.id,
          title: p.name,
          meta: p.year,
          badge: p.archived ? { label: "Archived" } : undefined,
        })),
      };
    case "work":
      return {
        title: "Work",
        description: "Where you have worked, and what you built there.",
        newLabel: "New entry",
        rows: (await getWorks()).map((w) => ({
          key: w.id,
          title: w.company,
          sub: w.role.en,
          meta: w.period,
        })),
      };
    case "writings":
      return {
        title: "Writings",
        description: "Articles in Markdown. The public pages are switched off for now.",
        newLabel: "New writing",
        rows: (await getWritings()).map((w) => ({
          key: w.slug,
          title: w.title.en,
          meta: w.date,
          badge: w.published ? undefined : { label: "Draft", warn: true },
        })),
      };
    default:
      return null;
  }
}

export default async function ResourceList({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  await requireUser();
  const { resource } = await params;
  const data = await load(resource);
  if (!data) notFound();

  const newButton = (
    <Link href={`/admin/${resource}/new`} className={btn.primary}>
      <Plus size={14} />
      {data.newLabel}
    </Link>
  );

  return (
    <>
      <PageHeader title={data.title} description={data.description} actions={newButton} />

      {data.rows.length === 0 ? (
        <div className="admin-empty">
          Nothing here yet.
          {newButton}
        </div>
      ) : (
        <ul className="admin-list">
          {data.rows.map((row) => (
            <li key={row.key}>
              <Link href={`/admin/${resource}/${row.key}`} className="admin-row row-hover">
                <span className="admin-row-main">
                  <span className="admin-row-title">{row.title}</span>
                  {row.sub && <span className="admin-row-sub">{row.sub}</span>}
                </span>
                <span className="admin-row-meta">
                  {row.badge && (
                    <span className={`admin-badge ${row.badge.warn ? "admin-badge--warn" : ""}`}>
                      {row.badge.label}
                    </span>
                  )}
                  {row.meta}
                  <ChevronRight size={14} className="admin-row-chevron" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
