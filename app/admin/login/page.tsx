import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");

  return (
    <div className="admin-auth">
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div className="admin-auth-card">
          <span className="admin-mark" aria-hidden="true">
            R
          </span>
          <h1 className="admin-title" style={{ marginTop: 16 }}>
            Sign in
          </h1>
          <p className="admin-desc" style={{ marginBottom: 20 }}>
            Manage the content of your portfolio.
          </p>
          <LoginForm />
        </div>
        <p className="admin-auth-foot">
          <Link href="/" className="admin-back" style={{ marginBottom: 0 }}>
            <ArrowLeft size={12} strokeWidth={1.75} />
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
