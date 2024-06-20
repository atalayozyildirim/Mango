import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import PostReducer from "./reducer/PostReducer";
import AddPostReducer from "./reducer/AddPostReducer";
import SearchReducer from "./reducer/SearchReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    addPost: AddPostReducer,
    // search: SearchReducer,
  },
});

export default store;
