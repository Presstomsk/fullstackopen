import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlogById, updateCurrentBlog } from "../reducers/blogsReducer";
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.content}</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => voteBlogHandle(blog)}
                  >
                    Vote
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => removeBlogHandle(blog.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
};

export default BlogList;
