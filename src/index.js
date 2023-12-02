require('dotenv').config()
const express = require('express')
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const APIroutes = require('./routes/api')

const app = express()
const port = process.env.PORT
const hostname = process.env.HOST_NAME

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

configViewEngine(app)

app.use('/', webRoutes)
app.use('/api',APIroutes)


app.listen(port, (req, res) => {
  console.log(`Server runing on port : ${port} `);
});