import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import Main from "./Main";
import store from "./store/store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  );
};

export default App;
