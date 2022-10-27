import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, Portal, Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MyHouseholds from "../../components/household/MyHouseholds";
import EditProfile from "../../components/profile/EditProfile";
import { UserStackParams } from "../../navigation/UserStackNavigator";
import { selectHouseholdName } from "../../store/household/householdSelector";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const ProfileScreen = () => {
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
    <SafeAreaView style={{ opacity: modalVisible ? 0.3 : 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Button onPress={() => openMyHouseholds()}>
          <Text variant="titleLarge">
            {profile?.avatar.avatar} {profile?.profileName}
          </Text>
        </Button>
        <Button onPress={() => console.log("Open settings")}>
          <FontAwesome size={20} name="cog" />
        </Button>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Surface elevation={3} style={{ margin: 10, padding: 10, borderRadius: 10, backgroundColor: "transparent" }}>
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
              <Button onPress={() => setModalVisible(true)}>Redigera profil</Button>
            </View>
          </ScrollView>
        </Surface>
        <View style={{ flex: 1 }}>
          <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
            <EditProfile closeModal={closeModal} />
          </Modal>
        </View>
        <Portal>
          <Modalize ref={householdModalRef} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
            <Surface style={{ paddingHorizontal: 20, marginBottom: 80, backgroundColor: "transparent" }}>
              <Text variant="headlineMedium" style={{ marginVertical: 15 }}>
                Mina hushåll
              </Text>
              <MyHouseholds closeModal={() => householdModalRef.current?.close()} />
              <Button style={{ padding: 10 }} onPress={() => console.log("Join/create household")} icon="plus">Lägg till hushåll</Button>
            </Surface>
          </Modalize>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
