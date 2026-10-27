/* Client-safe role definitions. */
export const ROLES = ["superadmin", "editor"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  superadmin: "Superadmin",
  editor: "Editor",
};

export const ROLE_HINT: Record<Role, string> = {
  superadmin: "Manages everything, including users and all media.",
  editor: "Edits content and uploads media. Cannot manage users.",
};
