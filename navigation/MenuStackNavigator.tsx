import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MenuScreen from "../screens/MenuScreen";
import SelectThemeScreen from "../screens/SelectThemeScreen";

export type MenuStackParams = {
  MenuScreen: undefined;
  SelectThemeScreen: undefined;
};

const MenuStack = createNativeStackNavigator<MenuStackParams>();

const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator initialRouteName="MenuScreen">
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} />
      <MenuStack.Screen name="SelectThemeScreen" component={SelectThemeScreen} options={{ title: "Mörkt läge" }} />
    </MenuStack.Navigator>
  );
};

export default MenuStackNavigator;
