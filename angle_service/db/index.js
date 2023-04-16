import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'loose.net.cn',
  port: 13307,
  database: 'angle',
  user: 'root',
  password: '123456',
});

export default pool.promise();
