import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { selectHousehold } from "../store/household/householdSelector";
import { selectMemoizedCurrentProfile } from "../store/profile/profileSelectors";
import { getAllProfiles } from "../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

export const useFirestoreListeners = () => {
  const user = useAppSelector(selectUser);
  const currentProfile = useAppSelector(selectMemoizedCurrentProfile);
  const household = useAppSelector(selectHousehold);
  const dispatch = useAppDispatch();
  console.log("useFirestoreListeners");
  console.log(currentProfile?.profileName);

  useEffect(() => {
    if (currentProfile && household) {
      console.log("useEffect running");
      const profilesCollection = collection(db, "profiles");
      const q = query(profilesCollection, where("isApproved", "==", false), where("householdId", "==", currentProfile?.householdId));

      const unsub = onSnapshot(q, (snapshot) => {
        if (user) {
          dispatch(getAllProfiles(user));
          console.log("in snapshot");
        }
      });

      return () => unsub();
    }
  }, [household]);
};
