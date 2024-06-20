import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "@/redux/actions/PostActions";

interface AddPostState {
  posts: string[];
  loading: boolean;
  error: string | any | null;
}

const initialState: AddPostState = {
  posts: [],
  loading: false,
  error: null,
};

const AddPostReducer = createSlice({
  name: "addPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.posts = [];
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default AddPostReducer.reducer;
export const {} = AddPostReducer.actions;
