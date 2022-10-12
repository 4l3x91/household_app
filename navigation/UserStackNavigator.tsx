import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserRewardScreen from "../screens/UserRewardScreen";

export type UserStackParams = {
  UserProfileScreen: undefined;
  UserRewardScreen: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="UserProfileScreen">
      <UserStack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <UserStack.Screen name="UserRewardScreen" component={UserRewardScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
