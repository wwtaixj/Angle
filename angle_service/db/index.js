import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'angle',
  user: 'root',
  password: '123456',
});

export default pool.promise();
