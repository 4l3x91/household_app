import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { Chore } from "../../store/chore/choreModel";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import ChoreItem from "./ChoreItem";
import EditModals from "./EditModals";

interface Props {
  editMode: boolean;
  archived?: boolean;
  asignedChores?: boolean;
}

type ChoreListNavProp = NativeStackNavigationProp<ChoreStackParams>;

const ChoreList = ({ editMode, archived, asignedChores }: Props) => {
  const navigation = useNavigation<ChoreListNavProp>();
  const chores = useAppSelector(selectChores);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [archiveModalVisible, setArchiveModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedChore, setSelectedChore] = useState<Chore>();
  const profile = useAppSelector(selectCurrentProfile);
  const { colors } = useTheme();

  const closeModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setArchiveModalVisible(false);
    setAssignModalVisible(false);
  };

  if (asignedChores) {
    return (
      <View>
        {chores.chores.filter((chore) => chore.assignedToId !== "").length > 0 && (
          <Text variant="bodyLarge" style={{ alignSelf: "center" }}>
            Alla tilldelade sysslor
          </Text>
        )}

        {chores.chores.map(
          (chore) =>
            chore.assignedToId !== "" && (
              <View key={chore.id}>
                <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                  <ChoreItem
                    setSelectedChore={setSelectedChore}
                    chore={chore}
                    editMode={editMode}
                    toggleEditModal={() => setEditModalVisible((prev) => !prev)}
                    toggleDeleteModal={() => setDeleteModalVisible((prev) => !prev)}
                    toggleArchiveModal={() => setArchiveModalVisible((prev) => !prev)}
                    toggleAssignModal={() => setAssignModalVisible((prev) => !prev)}
                  />
                </Pressable>
              </View>
            )
        )}

        {selectedChore && (
          <EditModals
            chore={selectedChore}
            editModalVisible={editModalVisible}
            deleteModalVisible={deleteModalVisible}
            archiveModalVisible={archiveModalVisible}
            assignModalVisible={assignModalVisible}
            closeModal={closeModal}
          />
        )}
      </View>
    );
  }
  if (archived) {
    return (
      <View>
        {chores.chores.filter((chore) => chore.archived).length > 0 && (
          <Text variant="bodyLarge" style={{ alignSelf: "center" }}>
            Arkiverade sysslor
          </Text>
        )}

        {chores.chores.map(
          (chore) =>
            chore.archived && (
              <View key={chore.id}>
                <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                  <ChoreItem
                    setSelectedChore={setSelectedChore}
                    chore={chore}
                    editMode={editMode}
                    toggleEditModal={() => setEditModalVisible((prev) => !prev)}
                    toggleDeleteModal={() => setDeleteModalVisible((prev) => !prev)}
                    toggleArchiveModal={() => setArchiveModalVisible((prev) => !prev)}
                    toggleAssignModal={() => setAssignModalVisible((prev) => !prev)}
                  />
                </Pressable>
              </View>
            )
        )}
        {selectedChore && (
          <EditModals
            chore={selectedChore}
            editModalVisible={editModalVisible}
            deleteModalVisible={deleteModalVisible}
            archiveModalVisible={archiveModalVisible}
            assignModalVisible={assignModalVisible}
            closeModal={closeModal}
          />
        )}
      </View>
    );
  }

  return (
    <View>
      {chores.chores.length !== 0 && !profile?.isPaused && profile?.isApproved ? (
        <>
          {chores.chores.map(
            (chore) =>
              !chore.archived &&
              !chore.assignedToId && (
                <View key={chore.id}>
                  <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                    <ChoreItem
                      setSelectedChore={setSelectedChore}
                      chore={chore}
                      editMode={editMode}
                      toggleEditModal={() => setEditModalVisible((prev) => !prev)}
                      toggleDeleteModal={() => setDeleteModalVisible((prev) => !prev)}
                      toggleArchiveModal={() => setArchiveModalVisible((prev) => !prev)}
                      toggleAssignModal={() => setAssignModalVisible((prev) => !prev)}
                    />
                  </Pressable>
                </View>
              )
          )}
          {chores.chores.find((chore) => chore.assignedToId === profile?.id) && (
            <>
              <Text variant="bodyLarge" style={{ alignSelf: "center" }}>
                Sysslor som tilldelats dig
              </Text>
              {chores.chores.map(
                (chore) =>
                  chore.assignedToId === profile?.id && (
                    <View key={chore.id}>
                      <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                        <ChoreItem
                          setSelectedChore={setSelectedChore}
                          chore={chore}
                          editMode={editMode}
                          toggleEditModal={() => setEditModalVisible((prev) => !prev)}
                          toggleDeleteModal={() => setDeleteModalVisible((prev) => !prev)}
                          toggleArchiveModal={() => setArchiveModalVisible((prev) => !prev)}
                          toggleAssignModal={() => setAssignModalVisible((prev) => !prev)}
                          assigned
                        />
                      </Pressable>
                    </View>
                  )
              )}
            </>
          )}
        </>
      ) : (
        <CenteredContainer>
          <Text style={{ color: colors.primary }}>H??r var det tomt!</Text>
        </CenteredContainer>
      )}

      {selectedChore && (
        <EditModals
          chore={selectedChore}
          editModalVisible={editModalVisible}
          deleteModalVisible={deleteModalVisible}
          archiveModalVisible={archiveModalVisible}
          assignModalVisible={assignModalVisible}
          closeModal={closeModal}
        />
      )}
    </View>
  );
};

export default ChoreList;

const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
