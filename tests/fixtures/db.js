const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/User')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id : userOneId,
    name: "TestOne",
    email: "testone@test.com",
    password: "testtest",
    tokens:[
        {
            token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
        }
    ]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOne,
    userOneId,
    setupDatabase
}