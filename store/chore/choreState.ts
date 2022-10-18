import { Chore } from "./choreModel";

export interface ChoreState {
  chores: Chore[];
  error: string;
  pending: boolean;
}

export const initialState: ChoreState = {
  chores: [
    {
      id: "bcaa123",
      householdId: "abc123",
      name: "Diskmaskin",
      description: "Plocka ur och fyll diskmaskinen",
      interval: 2,
      energy: 4,
    },
    {
      id: "1a2c3ba",
      householdId: "abc123",
      name: "Tvätta kläder",
      description: "Kläder behöver tvättas!",
      interval: 5,
      energy: 4,
    },
    {
      id: "123bcaa",
      householdId: "abc123",
      name: "Laga mat",
      description: "Mat är viktigt för överlevnad",
      interval: 7,
      energy: 6,
    },
    {
      id: "321acab",
      householdId: "abc123",
      name: "Rasta Dixon",
      description: "Dixon behöver rastas, gå gärna till parken",
      interval: 5,
      energy: 10,
    },
  ],
  error: "",
  pending: false,
};
