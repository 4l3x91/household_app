import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { selectChore } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

const ChoreDetailsScreen = () => {
  const chore = useAppSelector(selectChore);
  return (
    <View>
      <Text>Chore Id: {chore.chore.id}</Text>
      <Text>{chore.chore.name}</Text>
      <Text>{chore.chore.description}</Text>
    </View>
  );
};

export default ChoreDetailsScreen;
