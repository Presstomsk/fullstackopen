import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Button } from "@mui/material";

const Menu = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create new
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          {user ? (
            <em>{user.username} logged in</em>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
