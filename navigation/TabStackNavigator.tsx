import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "react-native-paper";
import { selectHouseholdName } from "../store/household/householdSelector";
import { selectMemoizedCurrentProfile, selectPendingProfiles } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";
import ChoreStackNavigator, { ChoreStackParams } from "./ChoreStackNavigator";
import { MenuStackParams } from "./MenuStackNavigator";
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
  const currentProfile = useAppSelector(selectMemoizedCurrentProfile);
  const nrOfPendingProfiles = useAppSelector(selectPendingProfiles).length;
  const { colors } = useTheme();

  return (
    <BottomStack.Navigator initialRouteName="Chores">
      <BottomStack.Screen
        name="Chores"
        component={ChoreStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Sysslor",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="broom" size={size} color={color} />,
        }}
      />
      <BottomStack.Screen
        name="Stats"
        component={StatsStackNavigator}
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="pie-chart" size={size} color={color} />, headerShown: false }}
      />
      <BottomStack.Screen
        name="UserProfile"
        component={UserStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
          tabBarBadge: currentProfile?.role === "owner" ? (nrOfPendingProfiles > 0 ? nrOfPendingProfiles : undefined) : undefined,
          tabBarLabel: "Profil",
        }}
      />
    </BottomStack.Navigator>
  );
};

export default TabStackNavigator;
