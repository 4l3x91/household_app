import { Profile } from "./profileModel";

export interface ProfileState {
  profile: Profile;
  error: string;
  pending: boolean;
}

export const initialState: ProfileState = {
  // mock data for now
  profile: {
    id: "123",
    userId: "321",
    householdId: "456",
    profileName: "Kattsnake",
    avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/c98a4bd47b02eda8b2acaa1defd5a14a17c07902_full.jpg",
    profileColor: "lightblue",
    role: "user",
    paused: false,
  },
  error: "",
  pending: false,
};
