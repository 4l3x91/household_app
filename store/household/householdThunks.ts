import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Profile } from "../profile/profileModel";
import { User } from "../user/userModel";
import { HouseholdModel } from "./householdModel";

export const postHousehold = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
  "household/setHousehold",
  async (household, thunkAPI) => {
    try {
      const collectionRef = collection(db, "households");

      await addDoc(collectionRef, household);

      return household;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteHousehold = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
  "household/deleteHousehold",
  async (household, thunkAPI) => {
    //TODO: think about logic to delete all profiles corresponding to this household. USE this with caution :]
    try {
      const collectionRef = collection(db, "households");

      const q = query(collectionRef, where("id", "==", household.id));

      const result = await getDocs(q);

      if (!result.empty) {
        const householdToDelete = result.docs[0].id;
        await deleteDoc(doc(db, "households", householdToDelete));
      }
      return {} as HouseholdModel;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const updateHouseholdName = createAsyncThunk<string, { newName: string; profile: Profile }, { rejectValue: string }>(
  "household/changeHouseholdName",
  async ({ newName, profile }, thunkAPI) => {
    try {
      const collectionRef = collection(db, "households");
      const q = query(collectionRef, where("id", "==", profile.householdId));
      const result = await getDocs(q);

      if (!result.empty) {
        const householdToUpdateId = result.docs[0].id;
        const householdRef: DocumentReference<DocumentData> = doc(db, "households", householdToUpdateId);
        await updateDoc(householdRef, {
          name: newName,
        });
      }
      return newName;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const getHouseholdByCode = createAsyncThunk<HouseholdModel, { code: string; user: User }, { rejectValue: string }>(
  "household/getHouseholdByCode",
  async ({ code, user }, thunkAPI) => {
    try {
      const profilesRef = collection(db, "profiles");
      const householdRef = collection(db, "households");
      const q = query(householdRef, where("code", "==", code));
      const q2 = query(profilesRef, where("userId", "==", user.id));
      const queryResult = await getDocs(q);

      if (!queryResult.empty) {
        const household = queryResult.docs[0].data() as HouseholdModel;

        console.log(household.name);

        const queryResult2 = await getDocs(q2);
        queryResult2.forEach((doc) => {
          if (doc.get("householdId") === household.id) {
            throw new Error("Du har redan en profil i detta hushåll");
          }
        });
        return household;
      } else {
        return thunkAPI.rejectWithValue("Det här hushållet existerar inte");
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const getHouseholdById = createAsyncThunk<HouseholdModel, string, { rejectValue: string }>(
  "household/getHouseholdById",
  async (id, thunkAPI) => {
    try {
      const householdRef = collection(db, "households");
      const q = query(householdRef, where("id", "==", id));
      const queryResult = await getDocs(q);
      if (!queryResult.empty) {
        const household = queryResult.docs[0].data() as HouseholdModel;

        return household;
      } else {
        return thunkAPI.rejectWithValue("Household does not exist");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
