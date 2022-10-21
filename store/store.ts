import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { choreReducer } from "./chore/choreSlice";
import { completedChoresReducer } from "./completedChore/completedChoreSlice";
import { householdReducer } from "./household/householdSlice";
import { profileReducer } from "./profile/profileSlice";
import { themeReducer } from "./theme/themeSlice";
import { userReducer } from "./user/userSlice";

const store = configureStore({
  reducer: {
    userState: userReducer,
    profile: profileReducer,
    chores: choreReducer,
    household: householdReducer,
    completedChores: completedChoresReducer,
    themeState: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
