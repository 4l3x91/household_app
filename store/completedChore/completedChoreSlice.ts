import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { completedChoreModel } from "./completedChoreModel";
import { CompletedChoresState, initialState } from "./completedChoreState";

export const setCompletedChoresThunk = createAsyncThunk<completedChoreModel[], completedChoreModel[], { rejectValue: string }>(
  "completedChores/setCompletedChores",
  async (completedChores, thunkApi) => {
    try {
      return completedChores;
    } catch (error) {
      return thunkApi.rejectWithValue("error with setting completedChores");
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
    builder.addCase(setCompletedChoresThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setCompletedChoresThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.completedChores = action.payload;
    });
    builder.addCase(setCompletedChoresThunk.rejected, (state) => {
      state.pending = false;
      state.error = "Error: no completed chore data found";
    });
  },
});

export const completedChoresReducer = completedChoresSlice.reducer;

export const { setCompletedChores } = completedChoresSlice.actions;
