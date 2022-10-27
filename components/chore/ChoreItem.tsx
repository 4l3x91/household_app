import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Badge, Surface, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";
import DisplayCompletedAvatars from "./DisplayCompletedAvatars";

type Props = {
  chore: Chore;
  editMode: boolean;
  toggleEditModal: () => void;
  setSelectedChore: React.Dispatch<React.SetStateAction<Chore | undefined>>;
  toggleDeleteModal: () => void;
  toggleArchiveModal: () => void;
};

const ChoreItem = ({ chore, editMode: editPressed, toggleEditModal, setSelectedChore, toggleDeleteModal, toggleArchiveModal }: Props) => {
  const completedChores = useAppSelector(selectCompletedChores);
  const theme = useTheme();

  function handleEditPress() {
    toggleEditModal();
    setSelectedChore(chore);
  }

  function handleDeletePress() {
    toggleDeleteModal();
    setSelectedChore(chore);
  }

  function handleArchivePress() {
    toggleArchiveModal();
    setSelectedChore(chore);
  }

  return (
    <ChoreItemContainer archived={chore.archived}>
      <View>
        <ChoreName theme={theme}>{chore.name}</ChoreName>
      </View>
      <InnerContainer>
        {completedChores.completedChores.find((cc) => cc.choreId === chore.id) ? (
          <DisplayCompletedAvatars choreId={chore.id} />
        ) : completedChores.completedChores.find(
            (cc) => cc.choreId === chore.id && cc.date.setDate(cc.date.getDate() + chore.interval) > Date.now()
          ) ? (
          <Badge style={{ backgroundColor: theme.colors.error, alignSelf: "center" }}>{chore.interval}</Badge>
        ) : (
          <Badge style={{ backgroundColor: theme.colors.background, color: theme.colors.primary, alignSelf: "center" }}>{chore.interval}</Badge>
        )}
        {editPressed && (
          <OwnerButtons>
            <OwnerButton onPress={handleEditPress}>
              <FontAwesome style={{ marginLeft: 10 }} name="cog" size={20} color={theme.colors.primary} />
            </OwnerButton>
            <OwnerButton onPress={handleDeletePress}>
              <FontAwesome5 name="trash-alt" size={20} color={theme.colors.primary} />
            </OwnerButton>
            <OwnerButton onPress={handleArchivePress}>
              <FontAwesome5 name="archive" size={20} color={theme.colors.primary} />
            </OwnerButton>
          </OwnerButtons>
        )}
      </InnerContainer>
    </ChoreItemContainer>
  );
};

const OwnerButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChoreItemContainer = styled(Surface)<{ archived: boolean }>`
  flex-direction: row;
  border-radius: 10px;
  margin: 5px;
  justify-content: space-between;
  ${({ archived }) => archived && "opacity: .6;"}
`;

const ChoreName = styled.Text<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.primary};
  padding: 15px;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const OwnerButton = styled.Pressable`
  padding: 10px 10px 10px 0;
`;

const TrashButton = styled.Pressable`
  padding: 10px 10px 10px 0;
`;

export default ChoreItem;
