const listHelper = require('../Utils/list_helper')
const blogs = require('./blogs')

describe('most likes', () => {
  const mostLikes = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }

  test('when list has some blogs, equals authors, whose blog posts have the largest amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikes)
  })
})