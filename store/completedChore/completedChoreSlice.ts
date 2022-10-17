import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { completedChoreModel } from "./completedChoreModel";
import { CompletedChoreState, initialState } from "./completedChoreState";

const setCompletedChoreThunk = createAsyncThunk<completedChoreModel, completedChoreModel, { rejectValue: string }>(
  "completedChore/setCompletedChore",
  async (completedChore, thunkApi) => {
    try {
      return completedChore;
    } catch (error) {
      return thunkApi.rejectWithValue("error with setting completedChore");
    }
  }
);

const completedChoreSlice = createSlice({
  name: "completedChore",
  initialState,
  reducers: {
    setCompletedChore: (state, action: PayloadAction<CompletedChoreState>) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(setCompletedChoreThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setCompletedChoreThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.completedChore = action.payload;
    });
    builder.addCase(setCompletedChoreThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error: no completed chore data found";
    });
  },
});

export const completedChoreReducer = completedChoreSlice.reducer;

export const { setCompletedChore } = completedChoreSlice.actions;
