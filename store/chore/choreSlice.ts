import { addDoc, collection } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Chore } from "./choreModel";
import { initialState } from "./choreState";

export const createChoreThunk = createAsyncThunk<Chore, Chore, { rejectValue: string }>(
  "chore/createChore",
  async (chore, thunkAPI) => {
    try {
      const collectionRef = collection(db, "chores");
      await addDoc(collectionRef, chore);
      return chore;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const setChore = createAsyncThunk<Chore[], Chore[], { rejectValue: string }>("chore/setChore", async (chores, thunkAPI) => {
  // Api call to set chore
  try {
    return chores;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error setting chore");
  }
});

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(setChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setChore.fulfilled, (state, action) => {
      state.pending = false;
      state.chores = action.payload;
    });
    builder.addCase(setChore.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
  },
});

export const choreReducer = choreSlice.reducer;
