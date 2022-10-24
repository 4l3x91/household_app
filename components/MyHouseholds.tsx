import { FontAwesome5 } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import {} from "react-native-gesture-handler";
import { Surface, Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { db } from "../config/firebase";
import { HouseholdModel } from "../store/household/householdModel";
import { setHousehold } from "../store/household/householdSlice";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

interface Props {
  goToChores?: () => void;
}

const MyHouseholds = ({ goToChores }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profiles = useAppSelector(selectUsersProfiles);
  const { colors } = useTheme();
  const { theme } = useTheme();
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
    <>
      {households.length === profiles.length &&
        profiles.map((profile, index) => (
          <Pressable
            key={profile.id}
            onPress={() => {
              dispatch(setHousehold(households[index]));
              goToChores && goToChores();
            }}
          >
            <ProfilesContainer>
              <Text variant="titleMedium"> {households[index].name}</Text>
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
        ))}
    </>
  );
};

export default MyHouseholds;

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
