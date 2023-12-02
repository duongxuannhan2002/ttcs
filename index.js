import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import mysql from 'mysql2';

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối:', err);
    throw err;
  }
  console.log('Kết nối thành công đến MySQL!');
});
    app.listen(process.env.PORT, (req, res) => {
      console.log(`Server runing on port : ${process.env.PORT} `);
    });
  

export default app;