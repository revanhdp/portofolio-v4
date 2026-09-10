import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings — Revanza Hadi Putra",
  description: "Essays, notes, and things I'm thinking about.",
};

export default function WritingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
