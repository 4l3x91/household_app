import { completedChoreModel } from "./completedChoreModel";

export interface CompletedChoresState {
  completedChores: completedChoreModel[];
  pending: boolean;
  error: string;
}

export const initialState: CompletedChoresState = {
  completedChores: [],
  pending: false,
  error: "",
};
