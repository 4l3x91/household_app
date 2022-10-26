import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, Divider, Portal, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ChoreItem from "../../components/chore/ChoreItem";
import CreateChore from "../../components/chore/CreateChore";
import EditChore from "../../components/chore/EditChore";
import HouseholdName from "../../components/household/HouseholdName";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { selectChores } from "../../store/chore/choreSelectors";
import { getChores } from "../../store/chore/choreThunks";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const [refresh, setRefresh] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const household = useAppSelector((state) => state.household.household);
  const chores = useAppSelector(selectChores);
  const profile = useAppSelector(selectCurrentProfile);
  const modalizeRef = useRef<Modalize>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleEdit = () => {
    setEditPressed((prev) => !prev);
  };

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const openModalize = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (household) {
      if (household.id) dispatch(getChores(household.id));
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
              if (household) dispatch(getChores(household.id));
              setRefresh(false);
            }}
          />
        }
      >
        <HouseholdName householdName={household.name} role={profile?.role} />

        {chores.chores.length !== 0 ? (
          chores.chores.map((chore) => (
            <View key={chore.id}>
              <Pressable onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
                <ChoreItem chore={chore} editPressed={editPressed} toggleModal={toggleModal} />
              </Pressable>
              <View style={{ flex: 1, marginTop: 300 }}>
                <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
                  <EditChore chore={chore} closeModal={closeModal} />
                </Modal>
              </View>
            </View>
          ))
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

      {profile && profile?.role === "owner" && (
        <>
          <Divider style={{ height: 1 }} />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={openModalize}>
                Lägg till
              </Button>
            </View>
            <Divider style={{ width: 1, height: "auto" }} />
            <View style={{ flex: 1 }}>
              <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={toggleEdit}>
                Ändra
              </Button>
            </View>
          </View>
        </>
      )}

      {/* <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
        <EditChore closeModal={closeModal} />
      </Modal> */}
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
