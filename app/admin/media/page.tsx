import { requireUser } from "@/lib/auth";
import PageHeader from "@/components/admin/PageHeader";
import MediaBrowser from "@/components/admin/MediaBrowser";

export default async function MediaPage() {
  const user = await requireUser();
  return (
    <>
      <PageHeader
        title="Media"
        description="Images uploaded here can be picked in the Projects and Work forms."
      />
      <MediaBrowser currentUser={user.username} isSuperadmin={user.role === "superadmin"} />
    </>
  );
}
