import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Users = ({ users, blogs }) => {
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>
                {blogs.filter((blog) => blog.author === user.username).length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  blogs: PropTypes.array,
};

export default Users;
