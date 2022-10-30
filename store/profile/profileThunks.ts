import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { User } from "../user/userModel";
import { Profile } from "./profileModel";

export const postProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/setProfile", async (profile, thunkAPI) => {
  try {
    await addDoc(collection(db, "profiles"), profile);
    return profile;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Error setting profile");
  }
});

export const getAllProfiles = createAsyncThunk<Profile[], User, { rejectValue: string }>("profile/findUsersProfile", async (user, thunkAPI) => {
  try {
    const profilesRef = collection(db, "profiles");

    const q = query(profilesRef, where("userId", "==", user.id));
    const userProfiles: Profile[] = [];

    const documentsFromQuery = await getDocs(q);

    if (!documentsFromQuery.empty) {
      documentsFromQuery.docs.forEach((doc) => userProfiles.push(doc.data() as Profile));
    } else {
      return [] as Profile[];
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

export const deleteProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/deleteProfile", async (profile, thunkAPI) => {
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

export const updateProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>("profile/editProfile", async (profile, thunkAPI) => {
  try {
    const collectionRef = collection(db, "profiles");
    const q = query(collectionRef, where("id", "==", profile.id));
    const result = await getDocs(q);

    if (!result.empty) {
      const profiletoUpdateId = result.docs[0].id;
      const userRef: DocumentReference<DocumentData> = doc(db, "profiles", profiletoUpdateId);
      await updateDoc(userRef, { ...profile });
    }
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("error");
  }
});
