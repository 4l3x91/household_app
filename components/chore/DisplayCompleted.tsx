import React from "react";
import { View } from "react-native";
import { selectChore } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { selectAllHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = {
  choreId: string;
};

const DisplayCompleted = ({ choreId }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const allMembers = useAppSelector(selectAllHouseholdMembers);
  const chore = useAppSelector((state) => selectChore(state, choreId));
  if (chore) {
    const profilesCompleted = allMembers.filter((p) => p.id in completedChores.filter(cc => cc.choreId === chore.id && cc.profileId === p.id));
  }

  return <View>
    
  </View>;
};
