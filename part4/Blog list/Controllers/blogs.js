const blogsRouter = require('express').Router()
const Blog = require('../Models/blog')

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog(body)

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter