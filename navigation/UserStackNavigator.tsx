import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserRewardScreen from "../screens/UserRewardScreen";
import { useAppSelector } from "../store/store";
import { selectUserEmail } from "../store/user/userSelectors";

export type UserStackParams = {
  UserProfileScreen: undefined;
  UserRewardScreen: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigator = () => {
  const userEmail = useAppSelector(selectUserEmail);
  return (
    <UserStack.Navigator initialRouteName="UserProfileScreen">
      <UserStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: userEmail || "", headerTitleAlign: "center" }}
      />
      <UserStack.Screen name="UserRewardScreen" component={UserRewardScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
