/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { getUsers } from "../services/users";
import { useState, useEffect } from "react";

const Users = () => {
  const [blogsState, setBlogsState] = useState([]);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    getBlogsStats();
  }, [blogs]);

  const getBlogsStats = async () => {
    const users = await getUsers();
    const usersBlogsStates = [];
    users.forEach((user) => {
      const userBlogs = blogs.filter((blog) => blog.author === user.username);
      const userBlogsState = {
        author: user.username,
        count: userBlogs.length,
        id: Math.round(Math.random() * 10000),
      };
      usersBlogsStates.push(userBlogsState);
    });
    setBlogsState(usersBlogsStates);
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Authors</strong>
            </td>
            <td>
              <strong>Blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {blogsState.map((blogState) => (
            <tr key={blogState.id}>
              <td>{blogState.author}</td>
              <td>{blogState.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
