import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload;
    },
  },
});

export const getUsersFromDb = () => {
  return async (dispatch) => {
    const users = await getUsers();
    dispatch(initializeUsers(users));
  };
};

export const { initializeUsers } = usersSlice.actions;

export default usersSlice.reducer;
