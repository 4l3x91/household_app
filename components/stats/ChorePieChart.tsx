import React from "react";
import { View } from "react-native";
import PieChartComp, { Data } from "../../components/stats/PieChartComp";
import { selectChores } from "../../store/chore/choreSelectors";
import { completedChoreModel } from "../../store/completedChore/completedChoreModel";
import { selectAllHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = {
  choosenChore?: string;
  size?: number;
  showAvatars: boolean;
  completedChores: completedChoreModel[];
};

const ChorePieChart = ({ choosenChore, size, showAvatars, completedChores }: Props) => {
  const householdMembers = useAppSelector(selectAllHouseholdMembers);
  const householdChores = useAppSelector(selectChores).chores;

  const init: Data[] = householdMembers
    .map((member) => {
      const key = member.id;
      const completedChoresByMember: completedChoreModel[] = completedChores.filter((chore) => chore.profileId === member.id);
      const statistics: number = completedChoresByMember.reduce((acc, curr) => {
        const currentChore = householdChores.find((x) => x.id === curr.choreId && (choosenChore ? curr.choreId === choosenChore : true));
        acc += currentChore ? currentChore.energy : 0;
        return acc;
      }, 0);

      return statistics > 0
        ? {
            key: key,
            value: statistics,
            avatar: member.avatar.avatar,
            svg: { fill: member.avatar.color },
          }
        : { key: -1 };
    })
    .filter((x) => x.key !== -1);

  const data = init.filter((x) => x.value !== 0);

  return (
    <View>
      <PieChartComp data={data} size={size} showAvatars={showAvatars} />
    </View>
  );
};

export default ChorePieChart;
