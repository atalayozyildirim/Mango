import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./reducer/AuthReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;
