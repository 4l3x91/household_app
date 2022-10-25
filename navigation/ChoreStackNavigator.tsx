import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChoreDetailsScreen from "../screens/ChoreDetailsScreen";
import ChoresScreen from "../screens/ChoresScreen";
import { selectHousehold } from "../store/household/householdSelector";
import { useAppSelector } from "../store/store";

export type ChoreStackParams = {
  ChoresScreen: undefined;
  ChoreDetailsScreen: { id: string; name: string };
};
const ChoreStack = createNativeStackNavigator<ChoreStackParams>();

const ChoreStackNavigator = () => {
  const { household } = useAppSelector(selectHousehold);

  return (
    <ChoreStack.Navigator initialRouteName="ChoresScreen">
      <ChoreStack.Screen name="ChoresScreen" component={ChoresScreen} options={{ headerShown: false }} />
      <ChoreStack.Screen name="ChoreDetailsScreen" component={ChoreDetailsScreen} options={({ route }) => ({ title: route.params.name })} />
    </ChoreStack.Navigator>
  );
};

export default ChoreStackNavigator;
