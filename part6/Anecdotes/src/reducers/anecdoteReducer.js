import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',  
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return sortByDescendingVotes(state.concat(action.payload))
    },
    updateAnecdote(state, action) {
      const anecdotes = state.filter(anecdote => anecdote.id !== action.payload.id)
      return sortByDescendingVotes(anecdotes.concat(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    },  
  },
})

export const sortByDescendingVotes = (anecdotes) => [...anecdotes].sort((a,b) => b.votes - a.votes)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))  
  }}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))  
  }}

export const update = anecdote => {
  return async dispatch => {    
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })    
    dispatch(updateAnecdote(updatedAnecdote))  
  }
}

export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer