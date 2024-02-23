import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const func = async() => {
      const blogs = await blogService.getAll()
      blogs.sort(sortFunc)
      setBlogs( blogs )
    }
    func()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortFunc = (a, b) => {
    return b.likes - a.likes
  }

  const handleLogin = async (user) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleAddBlog = async(blog) => {
    const response = await blogService.create(blog)
    const updatedBlogs = [...blogs, {
      id: response.id,
      title: response.title,
      author: response.author,
      url: response.url,
      likes: response.likes,
      user: response.user
    }]
    updatedBlogs.sort(sortFunc)
    setBlogs(updatedBlogs)
    blogFormRef.current.toggleVisibility()
  }

  const handleUpdateBlog = async(updatedBlog) => {
    const response = await blogService.update(updatedBlog)
    let blog = blogs.find(blog => blog.id === response.id)
    blog.likes = response.likes
    blogs.sort(sortFunc)
    setBlogs(blogs)
  }

  const handleRemoveBlog = async(blogToDelete) => {
    const response = await blogService.remove(blogToDelete)

    if (response === 204) {
      const filteredBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id)
      filteredBlogs.sort(sortFunc)
      setBlogs(filteredBlogs)
    } else {
      throw 'Error remove blog'
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const notificate = (notification) => {
    setMessage(notification.message)
    setIsError(notification.isError)
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} isError={isError}/>

        <LoginForm handleLogin={handleLogin} createNotification={notificate}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} isError={isError}/>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel = 'new note' ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog} createNotification={notificate}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
          createNotification={notificate}
        />
      )}
    </div>
  )
}

export default App