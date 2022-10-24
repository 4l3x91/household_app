import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { HouseholdModel } from "../../store/household/householdModel";
import { setHousehold } from "../../store/household/householdSlice";
import { Profile } from "../../store/profile/profileModel";
import { useAppDispatch } from "../../store/store";

interface Props {
  profile: Profile;
  household: HouseholdModel;
  goToChores?: () => void;
}

const HouseholdCard = ({ profile, household, goToChores }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setHousehold(household));
        goToChores && goToChores();
      }}
    >
      <ProfilesContainer>
        <Text variant="titleMedium"> {household.name}</Text>
        <ProfileContainer>
          <Text variant="titleSmall"> {profile.profileName}</Text>
          <AvatarCard color={profile.avatar.color}>
            <Avatar>{profile.avatar.avatar}</Avatar>

            {profile.role === "owner" && (
              <Owner background={profile.avatar.color} borderColor={colors.surface}>
                <Tooltip
                  backgroundColor={colors.surfaceVariant}
                  width={200}
                  height={60}
                  popover={<Text>Du är ägare i det här hushållet</Text>}
                  actionType="press"
                >
                  <FontAwesome5 name="crown" size={8} color="yellow" />
                </Tooltip>
              </Owner>
            )}
          </AvatarCard>
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

const Owner = styled.View<{ background: string; borderColor: string }>`
  background-color: ${(props) => props.background};
  padding: 3px;
  border-radius: 20px;
  position: absolute;
  right: -8px;
  top: -8px;
  border: 1px solid ${(props) => props.borderColor};
`;

const ProfilesContainer = styled(Surface)`
  border-radius: 10px;
  flex-direction: row;
  margin: 5px 5px 0px 0px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
`;

const AvatarCard = styled.View<{ color: string }>`
  margin-left: 5px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  padding: 3px;
`;

const Avatar = styled.Text`
  font-size: 15px;
`;

const Details = styled.View``;
