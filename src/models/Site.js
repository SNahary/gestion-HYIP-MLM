const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true,
        minLength: 50
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
    },
    contrat:{
        type: String,
        trim: true,
        required: true
    }
})

const Site = mongoose.model('Site', siteSchema)

module.exports = Site