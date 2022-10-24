import { AppState } from "../store";

export const selectUser = (state: AppState) => state.userState.user;

export const selectUserEmail = (state: AppState) => selectUser(state)?.email;
