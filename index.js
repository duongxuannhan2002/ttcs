import express from "express";
import cors from "cors";
import apiRouter from './routes/api.js'
import dotenv from "dotenv"
import webRouter from './routes/web.js'
import configViewEngine from "./config/viewEngine.js";

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app)

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server runing on port : ${process.env.PORT} `);
});
process.on('warning', e => console.warn(e.stack));
app.use('/api/v1', apiRouter)
app.use('/admin', webRouter)

export default app;
