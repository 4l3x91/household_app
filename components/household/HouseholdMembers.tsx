import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { selectCurrentProfile, selectMemoizedHouseholdMember } from "../../store/profile/profileSelectors";
import { deleteProfile, updateProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";

const HouseholdMembers = () => {
  const members = useAppSelector(selectMemoizedHouseholdMember);
  const currentProfile = useAppSelector(selectCurrentProfile);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  return (
    <HouseholdMembersContainer>
      <Text variant="headlineSmall">Hushållsmedlemmar</Text>
      {members.map((member) => (
        <MemberCard key={member.id} background={colors.surface}>
          <ProfileContent>
            <AvatarBox background={member.avatar.color}>
              <Avatar variant="bodyMedium">{member.avatar.avatar}</Avatar>
            </AvatarBox>
            <Text variant="bodyLarge">{member.profileName}</Text>
          </ProfileContent>
          {currentProfile?.role === "owner" && (
            <ButtonContainer>
              <IconButton background={colors.surfaceVariant} onPress={() => dispatch(deleteProfile(member))}>
                <FontAwesome5 name="trash-alt" size={18} color={colors.onSecondaryContainer} />
              </IconButton>
              <IconButton
                background={colors.surfaceVariant}
                onPress={() => {
                  dispatch(updateProfile({ ...member, role: "owner" }));
                }}
              >
                <FontAwesome5 name="crown" size={18} color={colors.onSecondaryContainer} />
              </IconButton>

              {member.isPaused ? (
                <IconButton background={colors.surfaceVariant} onPress={() => dispatch(updateProfile({ ...member, isPaused: false }))}>
                  <FontAwesome5 name="play" size={18} color={colors.onSecondaryContainer} />
                </IconButton>
              ) : (
                <IconButton background={colors.surfaceVariant} onPress={() => dispatch(updateProfile({ ...member, isPaused: true }))}>
                  <FontAwesome5 name="pause" size={18} color={colors.onSecondaryContainer} />
                </IconButton>
              )}
            </ButtonContainer>
          )}
        </MemberCard>
      ))}
    </HouseholdMembersContainer>
  );
};

const HouseholdMembersContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const MemberCard = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  margin: 5px 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;

const ProfileContent = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const AvatarBox = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  margin: 0px 5px;
  padding: 5px;
  border-radius: 4px;
`;

const Avatar = styled(Text)`
  /* font-size: 20px; */
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const IconButton = styled.Pressable<{ background: string }>`
  flex: 1;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 10px 0;
  margin-right: 10px;
`;

export default HouseholdMembers;
