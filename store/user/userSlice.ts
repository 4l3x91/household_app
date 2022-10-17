import { addDoc, collection } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { User } from "./userModel";
import { initialState } from "./userState";

export const setUser = createAsyncThunk<User, User, { rejectValue: string }>("user/setUser", async (user, thunkAPI) => {
  try {
    await addDoc(collection(db, "users"), { user });
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error setting user");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.pending = false;
      state.user = action.payload;
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error setting user";
    });
  },
});

export const userReducer = userSlice.reducer;
