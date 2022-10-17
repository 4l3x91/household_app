import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chore } from "./choreModel";
import { initialState } from "./choreState";

const setChore = createAsyncThunk<Chore[], Chore[], { rejectValue: string }>("chore/setChore", async (chores, thunkAPI) => {
  // Api call to set chore
  try {
    return chores;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error setting chore");
  }
});

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(setChore.fulfilled, (state, action) => {
      state.pending = false;
      state.chores = action.payload;
    });
    builder.addCase(setChore.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
  },
});

export const choreReducer = choreSlice.reducer;
