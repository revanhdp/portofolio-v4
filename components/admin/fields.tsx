"use client";

import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import type { L } from "@/lib/types";

/* Building blocks for every admin form. Styles live in app/admin/admin.css. */

export { btn, inputClass } from "./styles";

export function Spinner() {
  return <span className="admin-spinner" aria-hidden="true" />;
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="admin-field">
      <span className="admin-label">{label}</span>
      {children}
      {hint && <span className="admin-hint">{hint}</span>}
    </label>
  );
}

export function Text({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = "text",
  list,
  disabled,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  hint?: ReactNode;
  placeholder?: string;
  type?: "text" | "number" | "url";
  list?: string;
  disabled?: boolean;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className="admin-input"
        type={type}
        value={value}
        list={list}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
  disabled,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <Field label={label} hint={hint}>
      <span className="admin-select">
        <select
          className="admin-input"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value as T)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} />
      </span>
    </Field>
  );
}

/** On/off setting — the same switch as the site's settings menu. */
export function Switch({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="admin-switch-row" onClick={() => onChange(!checked)}>
      <div>
        <div className="admin-label">{label}</div>
        {hint && <div className="admin-hint">{hint}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className="admin-switch"
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
      />
    </div>
  );
}

/** One text, two languages. Indonesian falls back to English when empty. */
export function Localized({
  label,
  value,
  onChange,
  rows = 1,
  hint,
}: {
  /** Leave empty inside a list item, where the item header already names it. */
  label?: string;
  value: L;
  onChange: (v: L) => void;
  rows?: number;
  hint?: string;
}) {
  const input = (lang: "en" | "id") => {
    const props = {
      className: "admin-input",
      value: value[lang] ?? "",
      "aria-label": `${label ?? "Text"} (${lang === "en" ? "English" : "Indonesian"})`,
      placeholder: lang === "id" && value.en ? value.en : undefined,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => onChange({ ...value, [lang]: e.target.value }),
    };
    return rows > 1 ? (
      <textarea rows={rows} {...props} />
    ) : (
      <input type="text" {...props} />
    );
  };

  const fallsBack = !value.id && !!value.en;

  return (
    <div className="admin-field">
      {label && <span className="admin-label">{label}</span>}
      <div className="admin-grid admin-grid--2" style={{ gap: 10 }}>
        <div className="admin-field">
          <span className="admin-lang">English</span>
          {input("en")}
        </div>
        <div className="admin-field">
          <span className="admin-lang">
            Indonesia
            {fallsBack && <span className="admin-lang-note">· shows English</span>}
          </span>
          {input("id")}
        </div>
      </div>
      {hint && <span className="admin-hint">{hint}</span>}
    </div>
  );
}

/** A titled group of fields, separated from the next by a hairline. */
export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-section">
      <div>
        <h2 className="admin-section-title">{title}</h2>
        {description && <p className="admin-section-desc">{description}</p>}
      </div>
      {children}
    </section>
  );
}

/** Editable list with add, remove and reorder. */
export function ListEditor<T>({
  items,
  onChange,
  create,
  addLabel = "Add",
  itemTitle,
  children,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  addLabel?: string;
  /** Short label shown in each item's header, e.g. its name. */
  itemTitle: (item: T, index: number) => string;
  children: (item: T, update: (next: T) => void, index: number) => ReactNode;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };

  return (
    <div className="admin-items">
      {items.map((item, i) => (
        <div key={i} className="admin-item">
          <div className="admin-item-head">
            <span className="admin-item-title">
              <span className="admin-item-index">{i + 1}</span>
              {itemTitle(item, i)}
            </span>
            <button
              type="button"
              className="admin-icon-btn"
              title="Move up"
              aria-label="Move up"
              disabled={i === 0}
              onClick={() => move(i, i - 1)}
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              className="admin-icon-btn"
              title="Move down"
              aria-label="Move down"
              disabled={i === items.length - 1}
              onClick={() => move(i, i + 1)}
            >
              <ArrowDown size={14} />
            </button>
            <button
              type="button"
              className="admin-icon-btn admin-icon-btn--danger"
              title="Remove"
              aria-label="Remove"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="admin-item-body">
            {children(
              item,
              (next) => onChange(items.map((x, j) => (j === i ? next : x))),
              i,
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="admin-add"
        onClick={() => onChange([...items, create()])}
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}
