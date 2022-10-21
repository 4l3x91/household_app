import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { HouseholdModel } from "./householdModel";
import { initialState } from "./householdState";

export const createHouseholdThunk = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
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

export const deleteHouseholdThunk = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
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
    builder.addCase(getHouseholdByCodeThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getHouseholdByCodeThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.household = action.payload;
    });
    builder.addCase(getHouseholdByCodeThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error: no household data found";
    });
    builder.addCase(deleteHouseholdThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(deleteHouseholdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.household = action.payload;
    });
    builder.addCase(deleteHouseholdThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error: no household data found";
    });
  },
});

export const householdReducer = householdSlice.reducer;
