import React, { useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Surface, Text } from "react-native-paper";
import { selectHouseholdName } from "../../store/household/householdSelector";
import { Profile } from "../../store/profile/profileModel";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import AvatarCard from "../household/AvatarCard";
import EditProfile from "./EditProfile";

const ProfileComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const profile = useAppSelector(selectCurrentProfile);
  const householdName = useAppSelector(selectHouseholdName);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Surface elevation={0} style={{ marginHorizontal: 10, marginTop: 10, paddingHorizontal: 10, paddingTop: 10, borderRadius: 10 }}>
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

      <Modal
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={"down"}
        avoidKeyboard
        isVisible={modalVisible}
        statusBarTranslucent
        onBackButtonPress={() => setModalVisible(false)}
      >
        <EditProfile closeModal={closeModal} />
      </Modal>
    </Surface>
  );
};

export default ProfileComponent;
