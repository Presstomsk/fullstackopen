const blogsRouter = require('express').Router()
const Blog = require('../Models/blog')
const User = require('../Models/user')

blogsRouter.get('/',  async (request, response) => {
  const notes = await Blog.find({}).populate('user')
  response.json(notes)
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

  if (body.user === undefined) {
    return response.status(400).json({ error: 'userId missing' })
  }

  const user = await User.findById(body.user)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter