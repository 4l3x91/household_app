import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { Divider, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Profile } from "../../store/profile/profileModel";
import { selectCurrentProfile, selectHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import AvatarCard from "./AvatarCard";
import HouseholdMember from "./HouseholdMember";

const HouseholdMembers = () => {
  const members = useAppSelector(selectHouseholdMembers);
  const currentProfile = useAppSelector(selectCurrentProfile);
  const user = useAppSelector(selectUser);
  const { colors } = useTheme();
  const [selectedMember, setSelectedMember] = useState<Profile>();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      {members.length > 0 && (
        <Surface style={{ padding: 10, borderRadius: 10 }}>
          <Text variant="bodySmall">Hushållsmedlemmar</Text>
          {members.map(
            (member, index) =>
              member.isApproved && (
                <View key={member.id}>
                  <Container>
                    <ProfileContainer>
                      <AvatarContainer>
                        <AvatarCard profile={member} size={20} />
                      </AvatarContainer>
                      <Text variant="bodyLarge">{member.profileName}</Text>
                    </ProfileContainer>
                    {currentProfile?.role === "owner" && (
                      <IconContainer>
                        <Pressable
                          onPress={() => {
                            setModalVisible(true);
                            setSelectedMember(member);
                          }}
                        >
                          <FontAwesome5 name="cog" size={20} color={colors.onSurface} />
                        </Pressable>
                      </IconContainer>
                    )}
                  </Container>
                  {index !== members.filter((member) => member.isApproved && member.userId !== user?.id).length - 1 && (
                    <Divider bold style={{ marginHorizontal: 5 }} />
                  )}
                </View>
              )
          )}
          {selectedMember && (
            <Modal onSwipeComplete={() => setModalVisible(false)} swipeDirection={"down"} isVisible={modalVisible} statusBarTranslucent>
              <HouseholdMember member={selectedMember} closeModal={closeModal} />
            </Modal>
          )}
        </Surface>
      )}
    </View>
  );
};

export default HouseholdMembers;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const AvatarContainer = styled.View`
  padding: 10px 5px;
  margin-right: 5px;
  border-radius: 10px;
`;

const IconContainer = styled.View`
  margin: 0 10px;
`;
