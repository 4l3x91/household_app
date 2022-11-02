import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "react-native-paper";
import { useFirestoreListeners } from "../hooks/useFirestoreListeners";
import {
  selectCompletedChoresLastMonth,
  selectCompletedChoresPreviousWeek,
  selectCompletedChoresSinceLastMonday,
  selectCompletedChoresThisYear,
} from "../store/completedChore/completedChoreSelector";
import { selectMemoizedCurrentProfile, selectMemoizedPendingProfiles } from "../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import ChoreStackNavigator, { ChoreStackParams } from "./ChoreStackNavigator";
import { MenuStackParams } from "./MenuStackNavigator";
import { RootStackParams } from "./RootStackNavigator";
import StatsStackNavigator, { StatsStackParams } from "./StatsStackNavigator";
import UserStackNavigator, { UserStackParams } from "./UserStackNavigator";

export type BottomTabStackParams = {
  Chores: NavigatorScreenParams<ChoreStackParams>;
  Stats: NavigatorScreenParams<StatsStackParams>;
  UserProfile: NavigatorScreenParams<UserStackParams>;
  Menu: NavigatorScreenParams<MenuStackParams>;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParams, "Chores">,
  NativeStackScreenProps<RootStackParams, "Welcome">
>;

const BottomStack = createBottomTabNavigator<BottomTabStackParams>();

const TabStackNavigator = () => {
  const user = useAppSelector(selectUser);
  const currentProfile = useAppSelector(selectMemoizedCurrentProfile);
  const nrOfPendingProfiles = useAppSelector(selectMemoizedPendingProfiles).length;

  const completedChoresSinceLastMonday = useAppSelector(selectCompletedChoresSinceLastMonday);
  const completedChoresPreviousWeek = useAppSelector(selectCompletedChoresPreviousWeek);
  const completedChoresLastMonth = useAppSelector(selectCompletedChoresLastMonth);
  const completedChoresThisYear = useAppSelector(selectCompletedChoresThisYear);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  useFirestoreListeners();

  // useEffect(() => {
  //   console.log("useEffect running");
  //   const profilesCollection = collection(db, "profiles");
  //   const q = query(profilesCollection, where("isApproved", "==", false), where("householdId", "==", currentProfile?.householdId));

  //   onSnapshot(q, (snapshot) => {
  //     if (user) {
  //       dispatch(getAllProfiles(user));
  //       console.log("in snapshot");
  //     }
  //   });
  // }, []);

  const hasDate =
    completedChoresLastMonth.length > 0 ||
    completedChoresPreviousWeek.length > 0 ||
    completedChoresSinceLastMonday.length > 0 ||
    completedChoresThisYear.length > 0;

  return (
    <BottomStack.Navigator
      initialRouteName="Chores"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.primaryContainer,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomStack.Screen
        name="Chores"
        component={ChoreStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Sysslor",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="broom" size={size} color={color} />,
        }}
      />
      {hasDate && (
        <BottomStack.Screen
          name="Stats"
          component={StatsStackNavigator}
          options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="pie-chart" size={size} color={color} />, headerShown: false }}
        />
      )}
      <BottomStack.Screen
        name="UserProfile"
        component={UserStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
          tabBarBadge: currentProfile?.role === "owner" ? (nrOfPendingProfiles > 0 ? nrOfPendingProfiles : undefined) : undefined,
          tabBarLabel: "Profil",
        }}
      />
    </BottomStack.Navigator>
  );
};

export default TabStackNavigator;
