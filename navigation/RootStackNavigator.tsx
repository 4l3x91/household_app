import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateUserScreen from "../screens/CreateUserScreen";
import HouseholdOptionsScreen from "../screens/HouseholdOptionsScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStackNavigator from "./TabStackNavigator";

export type RootStackParams = {
  Welcome: undefined;
  Login: undefined;
  TabStack: undefined;
  CreateUser: undefined;
  HouseholdOptions: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Logga in", headerBackVisible: false }} />
      <RootStack.Screen name="TabStack" component={TabStackNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerTitle: "Registrera konto", headerBackVisible: false }} />
      <RootStack.Screen name="HouseholdOptions" component={HouseholdOptionsScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
