// store/slices/isLoggedinSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const isLoggedinSlice = createSlice({
    name: 'isloggedin',
    initialState: {
        showLoginPopup: false,
    },
    reducers: {
        showLoginPopup: (state) => {
            state.showLoginPopup = true;
        },
        hideLoginPopup: (state) => {
            state.showLoginPopup = false;
        },
    },
});

export const { showLoginPopup, hideLoginPopup } = isLoggedinSlice.actions;
export default isLoggedinSlice.reducer;
