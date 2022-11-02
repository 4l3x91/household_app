import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { updateChore } from "../../store/chore/choreThunks";
import { selectAllHouseholdMembers } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AvatarCard from "../household/AvatarCard";

interface Props {
  closeModal: () => void;
  chore: Chore;
}

const AssignChore = ({ closeModal, chore }: Props) => {
  const { colors } = useTheme();
  const householdMembers = useAppSelector(selectAllHouseholdMembers);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(updateChore({ ...chore, assignedToId: selectedProfileId }));
    closeModal();
  };

  useEffect(() => {
    chore.assignedToId && setSelectedProfileId(chore.assignedToId);
  }, []);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Container>
      <Content>
        <Text variant="headlineMedium">Tilldela syssla</Text>
        {householdMembers.map((member) => (
          <ProfilesContainer
            onTouchEnd={() => (selectedProfileId === member.id ? setSelectedProfileId("") : setSelectedProfileId(member.id))}
            selected={member.id === selectedProfileId}
          >
            <AvatarCard profile={member} />
            <Text variant="titleSmall" style={{ flex: 1, marginLeft: 10 }}>
              {member.profileName}
            </Text>
          </ProfilesContainer>
        ))}
        <Button onPress={handlePress} mode="outlined" style={{ marginTop: 15 }}>
          Spara
        </Button>
      </Content>
      <Pressable onPress={handleClose}>
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default AssignChore;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled(Surface)`
  margin: 20px;
  padding: 20px 0;
  border-radius: 20px;
  align-items: center;
`;
const ModalContent = styled(Surface)`
  padding: 20px;
  margin-top: 10px;
`;

const ProfilesContainer = styled(Surface)<{ selected: boolean }>`
  border-radius: 10px;
  flex-direction: row;
  margin: 5px 5px 0px 5px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;
