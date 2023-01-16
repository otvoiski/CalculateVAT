import { configureStore } from "@reduxjs/toolkit";
import vatSlice from "./slices/vat.slice";

const store = configureStore({
    reducer: {
        vat: vatSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;