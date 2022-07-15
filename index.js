require("dotenv").config()
const express = require('express'); 
const mongoose = require('mongoose')
const classRouter = require('./controllers/classes')
const exchangeRouter = require('./controllers/exchanges')
const cors = require('cors')

const app = express(); 

app.use(express.json())
app.use(cors())
const mongoUrl = `mongodb+srv://vzhong2025:${process.env.PEPEPOPO}@cluster0.kcmgv.mongodb.net/classexchange?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use('/api/classes', classRouter)
app.use('/api/exchanges', exchangeRouter)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})