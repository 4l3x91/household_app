import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { selectHouseholdName } from "../store/household/householdSelector";
import { useAppSelector } from "../store/store";
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
  const household = useAppSelector(selectHouseholdName);

  return (
    <BottomStack.Navigator initialRouteName="Chores">
      <BottomStack.Screen
        name="Chores"
        component={ChoreStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: household,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="broom" size={size} color={color} />,
        }}
      />
      <BottomStack.Screen
        name="Stats"
        component={StatsStackNavigator}
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="pie-chart" size={size} color={color} /> }}
      />
      <BottomStack.Screen
        name="UserProfile"
        component={UserStackNavigator}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
      />
      <BottomStack.Screen
        name="Menu"
        component={MenuStackNavigator}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <FontAwesome name="cog" size={size} color={color} /> }}
      />
    </BottomStack.Navigator>
  );
};

export default TabStackNavigator;
