import { HouseholdModel } from "./householdModel";

export interface HouseholdState {
  household: HouseholdModel;
  pending: boolean;
  error: string;
}

export const initialState: HouseholdState = {
  household: { id: "", name: "", code: "" },
  pending: false,
  error: "",
};
