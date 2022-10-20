import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import MyHouseholds from "../components/MyHouseholds";
import { UserStackParams } from "../navigation/UserStackNavigator";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const UserProfileScreen = ({ navigation, route }: Props) => {
  return <MyHouseholds />;
};

export default UserProfileScreen;
