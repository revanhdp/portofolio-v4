import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getProjects, getStack, getWorks, getWritings } from "@/lib/content";
import PageHeader from "@/components/admin/PageHeader";
import StackForm from "@/components/admin/StackForm";
import ProjectForm from "@/components/admin/ProjectForm";
import WorkForm from "@/components/admin/WorkForm";
import WritingForm from "@/components/admin/WritingForm";

export default async function ResourceEditor({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const user = await requireUser();
  const { resource, id } = await params;
  const isNew = id === "new";
  const media = {
    currentUser: user.username,
    isSuperadmin: user.role === "superadmin",
  };

  let header: { back: { href: string; label: string }; title: string; description: string };
  let form: React.ReactNode;

  switch (resource) {
    case "stack": {
      const initial = isNew ? undefined : (await getStack()).find((c) => c.id === id);
      if (!isNew && !initial) notFound();
      header = {
        back: { href: "/admin/stack", label: "Stack" },
        title: initial ? initial.label.en : "New category",
        description: "A group of tools on the stack page.",
      };
      form = <StackForm key={id} initial={initial} {...media} />;
      break;
    }
    case "projects": {
      const initial = isNew ? undefined : (await getProjects()).find((p) => p.id === id);
      if (!isNew && !initial) notFound();
      header = {
        back: { href: "/admin/projects", label: "Projects" },
        title: initial ? initial.name : "New project",
        description: initial ? `Shown at /projects/${initial.id}` : "Gets its own page at /projects/<slug>.",
      };
      const tools = (await getStack()).flatMap((c) =>
        c.items.map((i) => ({ name: i.name, category: c.label.en, icon: i.icon })),
      );
      form = <ProjectForm key={id} initial={initial} tools={tools} {...media} />;
      break;
    }
    case "work": {
      const initial = isNew ? undefined : (await getWorks()).find((w) => w.id === id);
      if (!isNew && !initial) notFound();
      const projectSlugs = (await getProjects()).map((p) => p.id);
      header = {
        back: { href: "/admin/work", label: "Work" },
        title: initial ? initial.company : "New work entry",
        description: "A company or programme, and what you built there.",
      };
      form = <WorkForm key={id} initial={initial} projectSlugs={projectSlugs} {...media} />;
      break;
    }
    case "writings": {
      const initial = isNew ? undefined : (await getWritings()).find((w) => w.slug === id);
      if (!isNew && !initial) notFound();
      header = {
        back: { href: "/admin/writings", label: "Writings" },
        title: initial ? initial.title.en : "New writing",
        description: "An article written in Markdown.",
      };
      form = <WritingForm key={id} initial={initial} />;
      break;
    }
    default:
      notFound();
  }

  return (
    <>
      <PageHeader {...header} />
      {form}
    </>
  );
}
