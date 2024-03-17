import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useState } from "react";

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
          username: <input onChange={changeLoginHandle} />
        </div>
        <div>
          password: <input type="password" onChange={changePasswordHandle} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
