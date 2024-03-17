import axios from "axios";

const url = "http://localhost:3001/blogs";

export const getBlogs = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const newBlog = async (blog) => {
  const response = await axios.post(url, blog);
  return response.data;
};

export const updateBlog = async (blog) => {
  const response = await axios.put(`${url}/${blog.id}`, blog);
  return response.data;
};

export const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${url}/${blogId}`);
  return response.data;
};
