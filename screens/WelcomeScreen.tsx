import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>WelcomeScreen</Text>
      <Pressable onPress={() => navigation.replace("TabStack")}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;
