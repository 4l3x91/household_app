import { completedChoreModel } from "./completedChoreModel";

export interface CompletedChoreState {
  completedChore: completedChoreModel;
  isLoading: boolean;
  error: string;
}

export const initialState: CompletedChoreState = {
  completedChore: { choreId: "123", date: new Date(), profileId: "testprofile" },
  isLoading: false,
  error: "",
};
