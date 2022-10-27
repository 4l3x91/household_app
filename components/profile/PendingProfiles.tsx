import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { selectHouseholdId } from "../../store/household/householdSelector";
import { selectMemoizedCurrentProfile, selectPendingProfiles } from "../../store/profile/profileSelectors";
import { deleteProfile, updateProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AvatarCard from "../household/AvatarCard";

const PendingProfiles = () => {
  const currentProfile = useAppSelector(selectMemoizedCurrentProfile);
  const pendingProfiles = useAppSelector(selectPendingProfiles);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Container>
      {currentProfile?.role === "owner" && pendingProfiles.length > 0 && (
        <>
          <Text>Ansökande profiler</Text>
          {pendingProfiles.map(
            (profile) =>
              profile.isApproved === false && (
                <ProfileCard key={profile.id}>
                  <ProfileContent>
                    <AvatarCard profile={profile} />
                    <ProfileName key={profile.id} variant={"titleMedium"} style={{ marginRight: 8 }}>
                      {profile.profileName}
                    </ProfileName>
                  </ProfileContent>
                  <ButtonContainer>
                    <IconButton background={colors.surfaceVariant} onPress={() => dispatch(updateProfile({ ...profile, isApproved: true }))}>
                      <MaterialIcons name="check-circle-outline" size={20} color={colors.onSecondaryContainer} />
                    </IconButton>
                    <IconButton background={colors.errorContainer} onPress={async () => dispatch(deleteProfile(profile))}>
                      <MaterialIcons name="cancel" size={20} color={colors.onErrorContainer} />
                    </IconButton>
                  </ButtonContainer>
                </ProfileCard>
              )
          )}
        </>
      )}
    </Container>
  );
};

export default PendingProfiles;

const Container = styled.View`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const ProfileCard = styled(Surface)`
  margin: 5px 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;

const ProfileContent = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const ProfileName = styled(Text)`
  margin-left: 10px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const IconButton = styled.Pressable<{ background: string }>`
  flex: 1;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 10px 0px;
  margin-right: 10px;
`;
