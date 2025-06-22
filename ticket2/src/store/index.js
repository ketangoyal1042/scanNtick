import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import visitorSlice from "./slices/visitorSlice";
import eventCollaboratorSlice from "./slices/eventCollaboratorSlice";
import isLoggedinSlice from "./slices/isLoggedinSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    visitor: visitorSlice,
    collaborator: eventCollaboratorSlice,
    login: isLoggedinSlice,
  },
});
export default store;
