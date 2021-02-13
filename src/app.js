require('./db/db')
const express = require('express')

const siteRouter = require('./routes/Site')
const userRouter = require('./routes/User')

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use(siteRouter)
app.use(userRouter)

app.listen(port,() => {
    console.log('Server is running on ' + port)
})

