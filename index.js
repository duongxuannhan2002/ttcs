import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from './routes/api.js'
import dotenv from "dotenv"

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server runing on port : ${process.env.PORT} `);
});

app.use('/', apiRouter)
  

export default app;