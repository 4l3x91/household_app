import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as StateUser } from "./userModel";
import { initialState } from "./userState";
import { postUser, signInUser } from "./userThunks";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<StateUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    clearErrors(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //createUser cases
    builder.addCase(postUser.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = { id: action.payload.uid, email: action.payload.email };
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error setting user";
    });

    //signIn cases
    builder.addCase(signInUser.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = { id: action.payload.user.uid, email: action.payload.user.email };
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error signing in user";
    });
  },
});

export const { login, logout, clearErrors } = userSlice.actions;
export const userReducer = userSlice.reducer;
