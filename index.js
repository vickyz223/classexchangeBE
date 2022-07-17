require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')

const classRouter = require('./controllers/classes')
const exchangeRouter = require('./controllers/exchanges')
const usersRouter = require('./controllers/users')

const cors = require('cors')
const loginRouter = require("./controllers/login")

const app = express(); 

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)
const mongoUrl = `mongodb+srv://vzhong2025:${process.env.PEPEPOPO}@cluster0.kcmgv.mongodb.net/classexchange?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use('/api/classes', classRouter)
app.use('/api/exchanges', exchangeRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const unknownEndpoint = (request, response) => {
  console.log("brungus")
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(middleware.errorHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})