import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import visitorSlice from "./slices/visitorSlice";
import eventCollaboratorSlice from "./slices/eventCollaboratorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    visitor: visitorSlice,
    collaborator: eventCollaboratorSlice,
  },
});
export default store;
