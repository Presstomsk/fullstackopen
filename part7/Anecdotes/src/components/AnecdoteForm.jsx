import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createNewAnecdote } from "../reducers/anecdotesReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const handleSubmit = (event) => {
    event.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    dispatch(setNotification(`A new anecdote ${content.value} created!`));
    setTimeout(() => {
      dispatch(setNotification(null));
      resetFields();
    }, 5000);
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetFields();
  };

  const resetFields = () => {
    content.onChange();
    author.onChange();
    info.onChange();
  };

  const addNew = (anecdote) => {
    dispatch(createNewAnecdote(anecdote));
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
