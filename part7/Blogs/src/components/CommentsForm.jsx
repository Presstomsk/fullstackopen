import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentBlog } from "../reducers/blogsReducer";

const CommentsForm = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const changeCommentHandle = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateCurrentBlog({ ...blog, comments: blog.comments.concat(comment) }),
    );
    setComment("")
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input value={comment} onChange={changeCommentHandle} />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  );
};

CommentsForm.propTypes = {
  blog: PropTypes.object,
};

export default CommentsForm;
