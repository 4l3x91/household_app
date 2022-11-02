import { MaterialIcons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Divider, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { db } from "../../config/firebase";
import { selectCurrentProfile, selectPendingProfiles } from "../../store/profile/profileSelectors";
import { deleteProfile, getAllProfiles, updateProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import AvatarCard from "../household/AvatarCard";

const PendingProfiles = () => {
  const currentProfile = useAppSelector(selectCurrentProfile);
  const pendingProfiles = useAppSelector(selectPendingProfiles);
  const user = useAppSelector(selectUser);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const profilesCollection = collection(db, "profiles");
    const q = query(profilesCollection, where("isApproved", "==", false), where("householdId", "==", currentProfile?.householdId));

    onSnapshot(q, (snapshot) => {
      if (user) {
        dispatch(getAllProfiles(user));
      }
    });
  }, []);

  return (
    <View>
      {currentProfile?.role === "owner" && pendingProfiles.length > 0 && (
        <Surface style={{ padding: 10, borderRadius: 10 }}>
          <Text variant="bodySmall">Väntande profiler</Text>
          {pendingProfiles.map(
            (profile, index) =>
              profile.isApproved === false && (
                <View key={profile.id}>
                  <Container>
                    <ProfileContainer>
                      <AvatarContainer>
                        <AvatarCard profile={profile} size={20} />
                      </AvatarContainer>
                      <Text variant="bodyLarge">{profile.profileName}</Text>
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
                  {index !== pendingProfiles.filter((profile) => !profile.isApproved).length - 1 && <Divider bold style={{ marginHorizontal: 5 }} />}
                </View>
              )
          )}
        </Surface>
      )}
    </View>
  );
};

export default PendingProfiles;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const AvatarContainer = styled.View`
  padding: 10px 5px;
  margin-right: 5px;
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
