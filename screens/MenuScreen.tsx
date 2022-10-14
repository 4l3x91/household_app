import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>MenuScreen</Text>
      <Button mode="contained" onPress={() => navigation.replace("Welcome")}>
        Logout
      </Button>
    </View>
  );
};

export default MenuScreen;
