import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MyProfiles from "../components/MyProfiles";
import { UserStackParams } from "../navigation/UserStackNavigator";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const UserProfileScreen = ({ navigation, route }: Props) => {
  return <MyProfiles />;
};

export default UserProfileScreen;
