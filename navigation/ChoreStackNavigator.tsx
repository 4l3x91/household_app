import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChoreDetailsScreen from "../screens/ChoreDetailsScreen";
import ChoresScreen from "../screens/ChoresScreen";

export type ChoreStackParams = {
  ChoresScreen: undefined;
  ChoreDetailsScreen: { id: string };
};
const ChoreStack = createNativeStackNavigator<ChoreStackParams>();

const ChoreStackNavigator = () => {
  return (
    <ChoreStack.Navigator initialRouteName="ChoresScreen">
      <ChoreStack.Screen name="ChoresScreen" component={ChoresScreen} />
      <ChoreStack.Screen name="ChoreDetailsScreen" component={ChoreDetailsScreen} />
    </ChoreStack.Navigator>
  );
};

export default ChoreStackNavigator;
