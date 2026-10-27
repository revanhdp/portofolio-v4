import { Schema } from "mongoose";

/* Text that exists in both languages. `id` falls back to `en` when it is
   left empty, so a half-translated entry never renders blank. */
export type Localized = { en: string; id?: string };

export const LocalizedSchema = new Schema<Localized>(
  {
    en: { type: String, default: "" },
    id: { type: String, default: "" },
  },
  { _id: false },
);

export const pick = (text: Localized | undefined, lang: "en" | "id") =>
  (lang === "id" && text?.id ? text.id : text?.en) ?? "";
