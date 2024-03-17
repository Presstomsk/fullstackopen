import PropTypes from "prop-types";

const User = ({ user, blogs }) => {
  if (!user) {
    return null;
  }

  const userBlogs = blogs.filter((blog) => blog.author === user.username);

  return (
    <div>
      <h2>{user.username}</h2>
      <strong>Added blogs</strong>
      <br />
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.content}</li>
        ))}
      </ul>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array,
};

export default User;
