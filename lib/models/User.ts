import { Schema, type Model } from "mongoose";
import { defineModel } from "./define";
import { ROLES, type Role } from "../roles";

export interface IUser {
  username: string;
  name: string;
  passwordHash: string;
  role: Role;
  active: boolean;
  /** Bumped on password change, role change or deactivation to end old sessions. */
  sessionVersion: number;
  lastLoginAt?: Date;
}

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9._-]{3,32}$/,
    },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ROLES, default: "editor", required: true },
    active: { type: Boolean, default: true },
    sessionVersion: { type: Number, default: 0 },
    lastLoginAt: Date,
  },
  { timestamps: true },
);

export const User: Model<IUser> = defineModel<IUser>("User", schema);
