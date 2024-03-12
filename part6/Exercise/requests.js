import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => (await axios.get(baseUrl)).data 

export const createAnecdote = async newAnecdote => (await axios.post(baseUrl, newAnecdote)).data

export const updateAnecdote = async updatedAnecdote => (await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)).data