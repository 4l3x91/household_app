import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ChorePieChart from "../../components/stats/ChorePieChart";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";

const PreviousWeekView = () => {
  const chores = useAppSelector(selectChores).chores;
  const width = Dimensions.get("screen").width;
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const completedChoresPreviousWeek = completedChores.filter(
    (x) =>
      x.date.toLocaleDateString() >= getLastWeeksMondayDate().toLocaleDateString() &&
      x.date.toLocaleDateString() <= getLastWeeksSundayDate().toLocaleDateString()
  );

  function getLastWeeksMondayDate() {
    const date = new Date();
    const day = date.getDay();
    const LastWeeksMondayDate = new Date();
    if (date.getDay() == 1) {
      LastWeeksMondayDate.setDate(date.getDate() - 7);
    } else {
      LastWeeksMondayDate.setDate(date.getDate() - (day + 6));
    }
    return LastWeeksMondayDate;
  }

  function getLastWeeksSundayDate() {
    const date = new Date();
    const day = date.getDay();
    const LastWeeksSundayDate = new Date();
    if (date.getDay() == 1) {
      LastWeeksSundayDate.setDate(date.getDate() - 1);
    } else {
      LastWeeksSundayDate.setDate(date.getDate() - day);
    }
    return LastWeeksSundayDate;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <ChorePieChart showAvatars={true} key={"all"} completedChores={completedChoresPreviousWeek} />
        <Text variant="bodyLarge" style={{ textAlign: "center", flexWrap: "wrap", width: "100%" }}>
          Totalt
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "center", alignItems: "center" }}>
        {chores.map((x) => {
          return (
            <View key={x.id} style={{ margin: 1, width: width / 3.05 }}>
              <ChorePieChart size={150} showAvatars={false} choosenChore={x.id} completedChores={completedChoresPreviousWeek} />
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

export default PreviousWeekView;
