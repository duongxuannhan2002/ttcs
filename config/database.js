import mysql from 'mysql2';
import dotenv from "dotenv"
dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  // connection.connect((err) => {
  //   if (err) {
  //     console.error('Lỗi kết nối:', err);
  //     throw err;
  //   }
  //   console.log('Kết nối thành công đến MySQL!');
  // });
export default connection;
