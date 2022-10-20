import { AppState } from "../store";

export const selectProfile = (state: AppState) => state.profile;

export const selectUsersProfiles = (state: AppState) => state.profile.profiles;

export const selectUserProfiles = (state: AppState, userId: string) => {
  return selectProfile(state).profiles.filter((x) => x.userId === userId);
};

export const selectUserProfiles2 = (state: AppState) => selectProfile(state).profiles;

export const selectCurrentProfile = (state: AppState, householdId: string, userId: string) => {
  return selectUserProfiles(state, userId).find((x) => x.householdId === householdId);
};

export const selectHouseholdMembers = (state: AppState, householdId: string, userId: string) => {
  return selectProfile(state).profiles.filter((x) => x.userId !== userId && x.householdId === householdId);
};
