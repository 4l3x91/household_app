import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, RefreshControl, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, Divider, Portal, Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ArchiveChore from "../../components/chore/ArchiveChore";
import ChoreItem from "../../components/chore/ChoreItem";
import CreateChore from "../../components/chore/CreateChore";
import DeleteChore from "../../components/chore/DeleteChore";
import EditChore from "../../components/chore/EditChore";
import HouseholdName from "../../components/household/HouseholdName";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { Chore } from "../../store/chore/choreModel";
import { selectChores } from "../../store/chore/choreSelectors";
import { getChores } from "../../store/chore/choreThunks";
import { getCompletedChoresPerHousehold } from "../../store/completedChore/completedChoreThunks";
import { selectAllHouseholdMembers, selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const [refresh, setRefresh] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedChore, setSelectedChore] = useState<Chore>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [archiveModalVisible, setArchiveModalVisible] = useState(false);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const household = useAppSelector((state) => state.household.household);
  const chores = useAppSelector(selectChores);
  const profile = useAppSelector(selectCurrentProfile);
  const modalizeRef = useRef<Modalize>(null);
  const allMembers = useAppSelector(selectAllHouseholdMembers);

  function toggleOverlay() {
    setOverlay((prev) => !prev);
  }

  const openModalize = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setArchiveModalVisible(false);
  };

  useEffect(() => {
    if (household) {
      if (household.id) {
        dispatch(getChores(household.id));
        dispatch(getCompletedChoresPerHousehold(allMembers));
      }
    }
  }, [household]);

  return (
    <ChoreScreenContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              if (household) {
                dispatch(getChores(household.id));
                dispatch(getCompletedChoresPerHousehold(allMembers));
              }
              setRefresh(false);
            }}
          />
        }
      >
        <HouseholdName householdName={household.name} role={profile?.role} />

        {chores.chores.length !== 0 || !profile?.isPaused || !profile.isApproved ? (
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
            <Text style={{ color: theme.colors.primary }}>Här var det tomt!</Text>
          </CenteredContainer>
        )}
      </ScrollView>

      <Portal>
        <Modalize ref={modalizeRef} modalStyle={{ backgroundColor: theme.colors.surface }} adjustToContentHeight={true}>
          <CreateChore closeModal={() => modalizeRef.current?.close()} />
        </Modalize>
      </Portal>

      <Modal animationType="slide" transparent={true} visible={editModalVisible} statusBarTranslucent>
        {selectedChore && <EditChore toggleOverlay={toggleOverlay} chore={selectedChore} closeModal={closeModal} />}
      </Modal>

      <Modal animationType="slide" transparent={true} visible={deleteModalVisible} statusBarTranslucent>
        {selectedChore && <DeleteChore toggleOverlay={toggleOverlay} chore={selectedChore} closeModal={closeModal} />}
      </Modal>

      <Modal animationType="slide" transparent={true} visible={archiveModalVisible} statusBarTranslucent>
        {selectedChore && <ArchiveChore toggleOverlay={toggleOverlay} chore={selectedChore} closeModal={closeModal} />}
      </Modal>

      {profile && profile?.role === "owner" && (
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
          <Divider style={{ height: 1 }} />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={openModalize}>
                Lägg till
              </Button>
            </View>
            <Divider style={{ width: 1, height: "auto" }} />
            <View style={{ flex: 1 }}>
              <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={() => setEditMode((prev) => !prev)}>
                Ändra
              </Button>
            </View>
          </View>
        </>
      )}
    </ChoreScreenContainer>
  );
};

export default ChoresScreen;

const ChoreScreenContainer = styled.View`
  flex: 1;
`;

const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
