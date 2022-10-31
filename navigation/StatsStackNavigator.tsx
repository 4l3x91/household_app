import React from "react";
import YearView from "../screens/stats/YearView";

import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import CurrentWeekView from "../screens/stats/CurrentWeekView";
import MonthView from "../screens/stats/MonthView";
import PreviousWeekView from "../screens/stats/PreviousWeekView";

const Tab = createMaterialTopTabNavigator();

export type StatsStackParams = {
  StatsScreen: undefined;
};

const StatsStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen name="Denna vecka" component={CurrentWeekView} />
      <Tab.Screen name="Vecka" component={PreviousWeekView} />
      <Tab.Screen name="Månad" component={MonthView} />
      <Tab.Screen name="År" component={YearView} />
    </Tab.Navigator>
  );
};

function CustomTabBar(props: MaterialTopTabBarProps) {
  const { index, routeNames, routes } = props.state;
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", width: "100%" }}>
      <Button style={{ flex: 0.2 }} onPress={() => props.jumpTo(index === 0 ? routes[index].key : routes[index - 1].key)}>
        <Text> {"<"} </Text>
      </Button>
      <Text style={{ flex: 1, textAlign: "center" }}>{routeNames[index]}</Text>
      <Button style={{ flex: 0.2 }} onPress={() => props.jumpTo(index === routes.length - 1 ? routes[index].key : routes[index + 1].key)}>
        <Text> {">"} </Text>
      </Button>
    </View>
  );
}

export default StatsStackNavigator;
