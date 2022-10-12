import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { UserStackParams } from "../navigation/UserStackNavigator";

type Props = NativeStackScreenProps<UserStackParams>;

const UserProfileScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>UserProfileScreen</Text>
      <Pressable onPress={() => navigation.navigate("UserRewardScreen")}>
        <Text>Go to User Reward Screen</Text>
      </Pressable>
    </View>
  );
};

export default UserProfileScreen;
