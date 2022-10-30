import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HouseholdOptionsScreen from "../screens/HouseholdOptionsScreen";
import CreateUserScreen from "../screens/user/CreateUserScreen";
import LoginScreen from "../screens/user/LoginScreen";
import WelcomeScreen from "../screens/user/WelcomeScreen";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import TabStackNavigator from "./TabStackNavigator";

export type RootStackParams = {
  Welcome: undefined;
  Login: undefined;
  TabStack: undefined;
  CreateUser: undefined;
  HouseholdOptions: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const user = useAppSelector(selectUser);
  return (
    <RootStack.Navigator>
      {!user && (
        <>
          <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Logga in", headerBackVisible: false }} />
          <RootStack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerTitle: "Registrera konto", headerBackVisible: false }} />
        </>
      )}
      {user && (
        <>
          <RootStack.Screen name="TabStack" component={TabStackNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="HouseholdOptions" component={HouseholdOptionsScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
