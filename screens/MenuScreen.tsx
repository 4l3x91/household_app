import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>MenuScreen</Text>
      <Pressable onPress={() => navigation.replace("Welcome")}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default MenuScreen;
