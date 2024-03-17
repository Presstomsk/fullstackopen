import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = () => {
  const user = useSelector((state) => state.user);

  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/create">
        Create new
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
      {user ? (
        <em>{user.username} logged in</em>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Menu;
