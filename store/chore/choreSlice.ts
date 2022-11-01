import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./choreState";
import { deleteChore, getChores, postChore, updateChore } from "./choreThunks";

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    resetChoreState(state) {
      state.chores = [];
    },
  },
  extraReducers: (builder) => {
    //create chore cases
    builder.addCase(postChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postChore.fulfilled, (state, action) => {
      state.pending = false;
      state.chores.push(action.payload);
    });
    builder.addCase(postChore.rejected, (state) => {
      state.pending = false;
      state.error = "Error: could not add chore";
    });

    //set chore cases
    builder.addCase(getChores.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getChores.fulfilled, (state, action) => {
      state.pending = false;
      state.chores = action.payload;
    });
    builder.addCase(getChores.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
      state.chores = [];
    });

    //update chore cases
    builder.addCase(updateChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(updateChore.fulfilled, (state, action) => {
      state.pending = false;
      state.chores.splice(
        state.chores.findIndex((chore) => chore.id === action.payload.id),
        1,
        action.payload
      );
    });
    builder.addCase(updateChore.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });

    //delete chore
    builder.addCase(deleteChore.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(deleteChore.fulfilled, (state, action) => {
      state.pending = false;
      state.chores = state.chores.filter((chore) => chore.id !== action.payload.id);
    });
    builder.addCase(deleteChore.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload || "Unknown error";
    });
  },
});

export const choreReducer = choreSlice.reducer;
export const { resetChoreState } = choreSlice.actions;
