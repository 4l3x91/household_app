import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ChorePieChart from "../../components/stats/ChorePieChart";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";

const CurrentWeekView = () => {
  const chores = useAppSelector(selectChores).chores;
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const width = Dimensions.get("screen").width;
  const completedChoresSinceLastMonday = completedChores.filter((x) => x.date.toLocaleDateString() >= getPreviousMonday().toLocaleDateString());

  function getPreviousMonday() {
    const date = new Date();
    const day = date.getDay();
    const prevMonday = new Date();
    if (date.getDay() == 1) {
      prevMonday.setDate(date.getDate());
    } else {
      prevMonday.setDate(date.getDate() - (day - 1));
    }
    return prevMonday;
  }

  console.log(getPreviousMonday().toLocaleDateString());
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <ChorePieChart showAvatars={true} key={"all"} completedChores={completedChoresSinceLastMonday} />
        <Text variant="bodyLarge" style={{ textAlign: "center", flexWrap: "wrap", width: "100%" }}>
          Totalt
        </Text>
      </View>
      <View></View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "center", alignItems: "center" }}>
        {chores.map((x) => {
          return (
            <View key={x.id} style={{ margin: 1, width: width / 3.05 }}>
              <ChorePieChart size={150} showAvatars={false} choosenChore={x.id} completedChores={completedChoresSinceLastMonday} />
              <Text
                variant="bodyLarge"
                style={{ justifyContent: "center", alignItems: "center", textAlign: "center", flexWrap: "wrap", width: "100%", minHeight: 50 }}
              >
                {x.name}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CurrentWeekView;
