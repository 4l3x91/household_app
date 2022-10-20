import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { findUsersProfilesThunk } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

const MyProfiles = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profiles = useAppSelector(selectUsersProfiles);
  const { colors } = useTheme();

  useEffect(() => {
    if (user) {
      dispatch(findUsersProfilesThunk(user));
    }
  }, []);

  return (
    <View>
      <UserContainer>
        <Text>{user?.email}</Text>
      </UserContainer>

      {profiles.map((profile) => (
        <Pressable
          key={profile.id}
          onPress={() => {
            console.log("gå till hushållet för profilen?");
          }}
        >
          <ProfilesContainer bgColor={colors.primary}>
            <AvatarCard color={profile.avatar.color}>
              <Avatar>{profile.avatar.avatar}</Avatar>
            </AvatarCard>
            <ProfileName color={colors.text}>{profile.profileName}</ProfileName>
          </ProfilesContainer>
        </Pressable>
      ))}
    </View>
  );
};

export default MyProfiles;

const UserContainer = styled.View`
  padding: 10px;
  align-items: center;
  background-color: gray;
`;

const ProfilesContainer = styled.View<{ bgColor: string }>`
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
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
