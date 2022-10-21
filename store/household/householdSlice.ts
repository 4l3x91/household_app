import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
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

export const getHouseholdByCodeThunk = createAsyncThunk<HouseholdModel, string, { rejectValue: string }>(
  "household/getHouseholdByCode",
  async (code, thunkAPI) => {
    try {
      const householdRef = collection(db, "households");
      const q = query(householdRef, where("code", "==", code));
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

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {},
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
    builder.addCase(getHouseholdByCodeThunk.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no household data found";
    });
  },
});

export const householdReducer = householdSlice.reducer;
