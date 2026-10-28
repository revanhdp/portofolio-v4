import { Schema, type Model } from "mongoose";
import { defineModel } from "./define";
import { LocalizedSchema, type Localized } from "./shared";

export interface IStackCategory {
  slug: string;
  label: Localized;
  icon: "frontend" | "backend" | "database" | "tooling";
  order: number;
  items: { name: string; note: Localized; icon?: string; iconDark?: string }[];
}

const schema = new Schema<IStackCategory>(
  {
    slug: { type: String, required: true, unique: true },
    label: { type: LocalizedSchema, required: true },
    icon: {
      type: String,
      enum: ["frontend", "backend", "database", "tooling"],
      required: true,
    },
    order: { type: Number, default: 0, index: true },
    items: [
      {
        _id: false,
        name: { type: String, required: true },
        note: { type: LocalizedSchema },
        icon: String,
        iconDark: String,
      },
    ],
  },
  { timestamps: true },
);

export const StackCategory: Model<IStackCategory> = defineModel<IStackCategory>("StackCategory", schema);
