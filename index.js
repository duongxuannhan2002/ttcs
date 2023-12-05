import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from './routes/api.js'
import dotenv from "dotenv"
import webRouter from './routes/web.js'
import configViewEngine from "./config/viewEngine.js";
import {
    postCreateBook,
} from './controllers/homeController.js'

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());
configViewEngine(app)

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server runing on port : ${process.env.PORT} `);
});
process.on('warning', e => console.warn(e.stack));
app.use('/api/v1', apiRouter)
app.use('/admin', webRouter)
app.post('/create-book', postCreateBook)

export default app;
