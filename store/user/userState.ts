import { User } from "./userModel";

export interface UserState {
  user: User;
  pending: boolean;
  error: string;
}

export const initialState: UserState = {
  user: {
    id: "",
    email: "",
    password: "",
  },
  pending: false,
  error: "",
};
