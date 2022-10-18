import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  function handleSignOut() {
    signOut(auth);
    navigation.navigate("Welcome");
  }

  return (
    <View>
      <Text>MenuScreen</Text>
      <Button mode="contained" onPress={handleSignOut}>
        Logout
      </Button>
    </View>
  );
};

export default MenuScreen;
