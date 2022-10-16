import { Chore } from "./choreModel";

export interface ChoreState {
  chore: Chore;
  error: string;
  pending: boolean;
}

export const initialState: ChoreState = {
    chore: {
        id: "bcaa123",
        householdId: "abc123",
        name: "Diskmaskin",
        description: "Plocka ur och fyll diskmaskinen",
        interval: 2,
        energy: 4,
    },
  error: "",
  pending: false,
};
