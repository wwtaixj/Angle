export enum Sql {
  SELECT_API_PERMISSIONS_FROM_USERNAME = `SELECT api_permissions.apiName, api_permissions.apiType
  FROM users
  JOIN roles ON users.roleId = roles.id
  JOIN roles_relation_api_permissions ON roles.id = roles_relation_api_permissions.roleId
  JOIN api_permissions ON roles_relation_api_permissions.apiPermissionId = api_permissions.id
  WHERE users.username = ?`,
  INSERT_LOCATION = 'INSERT INTO location (longitude, latitude, username, loginTime ) VALUES (?, ?, ?, ?)',
  SELECT_USER_FROM_USERNAME = 'SELECT id, password, phone, avatarUrl, age, tag, gender, email FROM users WHERE username = ?',
  DELETE_USER_FROM_ID = 'delete from users where id = ? , username = ? ',
  INSERT_USER = 'INSERT INTO users (username, password, avatarUrl, gender, tag, phone, age, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
  EXCLUDE_NAME = 'SELECT id, username, avatarUrl, gender, tag, phone, age, email, status FROM users',
}

export default Sql;
