"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { TECH_ICONS } from "@/components/techIconsRegistry";

export type ToolOption = {
  name: string;
  /** Stack category it belongs to, used to group the list. */
  category: string;
  icon?: string;
};

function ToolIcon({ name, icon }: { name: string; icon?: string }) {
  const src = icon || TECH_ICONS[name]?.iconSrc;
  return (
    <span className="admin-chip-icon" aria-hidden="true">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" />
      ) : (
        name.charAt(0)
      )}
    </span>
  );
}

/* Choose tools from the Stack list. A tool a project already uses that is
   not in the list stays selectable (dashed chip), and a new name can be
   typed in — so no existing data is lost. */
export default function ToolPicker({
  label,
  hint,
  value,
  onChange,
  tools,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (v: string[]) => void;
  tools: ToolOption[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const byName = useMemo(() => new Map(tools.map((t) => [t.name, t])), [tools]);
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const map = new Map<string, ToolOption[]>();
    for (const t of tools) {
      if (q && !t.name.toLowerCase().includes(q)) continue;
      map.set(t.category, [...(map.get(t.category) ?? []), t]);
    }
    return [...map.entries()];
  }, [tools, q]);

  const toggle = (name: string) =>
    onChange(value.includes(name) ? value.filter((v) => v !== name) : [...value, name]);

  const canAddCustom =
    q.length > 0 && !tools.some((t) => t.name.toLowerCase() === q) && !value.some((v) => v.toLowerCase() === q);

  return (
    <div className="admin-field" ref={root}>
      <span className="admin-label">{label}</span>
      <div className="admin-pop-anchor">
        <div className="admin-chips">
          {value.map((name) => {
            const known = byName.get(name);
            return (
              <span
                key={name}
                className={`admin-chip ${known ? "" : "admin-chip--loose"}`}
                title={known ? undefined : "Not in the Stack list"}
              >
                <ToolIcon name={name} icon={known?.icon} />
                {name}
                <button
                  type="button"
                  className="admin-icon-btn"
                  aria-label={`Remove ${name}`}
                  onClick={() => toggle(name)}
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
          <button
            type="button"
            className="admin-btn admin-btn--secondary"
            style={{ height: 30, padding: "0 10px" }}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Plus size={13} />
            Add tool
          </button>
        </div>

        {open && (
          <div className="admin-pop" role="listbox" aria-label="Tools" aria-multiselectable="true">
            <div className="admin-pop-search">
              <input
                className="admin-input"
                autoFocus
                placeholder="Search or type a new name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  e.preventDefault();
                  if (canAddCustom) {
                    toggle(query.trim());
                    setQuery("");
                  } else if (groups.length === 1 && groups[0][1].length === 1) {
                    toggle(groups[0][1][0].name);
                  }
                }}
              />
            </div>
            <div className="admin-pop-list" data-lenis-prevent>
              {groups.map(([category, items]) => (
                <div key={category}>
                  <div className="admin-pop-group">{category}</div>
                  {items.map((t) => {
                    const selected = value.includes(t.name);
                    return (
                      <button
                        key={t.name}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className="admin-pop-item"
                        onClick={() => toggle(t.name)}
                      >
                        <ToolIcon name={t.name} icon={t.icon} />
                        {t.name}
                        {selected && <Check size={14} className="admin-pop-check" />}
                      </button>
                    );
                  })}
                </div>
              ))}
              {canAddCustom && (
                <button
                  type="button"
                  className="admin-pop-item"
                  onClick={() => {
                    toggle(query.trim());
                    setQuery("");
                  }}
                >
                  <span className="admin-chip-icon">
                    <Plus size={11} />
                  </span>
                  Add “{query.trim()}”
                </button>
              )}
              {groups.length === 0 && !canAddCustom && (
                <p className="admin-pop-empty">No tools found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      {hint && <span className="admin-hint">{hint}</span>}
    </div>
  );
}
