import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Profile } from "../../store/profile/profileModel";
import { selectCurrentProfile, selectHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import AvatarCard from "./AvatarCard";
import HouseholdMember from "./HouseholdMember";

const HouseholdMembers = () => {
  const members = useAppSelector(selectHouseholdMembers);
  const currentProfile = useAppSelector(selectCurrentProfile);
  const { colors } = useTheme();
  const [selectedMember, setSelectedMember] = useState<Profile>();
  const [overlay, setOverlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const toggleOverlay = () => {
    setOverlay(false);
  };

  return (
    <View>
      <Text variant="headlineSmall">Hushållsmedlemmar</Text>
      {members.map(
        (member) =>
          member.isApproved && (
            <View key={member.id}>
              <Container>
                <ProfileContainer>
                  <AvatarContainer>
                    <AvatarCard profile={member} size={32} />
                  </AvatarContainer>
                  <Text variant="headlineSmall">{member.profileName}</Text>
                </ProfileContainer>
                {currentProfile?.role === "owner" && (
                  <IconContainer>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedMember(member);
                        setOverlay(true);
                      }}
                    >
                      <FontAwesome5 name="cog" size={24} color={colors.onSurface} />
                    </Pressable>
                  </IconContainer>
                )}
              </Container>
            </View>
          )
      )}
      {selectedMember && (
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
          <HouseholdMember member={selectedMember} closeModal={closeModal} toggleOverlay={toggleOverlay} overlay={overlay} />
        </Modal>
      )}
    </View>
  );
};

export default HouseholdMembers;

const Container = styled(Surface)`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const AvatarContainer = styled.View`
  padding: 10px;
  margin-right: 10px;
  border-radius: 10px;
`;

const IconContainer = styled.View`
  margin: 0 10px;
`;
