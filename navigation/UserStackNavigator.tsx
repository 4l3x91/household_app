import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Badge, Button, Text } from "react-native-paper";
import ProfileRewardScreen from "../screens/profile/ProfileRewardScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { selectCurrentProfile } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";
import { selectUserEmail } from "../store/user/userSelectors";
import { convertToRGB } from "../utils/utils";

export type UserStackParams = {
  UserProfileScreen: undefined;
  UserRewardScreen: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParams>();

const UserStackNavigator = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const profile = useAppSelector(selectCurrentProfile);

  const avatarColor = (alpha: number) => {
    if (profile) {
      return convertToRGB(profile?.avatar.color, alpha);
    }
  };
  return (
    <UserStack.Navigator initialRouteName="UserProfileScreen">
      <UserStack.Screen
        name="UserProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <>
              <Button onPress={() => alert("Show related profiles in modalize hier!")}>
                <Text variant="titleLarge">
                  {profile?.avatar.avatar} {profile?.profileName}
                </Text>
              </Button>
              {/* Do we want this? */}
              <Badge style={{ marginHorizontal: -5, alignSelf: "flex-start" }}>99+</Badge>
            </>
          ),
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: avatarColor(0.8),
          },
        }}
      />
      <UserStack.Screen name="UserRewardScreen" component={ProfileRewardScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
