import { AppState } from "../store";

export const selectUser = (state: AppState) => state.userState.user;
