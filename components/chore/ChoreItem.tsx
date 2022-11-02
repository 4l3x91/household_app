import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Badge, MD3Theme, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useUtils } from "../../hooks/useUtils";
import { Chore } from "../../store/chore/choreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { selectAllHouseholdMembers, selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import DisplayCompletedAvatars from "./DisplayCompletedAvatars";

type Props = {
  chore: Chore;
  editMode: boolean;
  toggleEditModal: () => void;
  setSelectedChore: React.Dispatch<React.SetStateAction<Chore | undefined>>;
  toggleDeleteModal: () => void;
  toggleArchiveModal: () => void;
  toggleAssignModal: () => void;
  assigned?: boolean;
};

const ChoreItem = ({
  chore,
  editMode,
  toggleEditModal,
  setSelectedChore,
  toggleDeleteModal,
  toggleArchiveModal,
  toggleAssignModal,
  assigned,
}: Props) => {
  const completedChores = useAppSelector(selectCompletedChores);
  const theme = useTheme();
  let dateToInterval: Date = new Date();
  const householdMembers = useAppSelector(selectAllHouseholdMembers);
  const today = new Date();
  const { addDays } = useUtils();
  const profile = useAppSelector(selectCurrentProfile);
  const completedForThisChore = completedChores.completedChores.filter((cc) => cc.choreId === chore.id).sort((a, b) => (a.date > b.date ? -1 : 1));

  if (completedForThisChore.length > 0) {
    dateToInterval = addDays(completedForThisChore[0].date, chore.interval);
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

  function handleAssignPress() {
    toggleAssignModal();
    setSelectedChore(chore);
  }

  return (
    <ChoreItemContainer archived={chore.archived} assigned={assigned} theme={theme}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text variant="headlineSmall">{chore.name} </Text>
          {chore.assignedToId !== "" && (
            <Text variant="bodyLarge">({householdMembers.find((member) => member.id === chore.assignedToId)?.avatar.avatar})</Text>
          )}
        </View>
        <Text variant="bodySmall">
          Behöver göras {chore.interval === 1 ? "varje" : `var ${chore.interval === 2 ? "annan" : `${chore.interval}:e`}`} dag
        </Text>
      </View>
      <InnerContainer>
        {completedForThisChore[0]?.date.toLocaleDateString() === today.toLocaleDateString() ? (
          <DisplayCompletedAvatars choreId={chore.id} />
        ) : timeLeft < 0 ? (
          <Badge size={30} style={{ backgroundColor: theme.colors.error, alignSelf: "center" }}>
            {-timeLeft}
          </Badge>
        ) : (
          timeLeft >= 0 && (
            <Badge size={30} style={{ backgroundColor: theme.colors.background, color: theme.colors.primary, alignSelf: "center" }}>
              {timeLeft}
            </Badge>
          )
        )}
        {editMode && profile?.role === "owner" && (
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

            <OwnerButton onPress={handleAssignPress}>
              <FontAwesome5 name="clipboard-list" size={20} color={theme.colors.primary} />
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
  justify-content: center;
`;

const ChoreItemContainer = styled(Surface)<{ archived: boolean; assigned?: boolean; theme?: MD3Theme }>`
  flex-direction: row;
  border-radius: 10px;
  margin: 5px;
  justify-content: space-between;
  padding: 15px;
  ${({ assigned, theme }) => assigned && `background-color: ${theme.colors.surfaceVariant}`}
  ${({ archived, theme }) => archived && `background-color: ${theme.colors.surfaceVariant}`}
`;

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const OwnerButton = styled.Pressable`
  padding: 10px 10px 10px 0;
`;

export default ChoreItem;
