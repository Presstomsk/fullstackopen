import { Routes, Route, useMatch } from "react-router-dom"
import PropTypes from 'prop-types'
import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'
import About from "./About"
import Anecdote from "./Anecdote"

const AllRoutes = ({anecdotes, addAnecdoteHandle, setNotificationHandle}) => {
    const match = useMatch('/anecdotes/:id')
    const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

    return(
        <Routes>
            <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
            <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
            <Route path='/create' element={<AnecdoteForm anecdotes={anecdotes} addAnecdoteHandle={addAnecdoteHandle} setNotificationHandle={setNotificationHandle}/>} />
            <Route path='/about' element={<About />} />    
        </Routes>
    )
}

AllRoutes.propTypes = {
    anecdotes: PropTypes.array,
    addAnecdoteHandle: PropTypes.func,
    setNotificationHandle: PropTypes.func
}

export default AllRoutes