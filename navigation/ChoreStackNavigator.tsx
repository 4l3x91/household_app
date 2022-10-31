import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChoreDetailsScreen from "../screens/chore/ChoreDetailsScreen";
import ChoresScreen from "../screens/chore/ChoresScreen";

export type ChoreStackParams = {
  ChoresScreen: undefined;
  ChoreDetailsScreen: { id: string; name: string };
};
const ChoreStack = createNativeStackNavigator<ChoreStackParams>();

const ChoreStackNavigator = () => {
  return (
    <ChoreStack.Navigator initialRouteName="ChoresScreen">
      <ChoreStack.Screen name="ChoresScreen" component={ChoresScreen} options={{ headerShown: false }} />
      <ChoreStack.Screen
        name="ChoreDetailsScreen"
        component={ChoreDetailsScreen}
        options={({ route }) => ({ title: route.params.name, headerShown: false })}
      />
    </ChoreStack.Navigator>
  );
};

export default ChoreStackNavigator;
