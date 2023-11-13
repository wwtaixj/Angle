export enum Sql {
  ROLES_JOIN_API_PERMISSIONS = `SELECT api_permissions.api_name, api_permissions.api_type
  FROM users
  JOIN roles ON users.role_id = roles.id
  JOIN roles_relation_api_permissions ON roles.id = roles_relation_api_permissions.role_id
  JOIN api_permissions ON roles_relation_api_permissions.api_permission_id = api_permissions.id
  WHERE users.username = ?`,
}

export default Sql;
