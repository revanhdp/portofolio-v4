/* Class names for admin buttons and inputs. Kept out of the "use client"
   field components so Server Components can import the real strings —
   a "use client" module only hands them a client reference.            */

export const inputClass = "admin-input";

export const btn = {
  primary: "admin-btn admin-btn--primary",
  secondary: "admin-btn admin-btn--secondary",
  ghost: "admin-btn admin-btn--ghost",
  danger: "admin-btn admin-btn--danger",
};
