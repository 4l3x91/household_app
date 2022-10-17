import { AppState } from "../store";

export const selectCompletedChore = (state: AppState) => state.completedChore;
