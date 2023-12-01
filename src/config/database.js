require('dotenv').config()
const mysql = require('mysql2/promise')
const admin = require('firebase-admin');
const serviceAccount = require('./ttcs-7bc51-firebase-adminsdk-cl6hh-57512c5044.json'); // Đường dẫn đến tệp serviceAccountKey.json của dự án Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ttcs-7bc51-default-rtdb.firebaseio.com/' // URL cơ sở dữ liệu Firebase của bạn
});

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports= connection