import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateUserScreen from "../screens/CreateUserScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStackNavigator from "./TabStackNavigator";

export type RootStackParams = {
  Welcome: undefined;
  Login: undefined;
  TabStack: undefined;
  CreateUser: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="TabStack" component={TabStackNavigator} options={{ headerShown: false, gestureEnabled: false }} />
      <RootStack.Screen name="CreateUser" component={CreateUserScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
