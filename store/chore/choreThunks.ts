import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Chore } from "./choreModel";

export const postChore = createAsyncThunk<Chore, Chore, { rejectValue: string }>("chore/createChore", async (chore, thunkAPI) => {
  try {
    const collectionRef = collection(db, "chores");
    await addDoc(collectionRef, chore);
    return chore;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

export const getChores = createAsyncThunk<Chore[], string, { rejectValue: string }>("chore/setChores", async (householdId, thunkAPI) => {
  try {
    const collectionRef = collection(db, "chores");
    const q = query(collectionRef, where("householdId", "==", householdId));
    const documentsFromQuery = await getDocs(q);
    if (!documentsFromQuery.empty) {
      const chores: Chore[] = [];
      documentsFromQuery.docs.forEach((doc) => chores.push({ ...doc.data(), dateCreated: (doc.get("createdDate") as Timestamp).toDate() } as Chore));
      return chores;
    } else {
      return thunkAPI.rejectWithValue("Cannot find any chores with that household id");
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

export const updateChore = createAsyncThunk<Chore, Chore, { rejectValue: string }>("chore/updateChore", async (chore, thunkApi) => {
  try {
    const collectionRef = collection(db, "chores");
    const q = query(collectionRef, where("id", "==", chore.id));
    const result = await getDocs(q);

    if (!result.empty) {
      const choreToUpdateId = result.docs[0].id;
      const choreRef: DocumentReference<DocumentData> = doc(db, "chores", choreToUpdateId);
      await updateDoc(choreRef, { ...chore });
    }
    return chore;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("errror");
  }
});

export const deleteChore = createAsyncThunk<Chore, Chore, { rejectValue: string }>("profile/deleteProfile", async (chore, thunkAPI) => {
  try {
    const collectionRef = collection(db, "chores");

    const q = query(collectionRef, where("id", "==", chore.id));

    const result = await getDocs(q);

    if (!result.empty) {
      const choreToDeleteId = result.docs[0].id;
      await deleteDoc(doc(db, "chores", choreToDeleteId));
      return chore;
    } else {
      return thunkAPI.rejectWithValue("cant find chore to delete");
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("cant find chore to delete");
  }
});
