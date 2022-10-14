import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store/store";
import { getTheme } from "./theme";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={getTheme(colorScheme)}>
        <Navigation colorScheme={colorScheme} />
      </PaperProvider>
    </ReduxProvider>
  );
}
