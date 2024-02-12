import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connect from './db/dbConnect.js'

connect()

const app = express()
app.use(cors({
    origin: '*',
    credentials: true
}))
dotenv.config({
    path: './.env'
})
app.use(cookieParser())
app.use(express.json()) // body parser
app.use(express.static('public'))
app.listen(process.env.PORT || 7231, () => console.log('Server started at: ', process.env.PORT))


