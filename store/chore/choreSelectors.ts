import { AppState } from "../store";

export const selectChores = (state: AppState) => state.chores;
export const selectChore = (state: AppState, id: string) => selectChores(state).chores.find((chore) => chore.id === id);
