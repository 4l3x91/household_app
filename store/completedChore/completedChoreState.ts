import { completedChoreModel } from "./completedChoreModel";

export interface CompletedChoresState {
  completedChores: completedChoreModel[];
  isLoading: boolean;
  error: string;
}

export const initialState: CompletedChoresState = {
  completedChores: [],
  isLoading: false,
  error: "",
};
