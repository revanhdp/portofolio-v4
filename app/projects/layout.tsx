import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Revanza Hadi Putra",
  description: "Projects I've built and maintained.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
