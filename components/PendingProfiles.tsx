// import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { db } from "../config/firebase";
import { selectHouseholdId } from "../store/household/householdSelector";
import { Profile } from "../store/profile/profileModel";
import { deleteProfileThunk } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const PendingProfiles = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const householdId = useAppSelector(selectHouseholdId);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const getPendingProfiles = async (householdId: string) => {
    try {
      const collectionRef = collection(db, "profiles");
      const q = query(collectionRef, where("householdId", "==", householdId), where("isApproved", "==", false));

      const documentsFromQuery = await getDocs(q);

      if (!documentsFromQuery.empty) {
        const profiles: Profile[] = [];
        documentsFromQuery.docs.forEach((doc) => profiles.push(doc.data() as Profile));
        setPendingProfiles(profiles);
      } else {
        setPendingProfiles([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveProfile = async (profile: Profile) => {
    setHasChanged(false);
    const profilesCollection = collection(db, "profiles");
    const q = query(profilesCollection, where("id", "==", profile.id));

    const result = await getDocs(q);

    if (!result.empty) {
      const docId = result.docs[0].id;
      await updateDoc(doc(profilesCollection, docId), { isApproved: true });
      setHasChanged(true);
    }
  };

  useEffect(() => {
    getPendingProfiles(householdId);
  }, [hasChanged]);

  return (
    <>
      {pendingProfiles.length > 0 ? (
        <Profiles color={colors.onPrimary}>
          {pendingProfiles.map((profile) => (
            <ProfileCard background={colors.primaryContainer} key={profile.id}>
              <ProfileContent>
                <Text key={profile.id} variant={"titleMedium"} style={{ marginRight: 8 }}>
                  {profile.profileName}
                </Text>
                <AvatarContainer avatarColor={profile.avatar.color}>
                  <Text style={{ fontSize: 20 }}>{profile.avatar.avatar}</Text>
                </AvatarContainer>
              </ProfileContent>
              <ButtonContainer>
                <AcceptButton color={colors.onPrimaryContainer} onPress={async () => await approveProfile(profile)}>
                  <MaterialIcons name="check-circle-outline" size={20} color={colors.onSecondary} />
                </AcceptButton>
                <RefuseButton color={colors.errorContainer} onPress={async () => dispatch(deleteProfileThunk(profile))}>
                  <MaterialIcons name="cancel" size={20} color={colors.onErrorContainer} />
                </RefuseButton>
              </ButtonContainer>
            </ProfileCard>
          ))}
        </Profiles>
      ) : (
        <View>
          <Text>no pending profiles</Text>
        </View>
      )}
    </>
  );
};

export default PendingProfiles;

const Profiles = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  /* background-color: lightgray; */
  width: 80%;
`;

const ProfileCard = styled(Surface)<{ background: string }>`
  flex-direction: row;
  padding: 8px 10px;
  border-radius: 10px;
  margin: 8px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.background};
`;

const ProfileContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View<{ avatarColor: string }>`
  background-color: ${(props) => props.avatarColor};
  border-radius: 4px;
  padding: 4px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const AcceptButton = styled.Pressable<{ color: string }>`
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  margin: 0 10px;
  padding: 2px;
`;

const RefuseButton = styled.Pressable<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 1000px;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding: 2px;
`;
