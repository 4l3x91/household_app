import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootStackNavigator from "./RootStackNavigator";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
