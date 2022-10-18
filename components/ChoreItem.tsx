import React from "react";
import { Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Chore from "../store/chore/choreModel";
import { selectCompletedChores } from "../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../store/store";

type Props = {
  chore: Chore;
};

const ChoreItem = ({ chore }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores);
  const { colors } = useTheme();

  return (
    <ChoreItemContainer>
      <View>
        <Text>{chore.name}</Text>
      </View>
      {completedChores.completedChores.find((cc) => cc.choreId === chore.id) ? (
        <AvatarContainer>
          {completedChores.completedChores.map(
            (cc) => cc.choreId === chore.id && <Text key={cc.profileId + "-" + cc.choreId + "-" + cc.date}>🐍</Text>
          )}
        </AvatarContainer>
      ) : completedChores.completedChores.find(
          (cc) => cc.choreId === chore.id && cc.date.setDate(cc.date.getDate() + chore.interval) > Date.now()
        ) ? (
        <ChoreCircle colors={colors.notification}>
          <ChoreCircleText colors={colors.text}>{chore.interval}</ChoreCircleText>
        </ChoreCircle>
      ) : (
        <ChoreCircle colors={colors.background}>
          <ChoreCircleText colors={colors.text}>{chore.interval}</ChoreCircleText>
        </ChoreCircle>
      )}
    </ChoreItemContainer>
  );
};

const ChoreItemContainer = styled(Surface)`
  flex-direction: row;
  border-radius: 10px;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
`;

const ChoreCircle = styled(Surface)<{ colors: string }>`
  border-radius: 50px;
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${({ colors }) => colors};
`;

const ChoreCircleText = styled.Text<{ colors: string }>`
  color: ${({ colors }) => colors};
`;

export default ChoreItem;
