import { createSlice } from "@reduxjs/toolkit";
import {
  getAnecdotes,
  newAnecdote,
  deleteAnecdote,
  updateAnecdote,
} from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    initializeAnecdotes(state, action) {
      return action.payload;
    },
    removeAnecdote(state, action) {
      return state.filter((anecdote) => anecdote.id !== action.payload.id);
    },
    voteAnecdote(state, action) {
      return state
        .filter((anecdote) => anecdote.id !== action.payload.id)
        .concat(action.payload);
    },
  },
});

export const getAnecdotesFromDb = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(initializeAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const addedAnecdote = await newAnecdote(anecdote);
    dispatch(addAnecdote(addedAnecdote));
  };
};

export const deleteAnecdoteById = (anecdoteId) => {
  return async (dispatch) => {
    const deletedAnecdote = await deleteAnecdote(anecdoteId);
    dispatch(removeAnecdote(deletedAnecdote));
  };
};

export const updateAnectote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateAnecdote(anecdote);
    dispatch(voteAnecdote(updatedAnecdote));
  };
};

export const {
  addAnecdote,
  initializeAnecdotes,
  removeAnecdote,
  voteAnecdote,
} = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
