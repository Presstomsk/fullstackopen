const listHelper = require('../Utils/list_helper')
const blogs = require('./blogs')

describe('favorite blog', () => {
  const favouriteBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }

  test('when list has some blogs, equals blogs has the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favouriteBlog)
  })
})
