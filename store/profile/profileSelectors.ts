import {} from "react-native";
import { AppState } from "../store";

export const selectProfile = (state: AppState) => state.profile;
