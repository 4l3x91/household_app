import { StatusBar } from "expo-status-bar";
import React from "react";
import { ColorSchemeName } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import useColorScheme from "./hooks/useColorScheme";

import Navigation from "./navigation";
import { useAppSelector } from "./store/store";
import { selectTheme } from "./store/theme/themeSlice";
import { getTheme } from "./theme";

const Main = () => {
  const theme = useAppSelector(selectTheme);
  const colorScheme = useColorScheme(theme.theme as NonNullable<ColorSchemeName>);

  return (
    <PaperProvider theme={getTheme(colorScheme)}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Navigation colorScheme={colorScheme} />
    </PaperProvider>
  );
};

export default Main;
