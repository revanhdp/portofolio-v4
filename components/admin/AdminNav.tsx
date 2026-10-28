"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tab, TabList, Tabs } from "@/components/ui/tabs";

/* Section tabs with the sketch underline. Each tab is a route, so the
   active one follows the URL and picking one navigates. Activation is
   manual: arrow keys move focus, Enter or Space opens the section.    */
export default function AdminNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  // The longest matching href wins, so /admin/projects/x highlights Projects, not Overview
  const current = items
    .filter((i) => (i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href)))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <Tabs
      value={current ?? ""}
      onValueChange={(href) => router.push(href)}
      activationMode="manual"
      roughness={0.4}
      strokeWidth={1}
    >
      <TabList
        className="admin-nav"
        aria-label="Admin"
        style={{ flexWrap: "nowrap", gap: 0 }}
      >
        {items.map((item) => (
          <Tab
            key={item.href}
            value={item.href}
            className="admin-tab"
            onMouseEnter={() => router.prefetch(item.href)}
            style={{
              fontSize: 13,
              padding: "6px 12px 12px",
              flexShrink: 0,
              whiteSpace: "nowrap",
              color: item.href === current ? "var(--foreground)" : "var(--muted)",
            }}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
