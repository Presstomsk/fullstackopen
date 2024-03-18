import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLoginHandle = (event) => {
    setLogin(event.target.value);
  };

  const changePasswordHandle = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(login, password));
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" onChange={changeLoginHandle} />
        </div>
        <br />
        <div>
          <TextField
            label="password"
            type="password"
            onChange={changePasswordHandle}
          />
        </div>
        <br />
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
