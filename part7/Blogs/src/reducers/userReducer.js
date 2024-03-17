import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const loginUser = (login, password) => {
  return async (dispatch) => {
    const users = await getUsers();
    const user = users.find(
      (user) => user.login === login && user.password === password,
    );
    dispatch(setUser(user ? user : null));
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
