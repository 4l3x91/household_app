import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>ChoresScreen</Text>
      <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen")}>
        <Text>Go to Chore detail screen</Text>
      </Pressable>
    </View>
  );
};

export default ChoresScreen;
