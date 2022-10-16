import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseholdState, initialState } from "./householdState";

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    setHousehold: (state, action: PayloadAction<HouseholdState>) => (state = action.payload),
  },
});

export const householdReducer = householdSlice.reducer;

export const { setHousehold } = householdSlice.actions;
