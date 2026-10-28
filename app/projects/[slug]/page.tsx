import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getStack } from "@/lib/content";
import ProjectDetail from "./ProjectDetail";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Revanza Hadi Putra`,
    description: project.description.en,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Tools can carry a custom logo set on the stack page
  const toolIcons: Record<string, { icon?: string; iconDark?: string }> = {};
  for (const category of await getStack()) {
    for (const item of category.items) {
      if (item.icon) toolIcons[item.name] = { icon: item.icon, iconDark: item.iconDark };
    }
  }

  return <ProjectDetail project={project} toolIcons={toolIcons} />;
}
