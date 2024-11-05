import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../../../utils/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getFromLocalStorage('authData') || {},
    token: getFromLocalStorage('authToken') || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action?.payload?.user;
      state.token = action?.payload?.token;
      saveToLocalStorage('authData', action.payload.user)
      saveToLocalStorage('authToken', action.payload.token)
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      removeFromLocalStorage('authData');
      removeFromLocalStorage('authToken');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
