import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/AuthActions";

interface AuthState {
  user: any;
  token: string | any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | any;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.idToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthReducer.reducer;

export const {} = AuthReducer.actions;
