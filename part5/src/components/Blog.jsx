import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, handleUpdateBlog, handleRemoveBlog, createNotification }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenMyBlog = { display: blog.user !== undefined && (blog.user.id === currentUser.id || blog.user === currentUser.id) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const updateBlog = async() => {
    try {
      const updatedBlog = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user,
        likes: likes + 1
      }

      await handleUpdateBlog(updatedBlog)
      setLikes(likes + 1)
      createNotification({ message: `A blog ${blog.title} by ${blog.author} updated`, isError: false })
    } catch (exception) {
      createNotification({ message: 'Error update blog', isError: true })
    }
  }

  const removeBlog = async() => {
    try {
      if (window.confirm('Do you really want to remove blog?')) {
        await handleRemoveBlog(blog)
        createNotification({ message: `A blog ${blog.title} by ${blog.author} removed`, isError: false })
      }
    } catch (exception) {
      createNotification({ message: 'Error remove blog', isError: true })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>{likes}<button onClick={updateBlog}>like</button></div>
        <div>{blog.user !== undefined ? blog.user.name !== undefined ? blog.user.name : currentUser.name : null}</div>
        <div style={showWhenMyBlog}><button onClick={removeBlog}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default Blog