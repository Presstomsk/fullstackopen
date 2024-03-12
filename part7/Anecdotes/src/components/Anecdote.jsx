import PropTypes from 'prop-types'

const Anecdote = ({anecdote}) => {
    return(
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>

            has {anecdote.votes} votes
            <br/>
            for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.object
}

export default Anecdote