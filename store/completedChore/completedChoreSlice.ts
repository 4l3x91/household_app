import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { Profile } from "../profile/profileModel";
import { completedChoreModel } from "./completedChoreModel";
import { CompletedChoresState, initialState } from "./completedChoreState";

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
        documentsFromQuery.forEach((doc) => completedChores.push(doc.data() as completedChoreModel));
        return completedChores;
      } else return thunkApi.rejectWithValue("cannot find any completed chores on this profile");
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("error");
    }
  }
);

const completedChoresSlice = createSlice({
  name: "completedChores",
  initialState,
  reducers: {
    setCompletedChores: (state, action: PayloadAction<CompletedChoresState>) => (state = action.payload),
  },

  extraReducers: (builder) => {
    //post completedChore cases
    builder.addCase(postCompletedChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postCompletedChore.fulfilled, (state, action) => {
      state.pending = false;
      state.completedChores.push(action.payload);
    });
    builder.addCase(postCompletedChore.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "unknown error";
    });

    //get completedChore per household cases
    builder.addCase(getCompletedChoresPerHousehold.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getCompletedChoresPerHousehold.fulfilled, (state, action) => {
      state.pending = false;
      state.completedChores = action.payload;
    });
    builder.addCase(getCompletedChoresPerHousehold.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "unknown error";
    });
  },
});

export const completedChoresReducer = completedChoresSlice.reducer;

export const { setCompletedChores } = completedChoresSlice.actions;
