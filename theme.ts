import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from "@react-navigation/native";

import { ColorSchemeName } from "react-native";
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperLightTheme, Theme as PaperTheme } from "react-native-paper";

type Theme = NavigationTheme & PaperTheme;

export const LightTheme: Theme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    primary: "rgb(0, 102, 136)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(194, 232, 255)",
    onPrimaryContainer: "rgb(0, 30, 44)",
    secondary: "rgb(78, 97, 109)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(209, 229, 243)",
    onSecondaryContainer: "rgb(9, 30, 40)",
    tertiary: "rgb(96, 90, 125)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(229, 222, 255)",
    onTertiaryContainer: "rgb(28, 23, 54)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 252, 254)",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 254)",
    onSurface: "rgb(25, 28, 30)",
    surfaceVariant: "rgb(220, 227, 233)",
    onSurfaceVariant: "rgb(65, 72, 77)",
    outline: "rgb(113, 120, 125)",
    inverseSurface: "rgb(46, 49, 51)",
    inverseOnSurface: "rgb(240, 241, 243)",
    inversePrimary: "rgb(119, 209, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 245, 248)",
      level2: "rgb(231, 240, 245)",
      level3: "rgb(223, 236, 241)",
      level4: "rgb(221, 234, 240)",
      level5: "rgb(216, 231, 238)",
    },
    surfaceDisabled: "rgba(25, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
    backdrop: "rgba(42, 49, 54, 0.4)",
  },
};

export const DarkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "rgb(119, 209, 255)",
    onPrimary: "rgb(0, 53, 73)",
    primaryContainer: "rgb(0, 77, 104)",
    onPrimaryContainer: "rgb(194, 232, 255)",
    secondary: "rgb(181, 201, 215)",
    onSecondary: "rgb(32, 51, 61)",
    secondaryContainer: "rgb(54, 73, 84)",
    onSecondaryContainer: "rgb(209, 229, 243)",
    tertiary: "rgb(201, 193, 234)",
    onTertiary: "rgb(49, 44, 76)",
    tertiaryContainer: "rgb(72, 66, 100)",
    onTertiaryContainer: "rgb(229, 222, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 30)",
    onBackground: "rgb(225, 226, 229)",
    surface: "rgb(25, 28, 30)",
    onSurface: "rgb(225, 226, 229)",
    surfaceVariant: "rgb(65, 72, 77)",
    onSurfaceVariant: "rgb(192, 199, 205)",
    outline: "rgb(138, 146, 151)",
    inverseSurface: "rgb(225, 226, 229)",
    inverseOnSurface: "rgb(46, 49, 51)",
    inversePrimary: "rgb(0, 102, 136)",
    elevation: {
      level0: "transparent",
      level1: "rgb(30, 37, 41)",
      level2: "rgb(33, 43, 48)",
      level3: "rgb(35, 48, 55)",
      level4: "rgb(36, 50, 57)",
      level5: "rgb(38, 53, 62)",
    },
    surfaceDisabled: "rgba(225, 226, 229, 0.12)",
    onSurfaceDisabled: "rgba(225, 226, 229, 0.38)",
    backdrop: "rgba(42, 49, 54, 0.4)",
  },
};

export function getTheme(scheme: ColorSchemeName) {
  return scheme === "dark" ? DarkTheme : LightTheme;
}
