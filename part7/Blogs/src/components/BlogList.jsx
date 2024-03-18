import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlogById, updateCurrentBlog } from "../reducers/blogsReducer";

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch();

  const removeBlogHandle = (blogId) => {
    dispatch(deleteBlogById(blogId));
  };

  const voteBlogHandle = (blog) => {
    dispatch(updateCurrentBlog({ ...blog, votes: blog.votes + 1 }));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.content}</Link>
            <button onClick={() => voteBlogHandle(blog)}>Vote</button>
            <button onClick={() => removeBlogHandle(blog.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
};

export default BlogList;
