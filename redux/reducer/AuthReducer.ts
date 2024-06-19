import { createSlice } from "@reduxjs/toolkit";
import { loginProcsess } from "../actions/AuthActions";

interface AuthState {
  user: any;
  token: string | any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | any;
}

interface LoginPayload {
  user: any;
  idToken: string;
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
  reducers: {
    user: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginProcsess.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginProcsess.fulfilled, (state, action) => {
        const payload = action.payload as unknown as LoginPayload;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.idToken;
      })
      .addCase(loginProcsess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthReducer.reducer;

export const {} = AuthReducer.actions;
