import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
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
    <View>
      {currentProfile?.role === "owner" && pendingProfiles.length > 0 && (
        <>
          <Text variant="headlineSmall">Väntande profiler</Text>
          {pendingProfiles.map(
            (profile) =>
              profile.isApproved === false && (
                <View key={profile.id}>
                  <Container>
                    <ProfileContainer>
                      <AvatarContainer>
                        <AvatarCard profile={profile} size={32} />
                      </AvatarContainer>
                      <Text variant="titleMedium">{profile.profileName}</Text>
                    </ProfileContainer>
                    <IconContainer>
                      <IconButton onPress={() => dispatch(updateProfile({ ...profile, isApproved: true }))}>
                        <MaterialIcons name="check-circle-outline" size={24} color={colors.onSecondaryContainer} />
                      </IconButton>

                      <IconButton onPress={() => dispatch(deleteProfile(profile))}>
                        <MaterialIcons name="cancel" size={24} color={colors.onErrorContainer} />
                      </IconButton>
                    </IconContainer>
                  </Container>
                </View>
              )
          )}
        </>
      )}
    </View>
  );
};

export default PendingProfiles;

const Container = styled(Surface)`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const AvatarContainer = styled.View`
  padding: 10px;
  margin-right: 10px;
  border-radius: 10px;
`;

const IconContainer = styled.View`
  flex-direction: row;
`;

const IconButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 10px 0px;
  margin-right: 10px;
`;
