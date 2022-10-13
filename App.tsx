import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./navigation";
import { getTheme } from "./theme";
import useColorScheme from "./hooks/useColorScheme";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={getTheme(colorScheme)}>
      <Navigation colorScheme={colorScheme} />
    </PaperProvider>
  );
}