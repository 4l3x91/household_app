import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Badge, Surface, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";

type Props = {
  chore: Chore;
  editPressed: boolean;
  toggleModal: () => void;
};

const ChoreItem = ({ chore, editPressed, toggleModal }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores);
  const theme = useTheme();

  return (
    <ChoreItemContainer>
      <View>
        <ChoreName theme={theme}>{chore.name}</ChoreName>
      </View>
      <InnerContainer>
        {completedChores.completedChores.find((cc) => cc.choreId === chore.id) ? (
          <AvatarContainer>
            {completedChores.completedChores.map(
              (cc) => cc.choreId === chore.id && <Text key={cc.profileId + "-" + cc.choreId + "-" + cc.date}>🐍</Text>
            )}
          </AvatarContainer>
        ) : completedChores.completedChores.find(
            (cc) => cc.choreId === chore.id && cc.date.setDate(cc.date.getDate() + chore.interval) > Date.now()
          ) ? (
          <Badge style={{ backgroundColor: theme.colors.error, alignSelf: "center" }}>{chore.interval}</Badge>
        ) : (
          <Badge style={{ backgroundColor: theme.colors.background, color: theme.colors.primary, alignSelf: "center" }}>{chore.interval}</Badge>
        )}
        {editPressed && (
          <CogButton onPress={toggleModal}>
            <FontAwesome style={{ marginLeft: 10 }} name="cog" size={25} color={theme.colors.primary} />
          </CogButton>
        )}
      </InnerContainer>
    </ChoreItemContainer>
  );
};

const ChoreItemContainer = styled(Surface)`
  flex-direction: row;
  border-radius: 10px;
  margin: 5px;
  justify-content: space-between;
`;

const ChoreName = styled.Text<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.primary};
  padding: 15px;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const CogButton = styled.Pressable`
  padding: 10px 10px 10px 0;
`;

export default ChoreItem;
