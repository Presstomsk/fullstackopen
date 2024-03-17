import { Routes, Route, useMatch } from "react-router-dom";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import About from "./About";
import Blog from "./Blog";
import LoginForm from "./LoginForm";
import Users from "./Users";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const match = useMatch("/blogs/:id");
  const blogs = useSelector((state) => state.blogs);
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      <Route path="/create" element={<BlogForm />} />
      <Route path="/users" element={<Users />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AllRoutes;
