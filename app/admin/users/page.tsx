import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { requireSuperadmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { ROLE_LABEL } from "@/lib/roles";
import PageHeader from "@/components/admin/PageHeader";
import { btn } from "@/components/admin/styles";

const lastSeen = (date?: Date) =>
  date
    ? `Last sign-in ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
    : "Never signed in";

export default async function UsersPage() {
  const me = await requireSuperadmin();
  await connectDB();
  const users = await User.find().sort({ createdAt: 1 }).lean();

  return (
    <>
      <PageHeader
        title="Users"
        description="Who can sign in to this admin, and what they are allowed to change."
        actions={
          <Link href="/admin/users/new" className={btn.primary}>
            <Plus size={14} />
            New user
          </Link>
        }
      />
      <ul className="admin-list">
        {users.map((u) => {
          const id = String(u._id);
          return (
            <li key={id}>
              <Link href={`/admin/users/${id}`} className="admin-row row-hover">
                <span className="admin-avatar">{u.name.charAt(0)}</span>
                <span style={{ minWidth: 0 }}>
                  <span className="admin-row-title" style={{ display: "block" }}>
                    {u.name} <span className="admin-row-sub">@{u.username}</span>
                  </span>
                  <span className="admin-hint" style={{ display: "block" }}>
                    {lastSeen(u.lastLoginAt)}
                  </span>
                </span>
                <span className="admin-row-meta">
                  {id === me.id && <span className="admin-badge">You</span>}
                  {!u.active && <span className="admin-badge admin-badge--warn">Disabled</span>}
                  <span className={`admin-badge ${u.role === "superadmin" ? "admin-badge--strong" : ""}`}>
                    {ROLE_LABEL[u.role]}
                  </span>
                  <ChevronRight size={14} className="admin-row-chevron" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
