import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/* Title + muted intro, the same pattern as the public page headers. */
export default function PageHeader({
  title,
  description,
  back,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  back?: { href: string; label: string };
  actions?: ReactNode;
}) {
  return (
    <>
      {back && (
        <Link href={back.href} className="admin-back">
          <ArrowLeft size={12} strokeWidth={1.75} />
          {back.label}
        </Link>
      )}
      <div className="admin-head">
        <div style={{ minWidth: 0 }}>
          <h1 className="admin-title">{title}</h1>
          {description && <p className="admin-desc">{description}</p>}
        </div>
        {actions}
      </div>
    </>
  );
}
