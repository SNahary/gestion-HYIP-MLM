const app = require('../src/app')
const request = require('supertest')
const User = require('../src/models/User')
const { userOne, userOneId, setupDatabase }  = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create new user', async () => {
    const response = await request(app).post('/users').send({
        name: "soary",
        email: "soary@gmail.com",
        password: "soarysoary"
    }).expect(201)

    const user = await User.findById(response.body.user._id)

    expect(user).not.toBeNull()

    expect(user.password).not.toBe('soarysoary')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    expect(response.body.token).not.toBeNull()
    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'bolo@gmail.com',
        password: 'bolobolo'
    }).expect(400)
})

