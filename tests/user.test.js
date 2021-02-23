const app = require('../src/app')
const request = require('supertest')
const User = require('../src/models/User')
const { userOne, userOneId, userTwoId,userThreeId, setupDatabase }  = require('./fixtures/db')

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

test('Should get users', async () => {
     await request(app).get('/users')
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send()
                        .expect(200)
})

test('Should not get users for unauthenticated user', async () => {
    await request(app).get('/users')
                    .send()
                    .expect(401)
})

test('Should update user with valid data', async () => {
    await request(app).patch(`/users/${userOneId}`)
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send({
                            name: 'test'
                        })
                        .expect(200)

    const user = await User.find({ _id: userOneId })
    expect(user.password).not.toBeNull()
                        
})

test('Should not update a valid data', async () => {
    await request(app).patch(`/users/${userOneId}`)
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send({
                            address: "Fianara city"
                        })
                        .expect(400)
})

test('Should not update for unauthenticated user', async () => {
    await request(app).patch(`/users/${userOneId}`)
                        .send({
                            name: 'Jean Pierre'
                        })
                        .expect(401)
})

test('Should not delete for unauthenticated user', async () => {
    await request(app).delete(`/users/${userOneId}`)
                        .send()
                        .expect(401)
})

test('Should not delete non-existing user', async () => {
    await request(app).delete(`/users/${userTwoId}`)
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send()
                        .expect(404)
})

test('Should delete existing user', async () => {
    await request(app).delete(`/users/${userThreeId}`)
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send()
                        .expect(200)
})