import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addedNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()   

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value    
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(addedNotification(anecdote))        
        setTimeout(() => {
            dispatch(resetNotification())            
          }, 5000)
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