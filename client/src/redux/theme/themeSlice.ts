import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TTheme, IThemeState } from "./types";

const initialTheme = (): TTheme => {
  const saved = localStorage.getItem("theme") as TTheme | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState: IThemeState = {
  value: initialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.value);
    },
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.value = action.payload;
      localStorage.setItem("theme", state.value);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
