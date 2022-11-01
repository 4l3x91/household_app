import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: "system",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export const { set } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

export const selectTheme = (state: AppState) => state.themeState;
