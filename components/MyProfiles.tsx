import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { findUsersProfilesThunk } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import CreateProfile from "./CreateProfile";

const MyProfiles = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profiles = useAppSelector(selectUsersProfiles);

  useEffect(() => {
    if (user) {
      dispatch(findUsersProfilesThunk(user));
    }
  }, []);

  return (
    <View>
      <Text>Profiler</Text>
      
      <ProfilesContainer>
        {profiles.map((profile) => (
          <Text>
            {profile.avatar.avatar} {profile.profileName}
          </Text>
        ))}
      </ProfilesContainer>
    </View>
  );
};

export default MyProfiles;

const ProfilesContainer = styled.View``;
