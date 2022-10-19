import { addDoc, collection } from "@firebase/firestore";
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

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHouseholdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHouseholdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.household = action.payload;
    });
    builder.addCase(createHouseholdThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error: no household data found";
    });
  },
});

export const householdReducer = householdSlice.reducer;
