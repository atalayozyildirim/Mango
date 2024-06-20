import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "@/redux/actions/PostActions";

interface PostState {
  posts: string[];
  loading: boolean;
  error: string | any | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.posts = [];
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default postReducer.reducer;
export const {} = postReducer.actions;
