import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "@/redux/actions/PostActions";

interface PostState {
  data: string[];
  loading: boolean;
  error: string | any | null;
}

const initialState: PostState = {
  data: [],
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
      state.data = [];
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default postReducer.reducer;
export const {} = postReducer.actions;
