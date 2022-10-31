import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { Modalize } from "react-native-modalize";
import { Button, Portal, Surface, Text, useTheme } from "react-native-paper";
import AvatarCard from "../../components/household/AvatarCard";
import CreateHousehold from "../../components/household/CreateHousehold";
import HouseholdMembers from "../../components/household/HouseholdMembers";
import JoinHousehold from "../../components/household/JoinHousehold";
import MyHouseholds from "../../components/household/MyHouseholds";
import EditProfile from "../../components/profile/EditProfile";
import PendingProfiles from "../../components/profile/PendingProfiles";
import { UserStackParams } from "../../navigation/UserStackNavigator";
import { selectHouseholdId, selectHouseholdName } from "../../store/household/householdSelector";
import { getHouseholdById } from "../../store/household/householdThunks";
import { Profile } from "../../store/profile/profileModel";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { getAllProfiles } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const ProfileScreen = ({ navigation }: Props) => {
  const profile = useAppSelector(selectCurrentProfile);
  const [refresh, setRefresh] = useState(false);
  const householdName = useAppSelector(selectHouseholdName);
  const householdId = useAppSelector(selectHouseholdId);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const householdModalRef = useRef<Modalize>(null);
  const optionsModalRef = useRef<Modalize>(null);
  const { colors } = useTheme();

  useEffect(() => {
    console.log("ändra");
  }, [householdName]);

  const openMyHouseholds = () => {
    householdModalRef.current?.open();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeJoinModal = () => {
    setJoinModalVisible(false);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Constants.statusBarHeight }}>
        <Button onPress={() => openMyHouseholds()}>
          <Text variant="titleLarge">
            {profile?.avatar.avatar} {profile?.profileName}
          </Text>
        </Button>
        <Button onPress={() => console.log("Open settings")}>
          <FontAwesome size={20} name="cog" />
        </Button>
      </View>

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
        <Surface elevation={0} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
          <View style={{ marginBottom: 5 }}>
            <Surface style={{ padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Hushållsnamn</Text>
              <Text variant="headlineMedium">{householdName}</Text>
            </Surface>
            <Surface style={{ marginTop: 10, padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Profil</Text>
              <View style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
                {profile && <AvatarCard profile={profile as Profile} size={32} />}
                <Text variant="headlineMedium" style={{ marginHorizontal: 15 }}>
                  {profile?.profileName}
                </Text>
              </View>
            </Surface>
            <Button onPress={() => setModalVisible(true)}>Redigera profil</Button>
          </View>
        </Surface>

        <Surface elevation={0} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
          <HouseholdMembers />
          <PendingProfiles />
        </Surface>
        <View style={{ height: 70 }}></View>
      </ScrollView>

      <Modal
        onSwipeComplete={() => setModalVisible(false)}
        avoidKeyboard
        swipeDirection={"down"}
        isVisible={modalVisible}
        statusBarTranslucent
        onBackButtonPress={() => setModalVisible(false)}>
        <EditProfile closeModal={closeModal} />
      </Modal>

      <Portal>
        <Modal avoidKeyboard isVisible={joinModalVisible} statusBarTranslucent>
          <JoinHousehold closeModal={closeJoinModal} />
        </Modal>
      </Portal>

      <Portal>
        <Modal avoidKeyboard isVisible={createModalVisible} statusBarTranslucent>
          <CreateHousehold closeModal={closeCreateModal} />
        </Modal>
      </Portal>

      <Portal>
        <Modalize ref={householdModalRef} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
          <Surface style={{ paddingHorizontal: 20, backgroundColor: "transparent" }}>
            <Text variant="headlineMedium" style={{ marginVertical: 15 }}>
              Mina hushåll
            </Text>
            <MyHouseholds closeModal={() => householdModalRef.current?.close()} />
            <Button style={{ padding: 10 }} onPress={() => optionsModalRef?.current?.open()} icon="plus">
              Lägg till hushåll
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
              Gå med i hushåll
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
              Skapa hushåll
            </Button>
          </Surface>
        </Modalize>
      </Portal>
    </View>
  );
};

export default ProfileScreen;
