import path from 'path'
import express from 'express'

const configViewEngine = (app) => {
    app.set('views',path.join('./','views'))
    app.set('view engine','ejs')

    app.use(express.static(path.join('./','public')))
}
export default configViewEngine