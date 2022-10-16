import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { UserStackParams } from "../navigation/UserStackNavigator";
import { selectProfile } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<UserStackParams>;

const UserProfileScreen = ({ navigation }: Props) => {
  const profile = useAppSelector(selectProfile);
  return (
    <View>
      <Text style={{ alignSelf: "center", marginBottom: 30 }}>UserProfileScreen</Text>
      <Text>Profile Id: {profile.profile.id}</Text>
      <Text>User Id: {profile.profile.userId}</Text>
      <Text>Household Id:{profile.profile.householdId}</Text>
      <Text>Profile name: {profile.profile.profileName}</Text>
      <Image source={{ uri: profile.profile.avatar }} style={{ width: 80, height: 80 }} />
      <Pressable onPress={() => navigation.navigate("UserRewardScreen")}>
        <Text>Go to User Reward Screen</Text>
      </Pressable>
    </View>
  );
};

export default UserProfileScreen;
