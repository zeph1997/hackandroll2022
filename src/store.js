// Tutorial: https://react-redux.js.org/tutorials/quick-start
import { configureStore } from "@reduxjs/toolkit";

// Import Slices
import userReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
