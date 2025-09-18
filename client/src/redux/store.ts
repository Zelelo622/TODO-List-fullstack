import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import todosReducer from "./todosSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todosReducer
    // [todosApi.reducerPath]: todosApi.reducer
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(todosApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
