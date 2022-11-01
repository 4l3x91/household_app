import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { Chore } from "../../store/chore/choreModel";
import { selectChores } from "../../store/chore/choreSelectors";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import ArchiveChore from "./ArchiveChore";
import ChoreItem from "./ChoreItem";
import DeleteChore from "./DeleteChore";
import EditChore from "./EditChore";

interface Props {
  editMode: boolean;
  archived?: boolean;
}

type ChoreListNavProp = NativeStackNavigationProp<ChoreStackParams>;

const ChoreList = ({ editMode, archived }: Props) => {
  const navigation = useNavigation<ChoreListNavProp>();
  const chores = useAppSelector(selectChores);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [archiveModalVisible, setArchiveModalVisible] = useState(false);
  const [selectedChore, setSelectedChore] = useState<Chore>();
  const profile = useAppSelector(selectCurrentProfile);
  const { colors } = useTheme();

  const closeModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setArchiveModalVisible(false);
  };

  return (
    <View>
      {archived ? (
        <>
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
                    />
                  </Pressable>
                </View>
              )
          )}
        </>
      ) : chores.chores.length !== 0 && !profile?.isPaused && profile?.isApproved ? (
        chores.chores.map(
          (chore) =>
            !chore.archived && (
              <View key={chore.id}>
                <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                  <ChoreItem
                    setSelectedChore={setSelectedChore}
                    chore={chore}
                    editMode={editMode}
                    toggleEditModal={() => setEditModalVisible((prev) => !prev)}
                    toggleDeleteModal={() => setDeleteModalVisible((prev) => !prev)}
                    toggleArchiveModal={() => setArchiveModalVisible((prev) => !prev)}
                  />
                </Pressable>
              </View>
            )
        )
      ) : (
        <CenteredContainer>
          <Text style={{ color: colors.primary }}>Här var det tomt!</Text>
        </CenteredContainer>
      )}

      <Modal isVisible={editModalVisible} statusBarTranslucent>
        {selectedChore && <EditChore chore={selectedChore} closeModal={closeModal} />}
      </Modal>

      <Modal isVisible={deleteModalVisible} statusBarTranslucent>
        {selectedChore && <DeleteChore chore={selectedChore} closeModal={closeModal} />}
      </Modal>

      <Modal isVisible={archiveModalVisible} statusBarTranslucent>
        {selectedChore && <ArchiveChore chore={selectedChore} closeModal={closeModal} />}
      </Modal>
    </View>
  );
};

export default ChoreList;

const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
