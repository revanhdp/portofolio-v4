import { getStack } from "@/lib/content";
import StackClient from "./StackClient";

export const dynamic = "force-dynamic";

export default async function StackPage() {
  return <StackClient data={await getStack()} />;
}
