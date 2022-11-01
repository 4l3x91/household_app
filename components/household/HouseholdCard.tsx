import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Modalize } from "react-native-modalize";
import { Portal, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { HouseholdModel } from "../../store/household/householdModel";
import { setHousehold } from "../../store/household/householdSlice";
import { Profile } from "../../store/profile/profileModel";
import { useAppDispatch } from "../../store/store";
import DeleteProfile from "../profile/DeleteProfile";
import AvatarCard from "./AvatarCard";

interface Props {
  profile: Profile;
  household: HouseholdModel;
  goToChores?: () => void;
  closeModal?: () => void;
}

const HouseholdCard = ({ profile, household, goToChores, closeModal }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const optionsModal = useRef<Modalize>(null);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => optionsModal.current?.open()}>
        <ProfilesContainer background={colors.primaryContainer}>
          <Text variant="titleMedium"> {household.name}</Text>
          <ProfileContainer>
            <Text variant="titleSmall"> {profile.profileName}</Text>
            <AvatarCard profile={profile} />
          </ProfileContainer>
        </ProfilesContainer>
      </Pressable>
      <Portal>
        <Modalize ref={optionsModal} adjustToContentHeight modalStyle={{ backgroundColor: colors.surface }}>
          <Surface style={{ paddingHorizontal: 20, backgroundColor: "transparent" }}>
            <Text variant="headlineMedium" style={{ marginVertical: 15 }}>
              {household.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log("Dela");
                dispatch(setHousehold(household));
                goToChores && goToChores();
                optionsModal.current?.close();
                closeModal && closeModal();
              }}
              style={{ alignItems: "center", flexDirection: "row", paddingVertical: 15 }}
            >
              <View style={{ padding: 4, backgroundColor: colors.onPrimaryContainer, borderRadius: 10, marginRight: 10 }}>
                <MaterialIcons name="home" size={34} color={colors.onPrimary} />
              </View>
              <Text>Gå till hushåll</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: colors.onPrimaryContainer }} />
            <TouchableOpacity onPress={() => console.log("Dela")} style={{ alignItems: "center", flexDirection: "row", paddingVertical: 15 }}>
              <View style={{ padding: 4, backgroundColor: colors.onPrimaryContainer, borderRadius: 10, marginRight: 10 }}>
                <MaterialIcons name="share" size={34} color={colors.onPrimary} />
              </View>
              <Text>Dela hushåll</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: colors.onPrimaryContainer }} />
            <TouchableOpacity
              onPress={() => {
                optionsModal.current?.close();
                setModalVisible(true);
              }}
              style={{ alignItems: "center", flexDirection: "row", paddingVertical: 15 }}
            >
              <View style={{ padding: 4, backgroundColor: colors.onPrimaryContainer, borderRadius: 10, marginRight: 10 }}>
                <MaterialIcons name="delete" size={34} color={colors.onPrimary} />
              </View>
              <Text>Lämna hushåll</Text>
            </TouchableOpacity>
          </Surface>
        </Modalize>
      </Portal>
      <Portal>
        <Modal avoidKeyboard isVisible={modalVisible} statusBarTranslucent>
          <DeleteProfile household={household} profile={profile} closeModal={closeModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default HouseholdCard;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfilesContainer = styled.View<{ background: string }>`
  background-color: ${({ background }) => background};
  border-radius: 10px;
  flex-direction: row;
  margin: 5px 5px 0px 0px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
`;
