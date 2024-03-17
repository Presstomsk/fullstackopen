import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteAnecdoteById,
  updateAnectote,
} from "../reducers/anecdotesReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const removeAnecdoteHandle = (anecdoteId) => {
    dispatch(deleteAnecdoteById(anecdoteId));
  };

  const voteAnecdoteHandle = (anecdote) => {
    dispatch(updateAnectote({ ...anecdote, votes: anecdote.votes + 1 }));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            <button onClick={() => voteAnecdoteHandle(anecdote)}>Vote</button>
            <button onClick={() => removeAnecdoteHandle(anecdote.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
