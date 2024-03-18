import { createSlice } from "@reduxjs/toolkit";
import { getBlogs, updateBlog, deleteBlog, newBlog } from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    initializeBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    changeBlog(state, action) {
      return state
        .filter((blog) => blog.id !== action.payload.id)
        .concat(action.payload);
    },
  },
});

export const getBlogsFromDb = () => {
  return async (dispatch) => {
    const blogs = await getBlogs();
    dispatch(initializeBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await newBlog(blog);
    dispatch(addBlog(addedBlog));
  };
};

export const deleteBlogById = (blogId) => {
  return async (dispatch) => {
    const deletedBlog = await deleteBlog(blogId);
    dispatch(removeBlog(deletedBlog));
  };
};

export const updateCurrentBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await updateBlog(blog);
    dispatch(changeBlog(updatedBlog));
  };
};

export const { addBlog, initializeBlogs, removeBlog, changeBlog } =
  blogsSlice.actions;

export default blogsSlice.reducer;
