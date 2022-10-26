import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseholdModel } from "./householdModel";
import { initialState } from "./householdState";
import { deleteHousehold, getHouseholdByCode, getHouseholdById, postHousehold, updateHouseholdName } from "./householdThunks";

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetHousehold(state) {
      state.household = initialState.household;
    },
    setHousehold(state, action: PayloadAction<HouseholdModel>) {
      state.household = action.payload;
    },
  },

  extraReducers: (builder) => {
    //CREATE HOUSEHOLD
    builder.addCase(postHousehold.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postHousehold.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(postHousehold.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no household data found";
    });

    //UPDATE HOUSEHOLD NAME
    builder.addCase(updateHouseholdName.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(updateHouseholdName.fulfilled, (state, action) => {
      state.pending = false;
      state.household.name = action.payload;
    });
    builder.addCase(updateHouseholdName.rejected, (state) => {
      state.pending = false;
      state.error = "didnt change mayne";
    });

    //GET HOUSEHOLD BY CODE
    builder.addCase(getHouseholdByCode.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(getHouseholdByCode.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(getHouseholdByCode.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "unknown error";
    });

    //GET HOUSEHOLD BY ID
    builder.addCase(getHouseholdById.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(getHouseholdById.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(getHouseholdById.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no household data found";
    });

    //DELETE HOUSEHOLD
    builder.addCase(deleteHousehold.pending, (state) => {
      state.pending = true;
      state.error = "";
    });
    builder.addCase(deleteHousehold.fulfilled, (state, action) => {
      state.pending = false;
      state.household = action.payload;
    });
    builder.addCase(deleteHousehold.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no household data found";
    });
  },
});

export const householdReducer = householdSlice.reducer;
export const { resetHousehold, setHousehold, setError } = householdSlice.actions;
