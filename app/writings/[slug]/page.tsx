import { writings } from "@/lib/data";
import { notFound } from "next/navigation";
import WritingDetail from "./WritingDetail";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const writing = writings.find((w) => w.slug === slug);
  if (!writing) return {};
  return {
    title: `${writing.title} — Revanza Hadi Putra`,
    description: writing.description,
  };
}

export async function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.slug }));
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = writings.find((w) => w.slug === slug);

  if (!writing) {
    notFound();
  }

  return <WritingDetail writing={writing} />;
}
