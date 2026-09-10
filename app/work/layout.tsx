import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Revanza Hadi Putra",
  description: "Where I've worked and what I shipped there.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
