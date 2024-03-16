import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const AnecdoteForm = ({ anecdotes, addAnecdoteHandle, setNotificationHandle }) => {
    const navigate = useNavigate()

    const content = useField('content')
    const author = useField('author')
    const info = useField('info') 
      
    const handleSubmit = (event) => {
        event.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')        
        setNotificationHandle(`A new anecdote ${content.value} created!`)
        setTimeout(() => { 
            setNotificationHandle(null)
            resetFields()
        }, 5000) 
    }    

    const handleReset = (event) => { 
        event.preventDefault()       
        resetFields()
    }
    
    const resetFields = () => {
        content.onChange()
        author.onChange()
        info.onChange()
    }

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        addAnecdoteHandle(anecdotes.concat(anecdote))        
    }

    return (
        <div>
          <h2>create a new anecdote</h2>
          <form>
            <div>
              content
              <input {...content} />
            </div>
            <div>
              author
              <input {...author} />
            </div>
            <div>
              url
              <input {...info} />
            </div>
            <button onClick={handleSubmit}>create</button>
            <button onClick={handleReset}>reset</button>            
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