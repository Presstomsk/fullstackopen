import { Routes, Route, useMatch } from "react-router-dom";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import About from "./About";
import Blog from "./Blog";
import LoginForm from "./LoginForm";
import Users from "./Users";
import User from "./User";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Routes>
      <Route path="/" element={<BlogList blogs={blogs} />} />
      <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      <Route path="/create" element={<BlogForm />} />
      <Route path="/users" element={<Users users={users} blogs={blogs} />} />
      <Route path="/users/:id" element={<User user={user} blogs={blogs} />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AllRoutes;
