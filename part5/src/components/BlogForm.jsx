import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, createNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: title,
        author: author,
        url: url
      }

      await createBlog(blog)

      setTitle('')
      setAuthor('')
      setUrl('')

      createNotification({ message: `A new blog ${blog.title} by ${blog.author} added`, isError: false })
    } catch (exception) {
      createNotification({ message: 'Error create blog', isError: true })
    }
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
            title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={event => setTitle(event.target.value)}
            placeholder='write title here'
          />
        </div>
        < div>
            author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={event => setAuthor(event.target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
            url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={event => setUrl(event.target.value)}
            placeholder='write url here'
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default BlogForm
