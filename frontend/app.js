// app.js
const express = require('express')
const cors = require('cors')
const gamesRouter = require('./routes/games')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', gamesRouter)
