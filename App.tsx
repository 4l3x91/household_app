import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import Navigation from "./navigation";
import store from "./store/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}
