import { Chore } from "./choreModel";

export interface ChoreState {
  chores: Chore[];
  error: string;
  pending: boolean;
}

export const initialState: ChoreState = {
  chores: [
    {
      id: "",
      householdId: "",
      name: "",
      description: "",
      interval: 1,
      energy: 1,
    },
  ],
  error: "",
  pending: false,
};
