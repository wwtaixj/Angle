export enum Sql {
  SELECT_API_PERMISSIONS_FROM_USERNAME = `SELECT api_permissions.api_name, api_permissions.api_type
  FROM users
  JOIN roles ON users.role_id = roles.id
  JOIN roles_relation_api_permissions ON roles.id = roles_relation_api_permissions.role_id
  JOIN api_permissions ON roles_relation_api_permissions.api_permission_id = api_permissions.id
  WHERE users.username = ?`,
  INSERT_LOCATION = 'INSERT INTO location (longitude, latitude, username, login_time ) VALUES (?, ?, ?, ?)',
  SELECT_USER_FROM_USERNAME = 'SELECT id, password, phone, avatar_url, age, tag, gender, email FROM users WHERE username = ?',
  DELETE_USER_FROM_ID = 'delete from users where id = ? , username = ? ',
  INSERT_USER = 'INSERT INTO users (username, password, avatar_url, gender, tag, phone, age, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
}

export default Sql;
