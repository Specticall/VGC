import { UserData } from "./types";

const ROLES = {
  ADMIN: ["view:dashboard"],
  USER: [],
} as const;

export type Role = keyof typeof ROLES;
type Persmission = (typeof ROLES)[Role][number];

export function hasPermission(
  user: UserData | undefined,
  permission: Persmission
) {
  if (!user) return false;
  return (ROLES[user.Role] as readonly Persmission[]).includes(permission);
}
