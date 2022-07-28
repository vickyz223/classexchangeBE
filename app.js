const config = require('./utils/config')
const express = require('express')
const app = express(); 
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const classRouter = require('./controllers/classes')
const exchangeRouter = require('./controllers/exchanges')
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login")
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URI)

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/classes', classRouter)
app.use('/api/exchanges', middleware.userExtractor, exchangeRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app