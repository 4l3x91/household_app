import React from "react";
import { View } from "react-native";
import PieChartComp, { Data } from "../../components/stats/PieChartComp";
import { selectChores } from "../../store/chore/choreSelectors";
import { completedChoreModel } from "../../store/completedChore/completedChoreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { selectAllHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = {
  choosenChore?: string;
  size?: number;
  showAvatars: boolean;
};

const ChorePieChart = ({ choosenChore, size, showAvatars }: Props) => {
  const householdMembers = useAppSelector(selectAllHouseholdMembers);
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const householdChores = useAppSelector(selectChores).chores;

  const data: Data[] = householdMembers
    .map((member) => {
      const key = member.id;
      const completedChoresByMember: completedChoreModel[] = completedChores.filter((chore) => chore.profileId === member.id);
      const statistics: number = completedChoresByMember.reduce((acc, curr) => {
        const currChore = householdChores.find((x) => (x.id === curr.choreId && choosenChore ? curr.choreId === choosenChore : true));
        acc += currChore ? currChore.energy : 0;
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

  return (
    <View>
      <PieChartComp data={data} size={size} showAvatars={showAvatars} />
    </View>
  );
};

export default ChorePieChart;
