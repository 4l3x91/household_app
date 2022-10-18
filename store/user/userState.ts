import { User } from "./userModel";

export interface UserState {
  user: User | null;
  pending: boolean;
  error: string;
}

export const initialState: UserState = {
  user: null,
  pending: false,
  error: "",
};
