import { AppState } from "../store";

export const selectProfile = (state: AppState) => state.profile;

export const selectUsersProfiles = (state: AppState) => state.profile.profiles;
