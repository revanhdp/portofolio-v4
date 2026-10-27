import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { ROLE_LABEL } from "@/lib/roles";
import { logoutAction } from "@/lib/admin-actions";
import AdminNav from "@/components/admin/AdminNav";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — Revanza Hadi Putra",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/stack", label: "Stack" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/work", label: "Work" },
  { href: "/admin/writings", label: "Writings" },
  { href: "/admin/media", label: "Media" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Signed out: the sign-in page lays itself out
  if (!user) return <div className="admin">{children}</div>;

  return (
    <div className="admin">
      <div className="admin-shell">
        <header className="admin-topbar">
          <Link href="/admin" className="admin-brand">
            <span className="admin-mark" aria-hidden="true">
              R
            </span>
            <span>
              Admin <span className="admin-brand-sub">· Revanza</span>
            </span>
          </Link>

          <div className="admin-topbar-end">
            <Link
              href="/"
              target="_blank"
              className="admin-icon-btn"
              title="View site"
              aria-label="View site (opens in a new tab)"
              style={{ width: 32, height: 32 }}
            >
              <ExternalLink size={15} strokeWidth={1.75} />
            </Link>
            <Link
              href="/admin/account"
              className="admin-user"
              title={`${user.name} · ${ROLE_LABEL[user.role]}`}
            >
              <span className="admin-avatar">{user.name.charAt(0)}</span>
              <span className="admin-user-name">{user.name}</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="admin-icon-btn"
                title="Log out"
                aria-label="Log out"
                style={{ width: 32, height: 32 }}
              >
                <LogOut size={15} strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </header>

        <AdminNav
          items={
            user.role === "superadmin"
              ? [...nav, { href: "/admin/users", label: "Users" }]
              : nav
          }
        />

        <main>{children}</main>
      </div>
    </div>
  );
}
