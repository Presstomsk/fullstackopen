import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  if (blog === undefined || blog === null) {
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
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
