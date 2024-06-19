import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginProcsess = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {}
);
