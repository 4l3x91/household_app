import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { db } from "../config/firebase";
import { HouseholdModel } from "../store/household/householdModel";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

const MyHouseholds = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profiles = useAppSelector(selectUsersProfiles);
  const { colors } = useTheme();
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
    <View>
      <UserContainer>
        <Text>{user?.email}</Text>
      </UserContainer>
      {households.length === profiles.length &&
        profiles.map((profile, index) => (
          <Pressable
            key={profile.id}
            onPress={() => {
              console.log("set household state to households[index].id");
            }}
          >
            <ProfilesContainer>
              <AvatarCard color={profile.avatar.color}>
                <Avatar>{profile.avatar.avatar}</Avatar>
              </AvatarCard>
              <ProfileName color={colors.onSurface}>{profile.profileName}</ProfileName>
              <ProfileName color={colors.onSurface}>{households[index].name}</ProfileName>
            </ProfilesContainer>
          </Pressable>
        ))}
    </View>
  );
};

export default MyHouseholds;

const UserContainer = styled.View`
  padding: 10px;
  align-items: center;
  background-color: gray;
`;

const ProfilesContainer = styled(Surface)`
  border-radius: 10px;
  flex-direction: row;
  margin: 10px 10px;
  align-items: center;
  padding: 10px;
`;

const AvatarCard = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
`;

const Avatar = styled.Text`
  font-size: 20px;
`;

const ProfileName = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 20px;
  padding: 10px;
`;
