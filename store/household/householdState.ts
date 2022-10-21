import { HouseholdModel } from "./householdModel";

export interface HouseholdState {
  household: HouseholdModel;
  pending: boolean;
  error: string;
}

export const initialState: HouseholdState = {
  household: { id: "123", name: "familjen", code: "abc123" },
  pending: false,
  error: "",
};
