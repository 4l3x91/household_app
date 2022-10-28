import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { useAppSelector } from "../../store/store";
import { addDays } from "../../utils/utils";
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
  let dateToInterval: Date = new Date();
  const [isOverdue, setIsOverdue] = useState(false);
  const today = new Date();
  const completedForThisChore = completedChores.completedChores.filter((cc) => cc.choreId === chore.id).sort((a, b) => (a.date > b.date ? -1 : 1));

  if (completedForThisChore.length > 0) {
    completedForThisChore.find((cc) => {
      dateToInterval = addDays(cc.date, chore.interval);
    });
  } else {
    dateToInterval = addDays(chore.dateCreated, chore.interval);
  }
  const timeLeft = Math.round((dateToInterval.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));

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
        <Text variant="headlineSmall">{chore.name}</Text>
        {isOverdue ? (
          <Text variant="bodySmall">
            Försenad {-timeLeft} {-timeLeft === 1 ? "dag" : "dagar "}
          </Text>
        ) : (
          <Text variant="bodySmall">Ska göras {timeLeft === 0 ? "idag" : "inom " + (timeLeft + 1) + " dagar"}</Text>
        )}
      </View>
      <InnerContainer>
        {completedForThisChore[0]?.date.toLocaleDateString() === today.toLocaleDateString() ? (
          <DisplayCompletedAvatars choreId={chore.id} />
        ) : dateToInterval.toLocaleDateString() < today.toLocaleDateString() ||
          chore.dateCreated.toLocaleDateString() > today.toLocaleDateString() ? (
          (!isOverdue && setIsOverdue(true),
          (
            <Badge size={30} style={{ backgroundColor: theme.colors.error, alignSelf: "center" }}>
              {chore.interval}
            </Badge>
          ))
        ) : (
          chore.dateCreated.toLocaleDateString() < today.toLocaleDateString() &&
          (isOverdue && setIsOverdue(false),
          (
            <Badge size={30} style={{ backgroundColor: theme.colors.background, color: theme.colors.primary, alignSelf: "center" }}>
              {chore.interval}
            </Badge>
          ))
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
  padding: 15px;
  ${({ archived }) => archived && "opacity: .6;"}
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
