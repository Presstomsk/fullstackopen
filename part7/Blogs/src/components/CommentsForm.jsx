import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentBlog } from "../reducers/blogsReducer";
import { TextField, Button } from "@mui/material";

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
    setComment("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="comment"
            value={comment}
            onChange={changeCommentHandle}
          />
        </div>
        <br />
        <div>
          <Button variant="contained" color="primary" type="submit">
            add comment
          </Button>
        </div>
      </form>
    </div>
  );
};

CommentsForm.propTypes = {
  blog: PropTypes.object,
};

export default CommentsForm;
