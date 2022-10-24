import React from "react";
import { Text, View } from "react-native";
import { Badge, Surface, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../store/chore/choreModel";
import { selectCompletedChores } from "../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../store/store";

type Props = {
  chore: Chore;
};

const ChoreItem = ({ chore }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores);
  const theme: Theme = useTheme();

  return (
    <ChoreItemContainer>
      <View>
        <Text style={{ color: theme.colors.primary }}>{chore.name}</Text>
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
        <Badge style={{ backgroundColor: theme.colors.error }}>{chore.interval}</Badge>
      ) : (
        <Badge style={{ backgroundColor: theme.colors.background, color: theme.colors.primary }}>{chore.interval}</Badge>
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

export default ChoreItem;
