import { projects, archivedProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectDetail from "./ProjectDetail";
import { Metadata } from "next";

const allProjects = [...projects, ...archivedProjects];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Revanza Hadi Putra`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.id }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
