import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ChorePieChart from "../../components/stats/ChorePieChart";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";

const MonthView = () => {
  const chores = useAppSelector(selectChores).chores;
  const width = Dimensions.get("screen").width;
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const completedChoresLastMonth = completedChores.filter(
    (x) =>
      x.date.toLocaleDateString() >= getFirstDayPreviousMonth().toLocaleDateString() &&
      x.date.toLocaleDateString() <= getLastDayPreviousMonth().toLocaleDateString()
  );

  function getFirstDayPreviousMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  function getLastDayPreviousMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <ChorePieChart showAvatars={true} key={"all"} completedChores={completedChoresLastMonth} />
        <Text variant="bodyLarge" style={{ textAlign: "center", flexWrap: "wrap", width: "100%" }}>
          Totalt
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "center", alignItems: "center" }}>
        {chores.map((x) => {
          return (
            <View key={x.id} style={{ margin: 1, width: width / 3.05 }}>
              <ChorePieChart size={150} showAvatars={false} choosenChore={x.id} completedChores={completedChoresLastMonth} />
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

export default MonthView;
