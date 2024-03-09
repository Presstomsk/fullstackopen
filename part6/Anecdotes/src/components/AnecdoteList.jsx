import { useSelector, useDispatch } from 'react-redux'
import { update, sortByDescendingVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
        dispatch(update(anecdote))        
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))  
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