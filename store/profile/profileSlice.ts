import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "./profileModel";
import { initialState } from "./profileState";

const setProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/setProfile", async (profile, thunkAPI) => {
  // Api call to set profile
  try {
    return profile;
  } catch (error) {
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
    });
    builder.addCase(setProfile.fulfilled, (state, action) => {
      state.pending = false;
      state.profile = action.payload;
    });
    builder.addCase(setProfile.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
  },
});

// export const { deposit, withdrawal } = bankSlice.actions;
export const profileReducer = profileSlice.reducer;
