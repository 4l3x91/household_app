import { addDoc, collection, getDocs, query, Timestamp, where } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Profile } from "../profile/profileModel";
import { completedChoreModel } from "./completedChoreModel";

export const postCompletedChore = createAsyncThunk<completedChoreModel, completedChoreModel, { rejectValue: string }>(
  "completedChores/createCompletedChore",
  async (completedChore, thunkApi) => {
    try {
      await addDoc(collection(db, "completedChores"), completedChore);
      return completedChore;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("error with setting completedChores");
    }
  }
);

export const getCompletedChoresPerHousehold = createAsyncThunk<completedChoreModel[], Profile[], { rejectValue: string }>(
  "completedChores/getCompletedChoresPerHousehold",
  async (profiles, thunkApi) => {
    try {
      const completedChoresRef = collection(db, "completedChores");

      const profilesIDs = profiles.map((profile) => profile.id);

      const q = query(completedChoresRef, where("profileId", "in", profilesIDs));
      const documentsFromQuery = await getDocs(q);

      if (!documentsFromQuery.empty) {
        const completedChores: completedChoreModel[] = [];
        documentsFromQuery.forEach((doc) =>
          completedChores.push({
            profileId: doc.get("profileId"),
            date: (doc.get("date") as Timestamp).toDate(),
            choreId: doc.get("choreId"),
          } as completedChoreModel)
        );
        return completedChores;
      } else return [];
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("error");
    }
  }
);
