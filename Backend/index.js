const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const connectDb = require('./db/connectDb')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/authRouter')
const recipeRouter = require('./router/recipeRouter')

//Middlewares
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//path to routes
app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)

app.listen(PORT, (err) =>{
    err ? console.log(`Error in running Server in Port ${PORT} - ${err}`) : console.log(`Server is running in Port ${PORT}`)
    connectDb()
})