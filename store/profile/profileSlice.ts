import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./profileState";
import { deleteProfile, getAllProfiles, postProfile, updateProfile } from "./profileThunks";

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState(state) {
      state.profiles = [];
    },
    addProfile(state, action) {
      state.profiles.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    //CREATE PROFILE
    builder.addCase(postProfile.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postProfile.fulfilled, (state, action) => {
      state.pending = false;

      state.profiles.push(action.payload);
    });
    builder.addCase(postProfile.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
    //SET ALL RELATED PROFILES
    builder.addCase(getAllProfiles.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getAllProfiles.fulfilled, (state, action) => {
      state.pending = false;
      state.profiles = action.payload;
    });
    builder.addCase(getAllProfiles.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
    //DELETE PROFILE
    builder.addCase(deleteProfile.pending, (state) => {
      state.pending = true;
      console.log("pending");
    });
    builder.addCase(deleteProfile.fulfilled, (state, action) => {
      state.pending = false;
      console.log("fullfilled");
      state.profiles = state.profiles.filter((profile) => profile.id !== action.payload.id);
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      state.pending = false;
      console.log("rejected");
      state.error = action.payload || "Unknown error";
    });
    // UPDATE PROFILE
    builder.addCase(updateProfile.pending, (state) => {
      state.pending = true;
      console.log("pending");
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.pending = false;
      console.log("fullfilled");
      state.profiles.splice(
        state.profiles.findIndex((profile) => profile.id === action.payload.id),
        1,
        action.payload
      );
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.pending = false;
      console.log("rejected");
      state.error = action.payload || "Unknown error";
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfileState, addProfile } = profileSlice.actions;
