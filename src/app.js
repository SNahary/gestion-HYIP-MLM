require('./db/db')
const express = require('express')
const siteRouter = require('./routes/Site')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use(siteRouter)

app.listen(() => {
    console.log('Server is running on ' + port)
})

