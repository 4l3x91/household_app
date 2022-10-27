import React from "react";
import { Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { HouseholdModel } from "../../store/household/householdModel";
import { setHousehold } from "../../store/household/householdSlice";
import { Profile } from "../../store/profile/profileModel";
import { useAppDispatch } from "../../store/store";
import AvatarCard from "./AvatarCard";

interface Props {
  profile: Profile;
  household: HouseholdModel;
  goToChores?: () => void;
  closeModal?: () => void;
}

const HouseholdCard = ({ profile, household, goToChores, closeModal }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setHousehold(household));
        goToChores && goToChores();
        closeModal && closeModal();
      }}
    >
      <ProfilesContainer background={colors.primaryContainer}>
        <Text variant="titleMedium"> {household.name}</Text>
        <ProfileContainer>
          <Text variant="titleSmall"> {profile.profileName}</Text>
          <AvatarCard profile={profile} />
        </ProfileContainer>
      </ProfilesContainer>
    </Pressable>
  );
};

export default HouseholdCard;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfilesContainer = styled.View<{ background: string }>`
  background-color: ${({ background }) => background};
  border-radius: 10px;
  flex-direction: row;
  margin: 5px 5px 0px 0px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
`;
