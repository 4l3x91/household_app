import { addDoc, collection } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Profile } from "./profileModel";
import { initialState } from "./profileState";

export const setProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/setProfile", async (profile, thunkAPI) => {
  try {
    await addDoc(collection(db, "profiles"), profile);
    return profile;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Error setting profile");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProfile.pending, (state) => {
      state.pending = true;
      console.log("pending");
    });
    builder.addCase(setProfile.fulfilled, (state, action) => {
      state.pending = false;
      console.log("fullfilled");
      state.profiles.push(action.payload);
    });
    builder.addCase(setProfile.rejected, (state, action) => {
      state.pending = false;
      console.log("rejected");
      state.error = action.payload || "Unknown error";
    });
  },
});

export const profileReducer = profileSlice.reducer;
