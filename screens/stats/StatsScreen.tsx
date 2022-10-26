import React from "react";
import { View } from "react-native";
import ChorePieChart from "../../components/stats/ChorePieChart";
import { selectChores } from "../../store/chore/choreSelectors";
import { useAppSelector } from "../../store/store";

const StatsScreen = () => {
  const chores = useAppSelector(selectChores).chores;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <ChorePieChart showAvatars={true} key={"all"} />
      </View>
      <View style={{ flex: 0.5, backgroundColor: "red" }}>
        {chores.map((x) => {
          return <ChorePieChart key={x.id} size={150} showAvatars={false} choosenChore={x.id} />;
        })}
      </View>
    </View>
  );
};

export default StatsScreen;
