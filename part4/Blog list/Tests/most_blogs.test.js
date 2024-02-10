const listHelper = require('../Utils/list_helper')
const blogs = require('./blogs')

describe('most blogs', () => {
  const mostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }

  test('when list has some blogs, equals authors who has the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })
})