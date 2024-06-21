import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import PostReducer from "./reducer/PostReducer";
import AddPostReducer from "./reducer/AddPostReducer";
import SearchReducer from "./reducer/SearchReducer";
import PaginationPosts from "./reducer/PaginationPosts";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    addPost: AddPostReducer,
    paginationPosts: PaginationPosts,
    // search: SearchReducer,
  },
});

export default store;
