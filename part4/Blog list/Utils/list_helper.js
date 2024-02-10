const enumerable = require('linq')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sumLikes = enumerable.from(blogs).select(blog => blog.likes).sum(likes => likes);

  return sumLikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxValue = Math.max(...likes)
  const favBlog = blogs.find(blog => blog.likes === maxValue)

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const blogGroups = enumerable.from(blogs).groupBy(blog => blog.author).select(group => ({ key:group.key(),value:group.toArray() })).toArray()
  const blogCounts = Math.max(...blogGroups.map(group => group.value.length))
  const blogAuthor = blogGroups.find(group => group.value.length === blogCounts).key

  return {
    author: blogAuthor,
    blogs: blogCounts
  }
}

const mostLikes = (blogs) => {
  const blogGroups = enumerable.from(blogs).select(blog => ({ Author:blog.author,Likes:blog.likes }))
    .groupBy(blog => blog.Author).select(group => ({ key:group.key(),value:group.toArray() })).toArray()

  const getSumLikes = (blogs) => enumerable.from(blogs).select(blog => blog.Likes).sum(likes => likes)

  const sumLikes = Math.max(...blogGroups.map(group => getSumLikes(group.value)))
  const blogAuthor = blogGroups.find(group => getSumLikes(group.value) === sumLikes).key

  return {
    author: blogAuthor,
    likes: sumLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}