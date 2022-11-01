import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { HouseholdModel } from "../../store/household/householdModel";
import { selectUserProfiles } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import HouseholdCard from "./HouseholdCard";

interface Props {
  goToChores?: () => void;
  closeModal?: () => void;
}

const MyHouseholds = ({ goToChores, closeModal }: Props) => {
  const profiles = useAppSelector(selectUserProfiles);
  const [households, setHouseholds] = useState<HouseholdModel[]>([]);

  useEffect(() => {
    getHouseholds();
    console.log(households.length);
  }, []);

  const getHouseholds = () => {
    setHouseholds([]);
    const collectionRef = collection(db, "households");

    profiles.forEach((profile) => {
      const householdQuery = query(collectionRef, where("id", "==", profile.householdId));

      getDocs(householdQuery).then((household) => {
        setHouseholds((prev) => [...prev, household.docs[0].data() as HouseholdModel]);
      });
    });
  };

  return (
    <>
      {households.length === profiles.length &&
        profiles.map((profile, index) => (
          <HouseholdCard
            key={profile.id}
            closeModal={closeModal}
            profile={profile}
            household={households[index]}
            goToChores={goToChores}
          />
        ))}
    </>
  );
};

export default MyHouseholds;
