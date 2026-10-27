import { getWorks } from "@/lib/content";
import WorkClient from "./WorkClient";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  return <WorkClient data={await getWorks()} />;
}
