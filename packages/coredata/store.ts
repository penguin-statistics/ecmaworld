import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { penguinV3Api } from "./api/penguinV3Api";
import { preferenceReducer } from "./preferences/index";

export const store = configureStore({
  reducer: {
    preference: preferenceReducer,
    [penguinV3Api.reducerPath]: penguinV3Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(penguinV3Api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
