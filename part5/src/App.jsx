import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(async() => {
    const blogs = await blogService.getAll()
    setBlogs( blogs )   
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleAddBlog = async(event) => {
    event.preventDefault()
    
    const obj = {
      title: title,
      author: author,
      url: url
    }

    try{
      const response = await blogService.create(obj)      
      const updatedBlog = [...blogs, {
        title: response.title,
        author: response.author,
        url: response.url,
        likes: response.likes
      }]      
      setBlogs(updatedBlog);
      notificate(`A new blog ${response.title} by ${response.author} added`, false)     
    }
    catch (exception)
    {
      notificate('Error create blog', true)      
    }  
  }

  const notificate = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => { 
      setMessage(null)
      setIsError(false) 
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)     
      setUsername('')
      setPassword('')
      notificate(`${user.name} logged in`, false)     
    } catch (exception) {
      notificate('Wrong credentials', true)      
    }
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        type="text"
        value={username}
        name="Username"          
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input 
        type="text"
        value={title}
        name="Title"          
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  const notification = () => <Notification message={message} isError={isError}/>

  if (user === null) {
     return (
      <div>
        {notification()}
        <h2>Log in to application</h2>

        {loginForm()}
      </div>
    )
  }

  return ( <div>
      <h2>Blogs</h2>
        {notification()}     
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <h2>Create new</h2>
        {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App