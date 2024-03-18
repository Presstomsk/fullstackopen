import PropTypes from "prop-types";
import CommentsForm from "./CommentsForm";
import { List, ListItem, Paper } from "@mui/material";

const Comments = ({ blog }) => {
  const comments = blog.comments;

  if (!comments) {
    return (
      <>
        <h3>Comments</h3>
        <CommentsForm blog={blog} />
      </>
    );
  }

  return (
    <>
      <h3>Comments</h3>
      <CommentsForm blog={blog} />
      <List>
        {comments.map((comment) => (
          <ListItem component={Paper} key={Math.round(Math.random() * 10000)}>
            {comment}
          </ListItem>
        ))}
      </List>
    </>
  );
};

Comments.propTypes = {
  blog: PropTypes.object,
};

export default Comments;
