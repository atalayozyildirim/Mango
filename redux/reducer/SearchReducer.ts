import { createSlice } from "@reduxjs/toolkit";
import { search } from "@/redux/actions/SearchActions";

interface SearchState {
  search: any | null;
  loading: boolean;
  error: any | null;
}

const initialState: SearchState = {
  search: null,
  loading: false,
  error: null,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default searchSlice.reducer;
export const {} = searchSlice.actions;
