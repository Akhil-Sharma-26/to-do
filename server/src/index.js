import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connect from './db/dbConnect.js'
import { json } from 'body-parser'

connect()
app.use(cors({
    origin: '*',
    credentials: true
}))
dotenv.config({
    path: './.env'
})
app.cookieParser({

})
app.use(json()) // body parser
app.use(express.static('public'))
const app = express()
app.listen(process.env.PORT || 7231, () => console.log('Server started at: ', process.env.PORT))


