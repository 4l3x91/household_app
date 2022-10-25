import { addDoc, collection, doc, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Chore } from "./choreModel";
import { initialState } from "./choreState";

export const createChoreThunk = createAsyncThunk<Chore, Chore, { rejectValue: string }>("chore/createChore", async (chore, thunkAPI) => {
  try {
    const collectionRef = collection(db, "chores");
    await addDoc(collectionRef, chore);
    return chore;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

export const setChoresThunk = createAsyncThunk<Chore[], string, { rejectValue: string }>("chore/setChores", async (householdId, thunkAPI) => {
  try {
    const collectionRef = collection(db, "chores");
    const q = query(collectionRef, where("householdId", "==", householdId));
    const documentsFromQuery = await getDocs(q);
    if (!documentsFromQuery.empty) {
      const chores: Chore[] = [];
      documentsFromQuery.docs.forEach((doc) => chores.push(doc.data() as Chore));
      return chores;
    } else {
      return thunkAPI.rejectWithValue("Cannot find any chores with that household id");
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

export const updateChoreThunk = createAsyncThunk<Chore, Chore, { rejectValue: string }>("chore/updateChore", async (chore, thunkApi) => {
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

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create chore cases
    builder.addCase(createChoreThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(createChoreThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.chores.push(action.payload);
    });
    builder.addCase(createChoreThunk.rejected, (state) => {
      state.pending = false;
      state.error = "Error: could not add chore";
    });

    //set chore cases
    builder.addCase(setChoresThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setChoresThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.chores = action.payload;
    });
    builder.addCase(setChoresThunk.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
      state.chores = [];
    });

    //update chore cases
    builder.addCase(updateChoreThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(updateChoreThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.chores.splice(
        state.chores.findIndex((chore) => chore.id === action.payload.id),
        1,
        action.payload
      );
    });
    builder.addCase(updateChoreThunk.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
  },
});

export const choreReducer = choreSlice.reducer;
