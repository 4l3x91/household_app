import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { User } from "../user/userModel";
import { Profile } from "./profileModel";
import { initialState } from "./profileState";

export const createProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/setProfile", async (profile, thunkAPI) => {
  try {
    await addDoc(collection(db, "profiles"), profile);
    return profile;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Error setting profile");
  }
});

export const findUsersProfilesThunk = createAsyncThunk<Profile[], User, { rejectValue: string }>(
  "profile/findUsersProfile",
  async (user, thunkAPI) => {
    try {
      const collectionRef = collection(db, "profiles");
      const q = query(collectionRef, where("userId", "==", user.id));
      const documentsFromQuery = await getDocs(q);

      if (!documentsFromQuery.empty) {
        const userProfiles: Profile[] = [];
        documentsFromQuery.docs.forEach((doc) => userProfiles.push(doc.data() as Profile));
        return userProfiles;
      } else {
        return thunkAPI.rejectWithValue("cannot find any profiles for this user");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("cant find any profiles");
    }
  }
);

export const deleteProfileThunk = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/deleteProfile", async (profile, thunkAPI) => {
  try {
    const collectionRef = collection(db, "profiles");

    const q = query(collectionRef, where("id", "==", profile.id));

    const result = await getDocs(q);

    if (!result.empty) {
      const profileToDeleteId = result.docs[0].id;
      await deleteDoc(doc(db, "profiles", profileToDeleteId));
      return profile;
    } else {
      return thunkAPI.rejectWithValue("cant find profile to delete");
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("cant find profile to delete");
  }
});

export const setProfilesThunk = createAsyncThunk<Profile[], Profile, { rejectValue: string }>(
  "profile/setProfiles",

  async (profile, thunkAPI) => {
    try {
      const collectionRef = collection(db, "profiles");
      const q = query(collectionRef, where("householdId", "==", profile.householdId));
      const documentsFromQuery = await getDocs(q);

      if (!documentsFromQuery.empty) {
        const profiles: Profile[] = [];
        documentsFromQuery.docs.forEach((doc) => profiles.push(doc.data() as Profile));
        return profiles;
      } else {
        return thunkAPI.rejectWithValue("cannot find any profiles with that household id");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("oscar s'ger att den h'r 'r helt fuckad");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState(state) {
      state.profiles = [];
    },
  },

  extraReducers: (builder) => {
    //CREATE PROFILE
    builder.addCase(createProfile.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.pending = false;

      state.profiles.push(action.payload);
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });

    //FIND PROFILES
    builder.addCase(findUsersProfilesThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(findUsersProfilesThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.profiles = action.payload;
    });
    builder.addCase(findUsersProfilesThunk.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });

    //DELETE PROFILE
    builder.addCase(deleteProfileThunk.pending, (state) => {
      state.pending = true;
      console.log("pending");
    });
    builder.addCase(deleteProfileThunk.fulfilled, (state, action) => {
      state.pending = false;
      console.log("fullfilled");
      state.profiles = state.profiles.filter((profile) => profile.id !== action.payload.id);
    });
    builder.addCase(deleteProfileThunk.rejected, (state, action) => {
      state.pending = false;
      console.log("rejected");
      state.error = action.payload || "Unknown error";
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfileState } = profileSlice.actions;
