import React from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { selectAllHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = {
  choreId: string;
};

const DisplayCompletedAvatars = ({ choreId }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const allMembers = useAppSelector(selectAllHouseholdMembers);
  const profilesCompleted = allMembers.filter(
    (p) => p.id === completedChores.find((cc) => cc.profileId === p.id && cc.choreId === choreId)?.profileId
  );

  return (
    <AvatarContainer>
      {profilesCompleted?.map((p) => {
        const avatar = p.avatar.avatar ? p.avatar.avatar : "💀";
        return <Text key={avatar}>{avatar}</Text>;
      })}
    </AvatarContainer>
  );
};

export default DisplayCompletedAvatars;

const AvatarContainer = styled.View`
  flex-direction: row;
`;
