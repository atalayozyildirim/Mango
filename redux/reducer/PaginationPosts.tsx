import { createSlice } from "@reduxjs/toolkit";
import { GetPostsWithPagination } from "../actions/PostActions";

interface Post {
  posts: any;
  loading: boolean;
  error: any;
}
const initialState: Post = {
  posts: [],
  loading: false,
  error: null,
};

const PaginationPosts = createSlice({
  name: "paginationPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPostsWithPagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetPostsWithPagination.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(GetPostsWithPagination.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {} = PaginationPosts.actions;
export default PaginationPosts.reducer;
