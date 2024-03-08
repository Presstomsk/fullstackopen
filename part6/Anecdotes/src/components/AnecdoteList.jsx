import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote, sortByDescendingVotes } from '../reducers/anecdoteReducer'
import { resetNotification, votedNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {        
        if (filter === '') {
            return anecdotes
        }

        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id) => {    
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)    
        dispatch(updateAnecdote(anecdote))
        dispatch(votedNotification(anecdote.content))        
        setTimeout(() => {
            dispatch(resetNotification())            
          }, 5000)  
    } 

    return (
        <>
            { sortByDescendingVotes(anecdotes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            ) }    
        </>    
    )
}

export default AnecdoteList 