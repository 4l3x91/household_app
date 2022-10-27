import { Chore } from "./choreModel";

export interface ChoreState {
  chores: Chore[];
  error: string;
  pending: boolean;
}

export const initialState: ChoreState = {
  chores: [],
  error: "",
  pending: false,
};
