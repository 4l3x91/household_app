import { Profile } from "./profileModel";

export interface ProfileState {
  profiles: Profile[];
  error: string;
  pending: boolean;
}

export const initialState: ProfileState = {
  // mock data for now
  profiles: [
    {
      id: "123",
      userId: "321",
      householdId: "456",
      profileName: "Kattsnake",
      avatar: { avatar: "🐷", color: "lightblue" },
      role: "user",
      isPaused: false,
    },
  ],
  error: "",
  pending: false,
};
