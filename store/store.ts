import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileReducer } from "./profile/profileSlice";
import { userReducer } from "./user/userSlice";
import { choreReducer } from "./chore/choreSlice";
import { householdReducer } from "./household/householdSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    chore: choreReducer,
    household: householdReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
