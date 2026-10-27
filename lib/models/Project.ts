import { Schema, model, models, type Model } from "mongoose";
import { LocalizedSchema, type Localized } from "./shared";

export interface IProject {
  slug: string;
  name: string;
  description: Localized;
  url?: string;
  github?: string;
  archived: boolean;
  year: string;
  role: Localized;
  overview: Localized[];
  stack: string[];
  highlights: Localized[];
  images: { src: string; caption: Localized }[];
  order: number;
}

const schema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: LocalizedSchema, required: true },
    url: String,
    github: String,
    archived: { type: Boolean, default: false, index: true },
    year: { type: String, default: "" },
    role: { type: LocalizedSchema },
    overview: [LocalizedSchema],
    stack: [String],
    highlights: [LocalizedSchema],
    images: [
      {
        _id: false,
        src: { type: String, required: true },
        caption: { type: LocalizedSchema },
      },
    ],
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const Project: Model<IProject> =
  models.Project ?? model<IProject>("Project", schema);
