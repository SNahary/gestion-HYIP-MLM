const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    minimumInvest:{
        type: Number,
        required: true
    },
    minimumWithdrawal:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }
})

const Site = mongoose.model('Site', siteSchema)

module.exports = Site