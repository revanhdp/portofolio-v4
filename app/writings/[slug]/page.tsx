import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export async function generateStaticParams() {
  // Empty params while writings is temporarily deactivated
  return [];
}

/**
 * WritingDetailPage
 * Temporarily deactivated as requested.
 * Returns 404 until ready to be published.
 */
export default function WritingPage() {
  notFound();
}
