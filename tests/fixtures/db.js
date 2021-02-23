const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/User')

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()
const userThreeId = new mongoose.Types.ObjectId()

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

const userThree = {
    _id : userThreeId,
    name: "TestThree",
    email: "test3@test.com",
    password: "testtest",
    tokens:[
        {
            token: jwt.sign({ _id: userThreeId}, process.env.JWT_SECRET)
        }
    ]
}
const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userThree).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwoId,
    userThreeId,
    setupDatabase
}