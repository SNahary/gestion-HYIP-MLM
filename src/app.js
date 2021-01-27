require('./db/db')
const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.listen(() => {
    console.log('The server is running on ' + port)
})

