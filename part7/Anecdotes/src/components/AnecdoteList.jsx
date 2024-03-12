import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {
    return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
            <li key={anecdote.id} >
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
        )}
      </ul>
    </div>
  )
}

AnecdoteList.propTypes = {
    anecdotes: PropTypes.array
}

export default AnecdoteList