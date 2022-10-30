import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ColorSchemeName } from "react-native";
import { getTheme } from "../theme";
import RootStackNavigator from "./RootStackNavigator";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
