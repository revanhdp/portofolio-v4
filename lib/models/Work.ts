import { Schema, type Model } from "mongoose";
import { defineModel } from "./define";
import { LocalizedSchema, type Localized } from "./shared";
import { WORK_ICONS } from "../work-icons";


export interface IWork {
  slug: string;
  company: string;
  logo?: string;
  period: string;
  role: Localized;
  order: number;
  projects: {
    icon: (typeof WORK_ICONS)[number];
    name: string;
    description: Localized;
    /** Project slug — makes the row link to /projects/<slug>. */
    slug?: string;
  }[];
}

const schema = new Schema<IWork>(
  {
    slug: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    logo: String,
    period: { type: String, required: true },
    role: { type: LocalizedSchema, required: true },
    order: { type: Number, default: 0, index: true },
    projects: [
      {
        _id: false,
        icon: { type: String, enum: WORK_ICONS, required: true },
        name: { type: String, required: true },
        description: { type: LocalizedSchema },
        slug: String,
      },
    ],
  },
  { timestamps: true },
);

export const Work: Model<IWork> = defineModel<IWork>("Work", schema);
