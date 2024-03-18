import PropTypes from "prop-types";
import { List, ListItem, Paper } from "@mui/material";

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
      <List>
        {userBlogs.map((blog) => (
          <ListItem component={Paper} key={blog.id}>
            {blog.content}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array,
};

export default User;
