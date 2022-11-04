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

  useEffect(() => {
    if (currentProfile && household) {
      const profilesCollection = collection(db, "profiles");
      const q = query(profilesCollection, where("isApproved", "==", false), where("householdId", "==", currentProfile?.householdId));

      const unsub = onSnapshot(q, () => {
        if (user) {
          dispatch(getAllProfiles(user));
        }
      });

      return () => unsub();
    }
  }, [household]);

  // ----- This works but are commented out because of the daily 50k reads on firebase limit ------

  // useEffect(() => {
  //   if (household) {
  //     const choresCollection = collection(db, "chores");
  //     const q = query(choresCollection, where("householdId", "==", household.household.id));

  //     const unsubscribe = onSnapshot(q, () => {
  //       dispatch(getChores(household.household.id));
  //     });

  //     return () => unsubscribe();
  //   }
  // }, [household]);

  // useEffect(() => {
  //   if (household.household && members.length !== 0) {
  //     const completedChoresCollection = collection(db, "completedChores");
  //     const membersIds = members.map((x) => x.id);

  //     const q = query(completedChoresCollection, where("profileId", "in", membersIds));

  //     const unsubscribe = onSnapshot(q, () => {
  //       dispatch(getCompletedChoresPerHousehold(members));
  //     });

  //     return () => unsubscribe();
  //   }
  // }, [household]);
};
