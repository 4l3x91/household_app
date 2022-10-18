import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { selectCompletedChores } from "../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const chores = useAppSelector(selectChores);
  const completedChores = useAppSelector(selectCompletedChores);
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Text>ChoresScreen</Text>
      {chores.chores.map((chore) => (
        <Pressable key={chore.id} onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id })}>
          <Surface
            style={{
              flexDirection: "row",
              borderRadius: 10,
              justifyContent: "space-between",
              margin: 5,
              padding: 10,
            }}
          >
            <View>
              <Text>{chore.name}</Text>
            </View>
            {completedChores.completedChores.find((cc) => cc.choreId === chore.id) ? (
              <View style={{ flexDirection: "row" }}>
                {completedChores.completedChores.map(
                  (cc) => cc.choreId === chore.id && <Text key={cc.profileId + "-" + cc.choreId + "-" + cc.date}>🐍</Text>
                )}
              </View>
            ) : completedChores.completedChores.find(
                (cc) => cc.choreId === chore.id && cc.date.setDate(cc.date.getDate() + chore.interval) > Date.now()
              ) ? (
              <Surface
                style={{
                  borderRadius: 50,
                  height: 25,
                  width: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.background,
                }}
              >
                <Text>{chore.interval}</Text>
              </Surface>
            ) : (
              <Surface
                style={{
                  borderRadius: 50,
                  height: 25,
                  width: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.notification,
                }}
              >
                <Text>{chore.interval}</Text>
              </Surface>
            )}
          </Surface>
        </Pressable>
      ))}
    </View>
  );
};

export default ChoresScreen;
