import axios from "axios";

const url = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const newAnecdote = async (anecdote) => {
  const response = await axios.post(url, anecdote);
  return response.data;
};

export const updateAnecdote = async (anecdote) => {
  console.log(`${url}/${anecdote.id}`);
  const response = await axios.put(`${url}/${anecdote.id}`, anecdote);
  return response.data;
};

export const deleteAnecdote = async (anecdoteId) => {
  console.log(`${url}/${anecdoteId}`);
  const response = await axios.delete(`${url}/${anecdoteId}`);
  return response.data;
};
