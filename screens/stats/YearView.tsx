import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ChorePieChart from "../../components/stats/ChorePieChart";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";

const YearView = () => {
  const chores = useAppSelector(selectChores).chores;
  const width = Dimensions.get("screen").width;
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const firstDayOfTheYear = new Date(new Date().getFullYear(), 0, 1);
  const completedChoresThisYear = completedChores.filter((x) => x.date.toLocaleDateString() >= firstDayOfTheYear.toLocaleDateString());

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <ChorePieChart showAvatars={true} key={"all"} completedChores={completedChoresThisYear} />
        <Text variant="bodyLarge" style={{ textAlign: "center", flexWrap: "wrap", width: "100%" }}>
          Totalt
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "center", alignItems: "center" }}>
        {chores.map((x) => {
          return (
            <View key={x.id} style={{ margin: 1, width: width / 3.05 }}>
              <ChorePieChart size={150} showAvatars={false} choosenChore={x.id} completedChores={completedChoresThisYear} />
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

export default YearView;
