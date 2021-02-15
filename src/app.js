require('./db/db')
const express = require('express')

const siteRouter = require('./routes/Site')
const userRouter = require('./routes/User')

const app = express()

app.use(express.json())

app.use(siteRouter)
app.use(userRouter)

module.exports = app