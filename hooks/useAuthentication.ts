import { onAuthStateChanged } from "firebase/auth/react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import { login, logout } from "../store/user/userSlice";

export function useAuthentication() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ id: user.uid, email: user.email }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribeFromAuthStatusChanged;
  }, []);

  return { user };
}
