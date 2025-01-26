import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../../../utils/storage";

export const visitorSlice = createSlice({
  name: "visitor",
  initialState: {
    user: getFromLocalStorage('visitorData') || null,
    token: getFromLocalStorage('visitorToken') || null,
  },
  reducers: {
    setVisitor: (state, action) => {
      state.user = action?.payload?.user;
      state.token = action?.payload?.token;
      saveToLocalStorage('visitorData', action.payload.user)
      saveToLocalStorage('visitorToken', action.payload.token)
    },
    clearVisitor: (state) => {
      state.user = null;
      state.token = null;
      removeFromLocalStorage('visitorData');
      removeFromLocalStorage('visitorToken');
    },
  },
});

export const { setVisitor, clearVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
