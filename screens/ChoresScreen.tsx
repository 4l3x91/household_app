import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import ChoreItem from "../components/ChoreItem";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const chores = useAppSelector(selectChores);

  return (
<View style={{ flex: 1 }}>
      <Text>ChoresScreen</Text>
      {chores.chores.map((chore) => (
        <Pressable key={chore.id} onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id })}>
          <ChoreItem chore={chore} />
        </Pressable>
      ))}
    </View>
  );
};

export default ChoresScreen;
