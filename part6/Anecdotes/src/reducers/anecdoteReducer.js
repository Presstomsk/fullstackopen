import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',  
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return sortByDescendingVotes(state.concat(action.payload))
    },
    updateAnecdote(state, action) {
      const anecdotes = state.filter(anecdote => anecdote.id !== action.payload.id)
      return sortByDescendingVotes(anecdotes.concat({
        ...action.payload,
        votes: action.payload.votes + 1
      }))
    },
    setAnecdotes(state, action) {
      return action.payload
    },  
  },
})

export const sortByDescendingVotes = (anecdotes) => [...anecdotes].sort((a,b) => b.votes - a.votes)

export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer