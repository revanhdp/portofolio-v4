"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/* Pill tabs with a sliding active pill — the same pattern as the stack filter. */
export default function AdminNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="admin-nav" aria-label="Admin">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="admin-nav-link"
            aria-current={active ? "page" : undefined}
          >
            {active && (
              <motion.span
                layoutId="admin-nav-pill"
                className="admin-nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="admin-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
