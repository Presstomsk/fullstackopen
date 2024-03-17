import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlogById, vote } from "../reducers/blogsReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const removeBlogHandle = (blogId) => {
    dispatch(deleteBlogById(blogId));
  };

  const voteBlogHandle = (blog) => {
    dispatch(vote({ ...blog, votes: blog.votes + 1 }));
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

export default BlogList;
