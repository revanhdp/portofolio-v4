import { Schema, model, models, type Model } from "mongoose";

export interface IMedia {
  /** Stored file name, unique; the public URL is /uploads/<name>. */
  name: string;
  originalName: string;
  mime: string;
  size: number;
  uploadedBy: string;
}

const schema = new Schema<IMedia>(
  {
    name: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    mime: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

export const Media: Model<IMedia> =
  models.Media ?? model<IMedia>("Media", schema);
