import { HouseholdModel } from "./householdModel";

export interface HouseholdState {
  household: HouseholdModel;
  isLoading: boolean;
  error: string;
}

export const initialState: HouseholdState = {
  household: { id: "123", name: "familjen", code: "abc123" },
  isLoading: false,
  error: "",
};