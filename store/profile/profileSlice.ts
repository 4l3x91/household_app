import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { AppState } from "../store";
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

export const setAllProfilesThunk = createAsyncThunk<Profile[], User, { rejectValue: string }>("profile/findUsersProfile", async (user, thunkAPI) => {
  try {
    const profilesRef = collection(db, "profiles");

    const q = query(profilesRef, where("userId", "==", user.id));
    const userProfiles: Profile[] = [];

    const documentsFromQuery = await getDocs(q);

    if (!documentsFromQuery.empty) {
      documentsFromQuery.docs.forEach((doc) => userProfiles.push(doc.data() as Profile));
    } else {
      return thunkAPI.rejectWithValue("cannot find any profiles for this user");
    }

    //second call to db, to get all profiles that are related to current user.
    const householdIds = userProfiles.map((profile) => profile.householdId);
    const q2 = query(profilesRef, where("householdId", "in", householdIds));
    const allRelatedProfiles: Profile[] = [];

    const result = await getDocs(q2);

    result.docs.forEach((doc) => {
      allRelatedProfiles.push(doc.data() as Profile);
    });

    return allRelatedProfiles;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("cant find any profiles");
  }
});

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

export const setProfileToOwner = createAsyncThunk<Profile[], Profile, { rejectValue: string }>(
  "profile/setProfileToOwner",
  //void for now to test snapshot
  async (profile, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AppState;
      const profileState = state.profile;

      const profilesRef = collection(db, "profiles");

      const q = query(profilesRef, where("id", "==", profile.id));

      const profileIds = profileState.profiles.map((x) => x.id);

      const q2 = query(profilesRef, where("id", "in", profileIds));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const profileDocId = querySnapshot.docs[0].id;
        await updateDoc(doc(profilesRef, profileDocId), { role: "owner" });
      }
      const profiles: Profile[] = [];
      onSnapshot(q2, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data() as Profile);
          profiles.push(doc.data() as Profile);
        });

        console.log("profiles in snapshot: " + profiles.join(", "));
      });
      return profiles;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong!");
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
    addProfile(state, action) {
      state.profiles.push(action.payload);
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
    //SET ALL RELATED PROFILES
    builder.addCase(setAllProfilesThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setAllProfilesThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.profiles = action.payload;
    });
    builder.addCase(setAllProfilesThunk.rejected, (state, action) => {
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
    //SET PROFILE TO OWNER
    builder.addCase(setProfileToOwner.pending, (state) => {
      state.pending = true;
      console.log("pending");
    });
    builder.addCase(setProfileToOwner.fulfilled, (state, action) => {
      state.pending = false;
      console.log("fullfilled");
      state.profiles = action.payload;
    });
    builder.addCase(setProfileToOwner.rejected, (state, action) => {
      state.pending = false;
      console.log("rejected");
      state.error = action.payload || "Unknown error";
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfileState, addProfile } = profileSlice.actions;
