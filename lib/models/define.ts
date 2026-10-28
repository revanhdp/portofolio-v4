import mongoose, { type Model, type Schema } from "mongoose";

/* Registers a model once. In development the cached model is replaced, so
   a changed schema takes effect on hot reload — otherwise mongoose keeps
   the old schema and silently drops any new field on save. */
export function defineModel<T>(name: string, schema: Schema<T>): Model<T> {
  if (process.env.NODE_ENV !== "production" && mongoose.models[name]) {
    mongoose.deleteModel(name);
  }
  return (mongoose.models[name] as Model<T> | undefined) ?? mongoose.model<T>(name, schema);
}
