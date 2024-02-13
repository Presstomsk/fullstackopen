const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('login api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Roman', passwordHash })
    await user.save()
  })

  test('correct login', async () => {
    username = 'root'

    const response = await api
      .post('/api/login')
      .send({ username: username, password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const user = await User.findOne({ username })
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    expect(response.body.username).toBe(username);

    const token = jwt.sign(userForToken, process.env.SECRET)
    expect(response.body.token).toBe(token);
  })

  test('login is not correct', async () => {
    username = 'root'

    const response = await api
      .post('/api/login')
      .send({ username: username, password: 'secret' })
      .expect(401)

    expect(response.body.error).toContain('invalid username or password')
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})