import { getProjects } from "@/lib/content";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  return <ProjectsClient data={await getProjects()} />;
}
