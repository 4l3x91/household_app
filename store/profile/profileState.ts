import { Profile } from "./profileModel";

export interface ProfileState {
  profiles: Profile[];
  error: string;
  pending: boolean;
}

export const initialState: ProfileState = {
  // mock data for now
  profiles: [],
  error: "",
  pending: false,
};
