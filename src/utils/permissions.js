import { ROLE_PERMISSIONS } from "../constants/permissions.js";

export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

/**
hasPermission(
  "Manager",
  "manage_users"
);
returns false because "Manager" role does not have "manage_users" permission.

hasPermission(
  "Admin",
  "manage_users"
);
returns true because "Admin" role has "manage_users" permission.
 */
