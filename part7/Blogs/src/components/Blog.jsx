import PropTypes from "prop-types";
import Comments from "./Comments";

const Blog = ({ blog }) => {
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.content} by {blog.author}
      </h2>
      has {blog.votes} votes
      <br />
      for more info see <a href={blog.info}>{blog.info}</a>
      <br />
      <Comments blog={blog} />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
