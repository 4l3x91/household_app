import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import ChoreItem from "../components/ChoreItem";
import ValuePicker from "../components/ValuePicker";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const chores = useAppSelector(selectChores);

  return (
      <Text>ChoresScreen</Text>
      {chores.chores.map((chore) => (
        <Pressable key={chore.id} onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id })}>
          <ChoreItem chore={chore} />
        </Pressable>
      ))}
    </View>
  );
};

const ItemContainer = styled.View`
  margin: 5px;
`;

export default ChoresScreen;
