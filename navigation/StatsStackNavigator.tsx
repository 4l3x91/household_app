import React from "react";
import StatsScreen from "../screens/stats/StatsScreen";

export type StatsStackParams = {
  StatsScreen: undefined;
};

const StatsStackNavigator = () => {
  return <StatsScreen />;
};

export default StatsStackNavigator;
