import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React, { useRef, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, Portal, Surface, Text, useTheme } from "react-native-paper";
import AvatarCard from "../../components/household/AvatarCard";
import HouseholdMembers from "../../components/household/HouseholdMembers";
import MyHouseholds from "../../components/household/MyHouseholds";
import EditProfile from "../../components/profile/EditProfile";
import PendingProfiles from "../../components/profile/PendingProfiles";
import { UserStackParams } from "../../navigation/UserStackNavigator";
import { selectHouseholdName } from "../../store/household/householdSelector";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const ProfileScreen = ({ navigation }: Props) => {
  const profile = useAppSelector(selectCurrentProfile);
  const householdName = useAppSelector(selectHouseholdName);
  const [modalVisible, setModalVisible] = useState(false);
  const householdModalRef = useRef<Modalize>(null);
  const { colors } = useTheme();
  const openMyHouseholds = () => {
    householdModalRef.current?.open();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ opacity: modalVisible ? 0.3 : 1 }}>
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

      <ScrollView>
        <Surface elevation={0} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
          <View style={{ marginBottom: 5 }}>
            <Surface style={{ padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Hushållsnamn</Text>
              <Text variant="headlineMedium">{householdName}</Text>
            </Surface>
            <Surface style={{ marginTop: 10, padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Profil</Text>
              <View style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
                {profile && <AvatarCard profile={profile} size={32} />}

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
      <Portal>
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
          <EditProfile closeModal={closeModal} />
        </Modal>
      </Portal>
      <Portal>
        <Modalize ref={householdModalRef} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
          <Surface style={{ paddingHorizontal: 20, marginBottom: 80, backgroundColor: "transparent" }}>
            <Text variant="headlineMedium" style={{ marginVertical: 15 }}>
              Mina hushåll
            </Text>
            <MyHouseholds closeModal={() => householdModalRef.current?.close()} />
            <Button style={{ padding: 10 }} onPress={() => navigation.navigate("HouseholdOptions")} icon="plus">
              Lägg till hushåll
            </Button>
          </Surface>
        </Modalize>
      </Portal>
    </View>
  );
};

export default ProfileScreen;
