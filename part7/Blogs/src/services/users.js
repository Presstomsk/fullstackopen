import axios from "axios";

const url = "http://localhost:3001/users";

export const getUsers = async () => {
  const response = await axios.get(url);
  return response.data;
};
