import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const chores = useAppSelector(selectChores);
  
  return (
    <View style={{ backgroundColor: "lightgrey", flex: 1 }}>
      <Text>ChoresScreen</Text>
      {chores.chores.map((chore) => (
        <Pressable
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

            flexDirection: "row",
            borderRadius: 10,
            justifyContent: "space-between",
            margin: 5,
            padding: 10,
            backgroundColor: "white",
          }}
          key={chore.id}
          onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id })}
        >
          <View>
            <Text>{chore.name}</Text>
          </View>
          {chore.id === "one" ? (
            <View>
              <Text>🐷🐍🦊</Text>
            </View>
          ) : (
            <View style={{ backgroundColor: "#F2F2F2", borderRadius: 50, height: 25, width: 25, alignItems: "center", justifyContent: "center" }}>
              <Text>{chore.interval}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default ChoresScreen;
