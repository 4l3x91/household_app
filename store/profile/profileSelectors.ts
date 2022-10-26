import { createSelector } from "@reduxjs/toolkit";
import store, { AppState } from "../store";

export const selectProfile = (state: AppState) => state.profile;

export const selectAllProfiles = (state: AppState) => state.profile.profiles;

export const selectUserProfiles = (state: AppState) => {
  return selectProfile(state).profiles.filter((x) => x.userId === state.userState.user?.id);
};

export const selectHouseholdMembers = (state: AppState) => {
  return selectProfile(state).profiles.filter((x) => x.userId !== state.userState.user?.id && x.householdId === state.household.household.id);
};

export const selectCurrentProfile = (state: AppState) => {
  return selectUserProfiles(state).find((x) => x.householdId === state.household.household.id);
};

export const selectMemoizedUserProfiles = createSelector(
  (state: AppState) => state.profile.profiles,
  (profiles) => {
    const memoizedProfiles = profiles.filter((x) => x.userId === store.getState().userState.user?.id);
    return memoizedProfiles;
  }
);
