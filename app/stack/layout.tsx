import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack — Revanza Hadi Putra",
  description: "Languages, frameworks, and tools I build with.",
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
