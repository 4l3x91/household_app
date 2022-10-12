import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStackNavigator from "./TabStackNavigator";

export type RootStackParams = {
  Welcome: undefined;
  TabStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="TabStack" component={TabStackNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
