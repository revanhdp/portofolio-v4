import { Schema, type Model } from "mongoose";
import { defineModel } from "./define";
import { LocalizedSchema, type Localized } from "./shared";

export interface IWriting {
  slug: string;
  title: Localized;
  date: string;
  description: Localized;
  /** Markdown. */
  content: Localized;
  readingTime: number;
  published: boolean;
  order: number;
}

const schema = new Schema<IWriting>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: LocalizedSchema, required: true },
    date: { type: String, required: true },
    description: { type: LocalizedSchema },
    content: { type: LocalizedSchema, required: true },
    readingTime: { type: Number, default: 1 },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const Writing: Model<IWriting> = defineModel<IWriting>("Writing", schema);
