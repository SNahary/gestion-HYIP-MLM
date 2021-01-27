const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/pub-hyip',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})