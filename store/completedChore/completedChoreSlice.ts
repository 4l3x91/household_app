import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompletedChoresState, initialState } from "./completedChoreState";
import { getCompletedChoresPerHousehold, postCompletedChore } from "./completedChoreThunks";

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
