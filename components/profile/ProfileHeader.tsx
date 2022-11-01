import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

interface Props {
  openMyHouseholds: () => void;
  goToSettings: () => void;
}

const ProfileHeader = ({ openMyHouseholds, goToSettings }: Props) => {
  const profile = useAppSelector(selectCurrentProfile);
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Constants.statusBarHeight }}>
        <Button onPress={() => openMyHouseholds()}>
          <Text variant="titleLarge">
            {profile?.avatar.avatar} {profile?.profileName}
          </Text>
        </Button>
        <Button
          onPress={() => {
            goToSettings();
          }}
        >
          <FontAwesome size={20} name="cog" />
        </Button>
      </View>
    </View>
  );
};

export default ProfileHeader;
