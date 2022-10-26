import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import EditProfile from "../../components/profile/EditProfile";
import { UserStackParams } from "../../navigation/UserStackNavigator";
import { selectHouseholdName } from "../../store/household/householdSelector";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const ProfileScreen = ({ navigation, route }: Props) => {
  const [overlay, setOverlay] = useState(false);
  const profile = useAppSelector(selectCurrentProfile);
  const householdName = useAppSelector(selectHouseholdName);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const toggleOverlay = () => {
    setOverlay(false);
  };

  return (
    <View>
      <Surface elevation={3} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
        <ScrollView>
          <View style={{ marginBottom: 5 }}>
            <Surface style={{ padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Hushållsnamn</Text>
              <Text variant="headlineMedium">{householdName}</Text>
            </Surface>
            <Surface style={{ marginTop: 10, padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Profil</Text>
              <View style={{ flexDirection: "row" }}>
                <Text variant="headlineMedium" style={{ marginRight: 10 }}>
                  {profile?.avatar.avatar}
                </Text>
                <Text variant="headlineMedium">{profile?.profileName}</Text>
              </View>
            </Surface>
            <Button
              onPress={() => {
                setModalVisible(true);

                setTimeout(() => {
                  setOverlay(true);
                }, 500);
              }}
            >
              Redigera profil
            </Button>
          </View>
        </ScrollView>
      </Surface>
      <View style={{ flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
          <EditProfile overlay={overlay} toggleOverlay={toggleOverlay} closeModal={closeModal} />
        </Modal>
      </View>
    </View>
  );
};

export default ProfileScreen;
