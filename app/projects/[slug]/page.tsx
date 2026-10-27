import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/content";
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

  return <ProjectDetail project={project} />;
}
