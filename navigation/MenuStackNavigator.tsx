import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MenuScreen from "../screens/MenuScreen";

export type MenuStackParams = {
  MenuScreen: undefined;
};

const UserStack = createNativeStackNavigator<MenuStackParams>();

const MenuStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="MenuScreen">
      <UserStack.Screen name="MenuScreen" component={MenuScreen} />
    </UserStack.Navigator>
  );
};

export default MenuStackNavigator;
