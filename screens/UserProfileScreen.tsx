import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import * as Yup from "yup";
import EditUser from "../components/profile/EditUser";
import { UserStackParams } from "../navigation/UserStackNavigator";
import { selectHouseholdName } from "../store/household/householdSelector";
import { Avatar } from "../store/profile/profileModel";
import { selectCurrentProfile } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Titel måste vara minst två tecken")
    .max(20, "Titel kan inte vara längre än 20 tecken")
    .required("Titel kan inte vara tom"),
});

const UserProfileScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const [overlay, setOverlay] = useState(false);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectCurrentProfile);
  const householdName = useAppSelector(selectHouseholdName);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSubmit = (values: { name: string; description: string }) => {
    console.log("New name");
  };
  // TODO fix navigation typings
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
          <EditUser closeModal={closeModal} />
        </Modal>
        <View></View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
