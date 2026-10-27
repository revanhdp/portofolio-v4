import { requireUser } from "@/lib/auth";
import { ROLE_HINT, ROLE_LABEL } from "@/lib/roles";
import PageHeader from "@/components/admin/PageHeader";
import AccountForm from "@/components/admin/AccountForm";

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <>
      <PageHeader title="Account" description="Your profile and password." />
      <div className="admin-sections">
        <section className="admin-section">
          <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="admin-avatar admin-avatar--lg">{user.name.charAt(0)}</span>
            <span style={{ minWidth: 0, flex: 1 }}>
              <span className="admin-title" style={{ display: "block" }}>{user.name}</span>
              <span className="admin-hint">@{user.username} · {ROLE_HINT[user.role]}</span>
            </span>
            <span className="admin-badge admin-badge--strong">{ROLE_LABEL[user.role]}</span>
          </div>
        </section>
        <section className="admin-section">
          <div>
            <h2 className="admin-section-title">Password</h2>
            <p className="admin-section-desc">Changing it signs you out on every other device.</p>
          </div>
          <AccountForm />
        </section>
      </div>
    </>
  );
}
