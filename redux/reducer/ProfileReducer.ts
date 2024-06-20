import { createSlice } from "@reduxjs/toolkit";
import { createProfile } from "../actions/ProfileAction";

interface ProfileState {
  data: any;
  loading: boolean;
  error: string | any | null;
}

const initialState: ProfileState = {
  data: [],
  loading: false,
  error: null,
};

const ProfileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProfile.pendig, (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default ProfileReducer.reducer;
export const {} = ProfileReducer.actions;
