import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  ImageIcon,
  Layers,
  PenLine,
  Plus,
  Upload,
  Users,
} from "lucide-react";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getProjects, getStack, getWorks, getWritings } from "@/lib/content";
import { Media } from "@/lib/models/Media";
import { User } from "@/lib/models/User";
import PageHeader from "@/components/admin/PageHeader";
import { btn } from "@/components/admin/styles";

export default async function AdminOverview() {
  const user = await requireUser();
  const [stack, projects, works, writings] = await Promise.all([
    getStack(),
    getProjects(),
    getWorks(),
    getWritings(),
  ]);

  let mediaCount = 0;
  let userCount = 0;
  try {
    await connectDB();
    [mediaCount, userCount] = await Promise.all([
      Media.countDocuments(),
      User.countDocuments(),
    ]);
  } catch {}

  const tools = stack.reduce((n, c) => n + c.items.length, 0);
  const archived = projects.filter((p) => p.archived).length;

  const stats = [
    { href: "/admin/projects", label: "Projects", value: projects.length, note: archived ? `${archived} archived` : undefined, icon: FolderKanban },
    { href: "/admin/stack", label: "Tools", value: tools, note: `${stack.length} categories`, icon: Layers },
    { href: "/admin/work", label: "Work entries", value: works.length, icon: Briefcase },
    { href: "/admin/writings", label: "Writings", value: writings.length, icon: PenLine },
    { href: "/admin/media", label: "Images", value: mediaCount, icon: ImageIcon },
    ...(user.role === "superadmin"
      ? [{ href: "/admin/users", label: "Users", value: userCount, icon: Users }]
      : []),
  ];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description="Everything you save here shows on the site right away."
      />

      <div className="admin-stats">
        {stats.map(({ href, label, value, note, icon: Icon }) => (
          <Link key={href} href={href} className="admin-stat">
            <span className="admin-stat-top">
              <span className="admin-tile">
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <ArrowUpRight size={14} className="admin-stat-arrow" />
            </span>
            <span>
              <span className="admin-stat-value">{value}</span>
              <span className="admin-stat-label" style={{ display: "block" }}>
                {label}
                {note && <span style={{ opacity: 0.7 }}> · {note}</span>}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="admin-section" style={{ marginTop: 32 }}>
        <div>
          <h2 className="admin-section-title">Quick actions</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link href="/admin/projects/new" className={btn.secondary}>
            <Plus size={14} />
            New project
          </Link>
          <Link href="/admin/media" className={btn.secondary}>
            <Upload size={14} />
            Upload images
          </Link>
          <Link href="/admin/stack" className={btn.secondary}>
            <Layers size={14} />
            Edit stack
          </Link>
        </div>
      </div>
    </>
  );
}
