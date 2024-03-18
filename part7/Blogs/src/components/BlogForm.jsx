import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createNewBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
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
      comments: [],
      votes: 0,
    });
    navigate("/");
    dispatch(setNotification(`A new blog ${content.value} created!`));
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

  const addNew = (blog) => {
    dispatch(createNewBlog(blog));
  };

  return (
    <div>
      <h2>create a new blog</h2>
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

export default BlogForm;
