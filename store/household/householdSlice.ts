import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseholdModel } from "./householdModel";
import { HouseholdState, initialState } from "./householdState";

const setHouseholdThunk = createAsyncThunk<HouseholdModel, HouseholdModel, { rejectValue: string }>(
  "household/setHousehold",
  async (household, thunkAPI) => {
    // TODO: get household from firestore by loggedin profile
    try {
      return household;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    setHousehold: (state, action: PayloadAction<HouseholdState>) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(setHouseholdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setHouseholdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.household = action.payload;
    });
    builder.addCase(setHouseholdThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error: no household data found";
    });
  },
});

export const householdReducer = householdSlice.reducer;

export const { setHousehold } = householdSlice.actions;
