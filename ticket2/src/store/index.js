import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import visitorSlice from "./slices/visitorSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        visitor: visitorSlice
    }
});

export default store;