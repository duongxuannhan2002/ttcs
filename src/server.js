require('dotenv').config()
const express = require('express')
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const APIroutes = require('./routes/api')

const app = express()
const port = process.env.port || 8888
const hostname = process.env.HOST_NAME

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

configViewEngine(app)

app.use('/', webRoutes)
app.use('/api',APIroutes)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})