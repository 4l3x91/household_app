import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileRewardScreen from "../screens/profile/ProfileRewardScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";

export type UserStackParams = {
  UserProfileScreen: undefined;
  UserRewardScreen: undefined;
  SettingsScreen: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="UserProfileScreen">
      <UserStack.Screen name="UserProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <UserStack.Screen name="UserRewardScreen" component={ProfileRewardScreen} />
      <UserStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
