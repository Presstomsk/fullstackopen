import { Routes, Route, useMatch } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import About from "./About";
import Anecdote from "./Anecdote";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const match = useMatch("/anecdotes/:id");
  const anecdotes = useSelector((state) => state.anecdotes);
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <Routes>
      <Route path="/" element={<AnecdoteList />} />
      <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      <Route path="/create" element={<AnecdoteForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AllRoutes;
