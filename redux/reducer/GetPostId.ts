import { GetPostById as GetPostByIdAction } from "./../actions/PostActions";
import { createSlice } from "@reduxjs/toolkit";

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

const GetPostById = createSlice({
  name: "GetPostById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPostByIdAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetPostByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(GetPostByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {} = GetPostById.actions;
export default GetPostById.reducer;
