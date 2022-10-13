import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import ChoreStackNavigator, { ChoreStackParams } from "./ChoreStackNavigator";
import MenuStackNavigator, { MenuStackParams } from "./MenuStackNavigator";
import { RootStackParams } from "./RootStackNavigator";
import StatsStackNavigator, { StatsStackParams } from "./StatsStackNavigator";
import UserStackNavigator, { UserStackParams } from "./UserStackNavigator";

export type BottomTabStackParams = {
  Chores: NavigatorScreenParams<ChoreStackParams>;
  Stats: NavigatorScreenParams<StatsStackParams>;
  UserProfile: NavigatorScreenParams<UserStackParams>;
  Menu: NavigatorScreenParams<MenuStackParams>;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParams, "Chores">,
  NativeStackScreenProps<RootStackParams, "Welcome">
>;

const BottomStack = createBottomTabNavigator<BottomTabStackParams>();

const TabStackNavigator = () => {
  return (
    <BottomStack.Navigator initialRouteName="Chores">
      <BottomStack.Screen name="Chores" component={ChoreStackNavigator} options={{ headerShown: false }} />
      <BottomStack.Screen name="Stats" component={StatsStackNavigator} />
      <BottomStack.Screen name="UserProfile" component={UserStackNavigator} options={{ headerShown: false }} />
      <BottomStack.Screen name="Menu" component={MenuStackNavigator} options={{ headerShown: false }} />
    </BottomStack.Navigator>
  );
};

export default TabStackNavigator;
