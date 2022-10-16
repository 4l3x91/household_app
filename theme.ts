import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  Theme as NavigationTheme
} from "@react-navigation/native";

import { ColorSchemeName } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Theme as PaperTheme
} from "react-native-paper";
  
  type Theme = NavigationTheme & PaperTheme;
  
  export const LightTheme: Theme = {
    ...PaperLightTheme,
    ...NavigationLightTheme,
    colors: {
      ...PaperLightTheme.colors,
      ...NavigationLightTheme.colors,
      primary: "black",
      text: "black",
    },
  };
  
  export const DarkTheme: Theme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      ...NavigationDarkTheme.colors,
      primary: "#eee",
      text: "white",
    },
  };
  
  export function getTheme(scheme: ColorSchemeName) {
    return scheme === "dark" ? DarkTheme : LightTheme;
}