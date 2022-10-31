import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import CurrentWeekView from "../screens/stats/CurrentWeekView";
import MonthView from "../screens/stats/MonthView";
import PreviousWeekView from "../screens/stats/PreviousWeekView";
import YearView from "../screens/stats/YearView";

const Tab = createMaterialTopTabNavigator();

export type StatsStackParams = {
  StatsScreen: undefined;
};

const StatsStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen name="Denna veckan" component={CurrentWeekView} />
      <Tab.Screen name="Förra veckan" component={PreviousWeekView} />
      <Tab.Screen name="Månad" component={MonthView} />
      <Tab.Screen name="År" component={YearView} />
    </Tab.Navigator>
  );
};

function CustomTabBar(props: MaterialTopTabBarProps) {
  const { colors } = useTheme();
  const { index, routeNames, routes } = props.state;
  return (
    <TopBarContainer>
      <Button onPress={() => props.jumpTo(index === 0 ? routes[index].key : routes[index - 1].key)}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color={colors.primary} />
      </Button>
      <Text style={{ fontSize: 24, color: colors.primary, textAlign: "center" }}>{routeNames[index]}</Text>
      <Button onPress={() => props.jumpTo(index === routes.length - 1 ? routes[index].key : routes[index + 1].key)}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.primary} />
      </Button>
    </TopBarContainer>
  );
}

export default StatsStackNavigator;

const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 75px 10px 0px 10px;
`;
