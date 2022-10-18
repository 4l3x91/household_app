import { AppState } from "../store";

export const selectHousehold = (state: AppState) => state.household;

export const selectHouseholdName = (state: AppState) => state.household.household.name;
