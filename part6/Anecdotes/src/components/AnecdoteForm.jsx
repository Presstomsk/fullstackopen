import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addedNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()   

    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value    
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(addAnecdote(newAnecdote))
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