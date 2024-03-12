import { useState } from "react"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"

const AnecdoteForm = ({ anecdotes, addAnecdoteHandle, setNotificationHandle }) => {
    const navigate = useNavigate()

    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')    
      
    const handleSubmit = (event) => {
        event.preventDefault()
        addNew({
            content,
            author,
            info,
            votes: 0
        })
        navigate('/')        
        setNotificationHandle(`A new anecdote ${content} created!`)
        setTimeout(() => {
            setNotificationHandle(null)
            setContent('')
            setAuthor('')
            setInfo('')
        }, 5000)        
    }

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        addAnecdoteHandle(anecdotes.concat(anecdote))        
    }

    return (
        <div>
          <h2>create a new anecdote</h2>
          <form onSubmit={handleSubmit}>
            <div>
              content
              <input name='content' value={content} onChange={(event) => setContent(event.target.value)} />
            </div>
            <div>
              author
              <input name='author' value={author} onChange={(event) => setAuthor(event.target.value)} />
            </div>
            <div>
              url for more info
              <input name='info' value={info} onChange={(event)=> setInfo(event.target.value)} />
            </div>
            <button>create</button>
          </form>
        </div>
    )
}

AnecdoteForm.propTypes = {
    anecdotes: PropTypes.array,
    addAnecdoteHandle: PropTypes.func,
    setNotificationHandle: PropTypes.func
}

export default AnecdoteForm