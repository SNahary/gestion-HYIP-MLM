require('./db/db')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const siteRouter = require('./routes/Site')
const userRouter = require('./routes/User')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(siteRouter)
app.use(userRouter)

module.exports = app