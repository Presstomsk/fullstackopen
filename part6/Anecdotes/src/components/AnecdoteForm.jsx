import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()   

    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value    
        event.target.anecdote.value = ''        
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you added ${anecdote}`, 5))
      }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote'/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm