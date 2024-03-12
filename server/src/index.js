import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connect from './db/dbConnect.js'

connect()

const app = express()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    headers: ["Content-Type"],
}))
dotenv.config({
    path: './.env'
})
app.use(express.json()) // body parser
app.use(express.static('public'))
app.listen(process.env.PORT || 7231, () => console.log('Server started at: ', process.env.PORT))



import userRouter from './routes/user.routes.js'
import BasketRouter from './routes/todoBasket.routes.js'
import todoRouter from './routes/todos.routes.js'
app.use('/api/user',userRouter)
app.use('/api/basket',BasketRouter)
app.use('/api/todo',todoRouter)
