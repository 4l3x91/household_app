import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import CreateHousehold from "../components/createHousehold";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
      }
    });
  }

  return (
    <View>
      <Text>MenuScreen</Text>
      <CreateHousehold />
      <Button mode="contained" onPress={handleSignOut}>
        Logout
      </Button>
    </View>
  );
};

export default MenuScreen;
