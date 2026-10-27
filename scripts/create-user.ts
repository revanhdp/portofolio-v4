/* Creates a user, or resets the password of an existing one. This is the
   way to make the first superadmin, and the recovery path if you get
   locked out.

   npm run create-user -- <username> <password> [--role superadmin|editor] [--name "Full Name"]  */

import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import { User } from "../lib/models/User";
import { hashPassword } from "../lib/password";
import { ROLES, type Role } from "../lib/roles";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const [username, password] = args.filter(
  (a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"),
);

async function main() {
  if (!username || !password) {
    console.error(
      'Usage: npm run create-user -- <username> <password> [--role superadmin|editor] [--name "Full Name"]',
    );
    process.exit(1);
  }
  const role = (flag("role") ?? "superadmin") as Role;
  if (!ROLES.includes(role)) {
    console.error(`Role must be one of: ${ROLES.join(", ")}`);
    process.exit(1);
  }
  if (password.length < 8) {
    console.warn("Warning: this password is shorter than 8 characters. Change it after signing in.");
  }

  await connectDB();
  const name = flag("name") ?? username;
  const existing = await User.findOne({ username: username.toLowerCase() });

  if (existing) {
    existing.passwordHash = await hashPassword(password);
    existing.sessionVersion += 1; // sign out old sessions
    existing.active = true;
    if (flag("role")) existing.role = role;
    await existing.save();
    console.log(`Updated @${existing.username} (${existing.role}): password reset.`);
  } else {
    const user = await User.create({
      username,
      name,
      role,
      passwordHash: await hashPassword(password),
    });
    console.log(`Created @${user.username} (${user.role}).`);
  }
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
