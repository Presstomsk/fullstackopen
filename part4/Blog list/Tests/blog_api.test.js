const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../Models/blog')
const User = require('../Models/user')
const blogs = require('./blogs')
const bcrypt = require('bcryptjs')
const listHelper = require('../Utils/list_helper')

describe('blog api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Roman', passwordHash })
    await user.save()
    await Blog.deleteMany({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  },30000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Canonical string reduction')
  })

  test('test that verifies that the unique identifier property of the blog posts is named id', async () => {
    const blogs = await listHelper.blogsInDb()
    expect(blogs[0].id).toBeDefined();
  })

  test('a valid blog can be added', async () => {
    const users = await listHelper.usersInDb()
    const userId = users[0].id

    const newBlog = {
      title: "Test_1",
      author: "root",
      url: "test@google.com",
      likes: 10,
      user: userId
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await listHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length + 1)
    const contents = blogsAtEnd.map(n => n.author)
    expect(contents).toContain('root')
  })

  test('test that verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const users = await listHelper.usersInDb()
    const userId = users[0].id

    const newBlog = {
      title: "Test_2",
      author: "Roman Permyakov",
      url: "test@google.com",
      user: userId
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await listHelper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Test_2')
    expect(addedBlog.likes).toBe(0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "Roman Permyakov",
      url: "test@google.com",
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await listHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "Test_3",
      author: "Roman Permyakov",
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await listHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await listHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogs.length - 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('updated the number of likes for a blog post', async () => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 500

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await listHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogs.length)
    const blog = blogsAtEnd.find(r => r.id === blogToUpdate.id)
    expect(blog.likes).not.toContain(500)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})