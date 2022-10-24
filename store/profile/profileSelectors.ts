import { AppState } from "../store";

export const selectProfile = (state: AppState) => state.profile;

export const selectUsersProfiles = (state: AppState) => state.profile.profiles;

export const selectUserProfiles = (state: AppState) => {
  return selectProfile(state).profiles.filter((x) => x.userId === state.userState.user?.id);
};

export const selectHouseholdMemers = (state: AppState) => {
  return selectProfile(state).profiles.filter((x) => x.userId !== state.userState.user?.id && x.householdId === state.household.household.id);
};

export const selectUserProfiles2 = (state: AppState) => selectProfile(state).profiles;

export const selectCurrentProfile = (state: AppState) => {
  return selectUserProfiles(state).find((x) => x.householdId === state.household.household.id);
};

export const selectHouseholdMembers = (state: AppState, householdId: string, userId: string) => {
  return selectProfile(state).profiles.filter((x) => x.userId !== userId && x.householdId === householdId);
};
