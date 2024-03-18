import PropTypes from "prop-types";
import CommentsForm from "./CommentsForm";

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
      <ul>
        {comments.map((comment) => (
          <li key={Math.round(Math.random() * 10000)}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

Comments.propTypes = {
  blog: PropTypes.object,
};

export default Comments;
