import { notFound } from "next/navigation";
import { requireSuperadmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import PageHeader from "@/components/admin/PageHeader";
import UserForm, { type UserRow } from "@/components/admin/UserForm";

export default async function UserEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireSuperadmin();
  const { id } = await params;
  const isNew = id === "new";

  let initial: UserRow | undefined;
  if (!isNew) {
    await connectDB();
    const user = await User.findById(id).lean().catch(() => null);
    if (!user) notFound();
    initial = {
      id: String(user._id),
      username: user.username,
      name: user.name,
      role: user.role,
      active: user.active,
    };
  }

  return (
    <>
      <PageHeader
        back={{ href: "/admin/users", label: "Users" }}
        title={initial ? initial.name : "New user"}
        description={initial ? `@${initial.username}` : "They sign in with the username and password you set here."}
      />
      <UserForm key={id} initial={initial} isSelf={initial?.id === me.id} />
    </>
  );
}
