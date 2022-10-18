import { AppState } from "../store";

export const selectCompletedChores = (state: AppState) => state.completedChores;
