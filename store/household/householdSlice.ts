import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { db } from "../../config/firebase";
import { User } from "../user/userModel";
import { HouseholdModel } from "./householdModel";
import { initialState } from "./householdState";

export const createHouseholdThunk = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
  "household/setHousehold",
  async (household, thunkAPI) => {
    try {
      await addDoc(collection(db, "households"), household);
      return household;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getHouseholdByCodeThunk = createAsyncThunk<HouseholdModel, { code: string; user: User }, { rejectValue: string }>(
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

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHouseholdThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(createHouseholdThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(createHouseholdThunk.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no household data found";
    });
    builder.addCase(getHouseholdByCodeThunk.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(getHouseholdByCodeThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(getHouseholdByCodeThunk.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "unknown error";
    });
  },
});

export const householdReducer = householdSlice.reducer;
export const { setError } = householdSlice.actions;
