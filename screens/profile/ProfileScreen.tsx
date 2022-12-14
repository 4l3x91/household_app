import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { Modalize } from "react-native-modalize";
import { Button, Portal, Snackbar, Surface, Text, useTheme } from "react-native-paper";
import CreateHousehold from "../../components/household/CreateHousehold";
import HouseholdMembers from "../../components/household/HouseholdMembers";
import JoinHousehold from "../../components/household/JoinHousehold";
import MyHouseholds from "../../components/household/MyHouseholds";
import PendingProfiles from "../../components/profile/PendingProfiles";
import ProfileComponent from "../../components/profile/ProfileComponent";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useUtils } from "../../hooks/useUtils";
import { UserStackParams } from "../../navigation/UserStackNavigator";
import { selectHousehold, selectHouseholdId } from "../../store/household/householdSelector";
import { getHouseholdById } from "../../store/household/householdThunks";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { getAllProfiles } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const ProfileScreen = ({ navigation }: Props) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const householdModalRef = useRef<Modalize>(null);
  const optionsModalRef = useRef<Modalize>(null);
  const householdId = useAppSelector(selectHouseholdId);
  const profile = useAppSelector(selectCurrentProfile);
  const household = useAppSelector(selectHousehold);
  const user = useAppSelector(selectUser);
  const { shareHousehold } = useUtils();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const openMyHouseholds = () => {
    householdModalRef.current?.open();
  };

  const closeJoinModal = () => {
    setJoinModalVisible(false);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader goToSettings={() => navigation.navigate("SettingsScreen")} openMyHouseholds={openMyHouseholds} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              if (user) {
                dispatch(getHouseholdById(householdId));
                dispatch(getAllProfiles(user));
              }
              setRefresh(false);
            }}
          />
        }
      >
        <ProfileComponent />
        <Surface elevation={0} style={{ margin: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <HouseholdMembers />
          <PendingProfiles />
          <Button onPress={() => profile && shareHousehold(household.household, profile)}>Dela hush??llskod</Button>
        </Surface>
      </ScrollView>

      <Portal>
        <Modal
          onSwipeComplete={() => setJoinModalVisible(false)}
          swipeDirection={"down"}
          avoidKeyboard
          isVisible={joinModalVisible}
          statusBarTranslucent
        >
          <JoinHousehold setSnackbarVisible={setSnackbarVisible} closeModal={closeJoinModal} />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          onSwipeComplete={() => setCreateModalVisible(false)}
          swipeDirection={"down"}
          avoidKeyboard
          isVisible={createModalVisible}
          statusBarTranslucent
        >
          <CreateHousehold closeModal={closeCreateModal} />
        </Modal>
      </Portal>

      <Portal>
        <Modalize ref={householdModalRef} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
          <Surface style={{ paddingHorizontal: 20, backgroundColor: "transparent" }}>
            <Text variant="headlineMedium" style={{ marginVertical: 15 }}>
              Mina hush??ll
            </Text>
            <MyHouseholds closeModal={() => householdModalRef.current?.close()} />
            <Button style={{ padding: 10 }} onPress={() => optionsModalRef?.current?.open()} icon="plus">
              L??gg till hush??ll
            </Button>
          </Surface>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={optionsModalRef} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
          <Surface style={{ paddingHorizontal: 20, backgroundColor: "transparent" }}>
            <Button
              style={{ padding: 10 }}
              onPress={() => {
                householdModalRef.current?.close();
                optionsModalRef?.current?.close();
                setTimeout(() => {
                  setJoinModalVisible(true);
                }, 200);
              }}
              icon="plus"
            >
              G?? med i hush??ll
            </Button>
            <Button
              style={{ padding: 10 }}
              onPress={() => {
                householdModalRef.current?.close();
                optionsModalRef?.current?.close();
                setTimeout(() => {
                  setCreateModalVisible(true);
                }, 200);
              }}
              icon="plus"
            >
              Skapa hush??ll
            </Button>
          </Surface>
        </Modalize>
      </Portal>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Ok",
          onPress: () => {
            () => setSnackbarVisible(false);
          },
        }}
        style={{ padding: 10 }}
        wrapperStyle={{ backgroundColor: colors.surface }}
      >
        En ans??kan om att g?? med i hush??llet har skickats till ??garen! ????
      </Snackbar>
    </View>
  );
};

export default ProfileScreen;
