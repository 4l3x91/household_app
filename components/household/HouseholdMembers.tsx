import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Profile } from "../../store/profile/profileModel";
import { selectCurrentProfile, selectMemoizedHouseholdMember } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AvatarCard from "./AvatarCard";
import HouseholdMember from "./HouseholdMember";

const HouseholdMembers = () => {
  const members = useAppSelector(selectMemoizedHouseholdMember);
  const currentProfile = useAppSelector(selectCurrentProfile);
  const dispatch = useAppDispatch();
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
    <HouseholdMembersContainer>
      <Text variant="headlineSmall">Hushållsmedlemmar</Text>
      {members.map(
        (member) =>
          member.isApproved && (
            <MemberCard key={member.id}>
              <ProfileContent>
                <AvatarCard profile={member} />
                <ProfileName variant="bodyLarge">{member.profileName}</ProfileName>
              </ProfileContent>
              {currentProfile?.role === "owner" && (
                <ButtonContainer>
                  <IconButton
                    onPress={() => {
                      setSelectedMember(member);
                      setModalVisible(true);
                      setTimeout(() => {
                        setOverlay(true);
                      }, 300);
                    }}
                  >
                    <FontAwesome5 name="cog" size={24} color={colors.onSurface} />
                  </IconButton>
                </ButtonContainer>
              )}
            </MemberCard>
          )
      )}
      {selectedMember && (
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
          <HouseholdMember member={selectedMember} closeModal={closeModal} toggleOverlay={toggleOverlay} overlay={overlay} />
        </Modal>
      )}
    </HouseholdMembersContainer>
  );
};

const HouseholdMembersContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const MemberCard = styled(Surface)`
  margin: 5px 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;

const ProfileContent = styled.View`
  flex: 5;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const ProfileName = styled(Text)`
  margin-left: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const IconButton = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 10px 0;
  margin-right: 10px;
`;

export default HouseholdMembers;
